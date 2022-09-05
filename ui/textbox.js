class TextBox
{
    // Each textbox should has its own canvas. Why ? to prevent events overriding.
    constructor ( canvas, bodyBox )
    {
        this.displayCanvas = canvas;
        this.BodyBox  = bodyBox;
        
        //set focus for kb event
        this.displayCanvas.general.tabIndex = 1000;
        
        this.Text   = new Array();
        this.Text.push("");
        this.SetTextMargin(20,10);
        
        this.SetFont("Courier", 16, "bold");
        
         // cursor position    
        this.LineIndex = 0;
        this.ColumnIndex = 0;
        // wheel offset
        this.WheelIndex = 0
        
        
        // Selection mechanism
        this.selStart = new Vector2(-1,-1);
        this.selEnd   = new Vector2(-1,-1);
        
        this.backupClipBoard = "";
        
        // info
        this.TextHasChanged = false
        this.HasChangedLine = false
        this.cursorVisible = false;
        this.mouseisDown = false;
        
        //@ Events ( wheels, mouse down, etc, )
        // the function run on canvas object... We need to attribute canvas an event object which will be the textbox object.
        this.displayCanvas.general.eventObject = this;
        this.displayCanvas.general.addEventListener("mousedown", this.OnMouseDown, false);
        this.displayCanvas.general.addEventListener("mousemove", this.OnMouseMove, false);
        this.displayCanvas.general.addEventListener("mouseup", this.OnMouseUp, false);
        this.displayCanvas.general.addEventListener('keydown', this.OnKeyDown, false);
        this.displayCanvas.general.addEventListener('keyup', this.OnKeyUp, false);
        this.displayCanvas.general.addEventListener('wheel',this.MouseWheelHandler2 );
        
        this.Draw(); 
    }
    SetTextMargin(ymarge, xmarge)
    {
        this.YMRG = ymarge;
        this.XMRG = xmarge;
    }
    SetFont(name, size, style)
    {
        this.font = style+ " " + size +"px " + name;
        this.fontSize = size;
        var g = this.displayCanvas.context;
        g.font = this.font;
        this.fontWidth = g.measureText("a").width;
    }
    SetCursor(x,y)
    {
        this.ColumnIndex = y;
        this.LineIndex = x;
    }
    Clear()
    {
        // @ Clear 
        var g = this.displayCanvas.context;
        g.fillStyle = 'rgb(255,255,255)';
        g.fillRect(this.BodyBox.x,this.BodyBox.y,this.BodyBox.w, this.BodyBox.h); 
    }
    Stroke()
    {
        // @ Stroke?
        var g = this.displayCanvas.context;
        g.fillStyle = 'rgb(0,0,0)';
        g.lineWidth = 3;
        g.strokeRect(this.BodyBox.x,this.BodyBox.y,this.BodyBox.w, this.BodyBox.h);
    }
    Draw()
    {
      
        this.Clear()
        this.Stroke()

        // Draw Text
        var g = this.displayCanvas.context;
        g.font = this.font;
        for (var i = 0 ; i < this.Text.length; i++ )
        {
            var cl = (i-this.WheelIndex) * this.fontSize ;
            g.fillStyle = 'rgb(0,0,0)';
            
            // Draw Selection if needed
            var sr = this.GetSelectedTextAtLine(i);
            if ( sr[2].length > 0)
            {
                var slmeas = 0;
                var hlmeas = g.measureText(sr[2]).width;
                
               // draw start sel
                if ( sr[0] > 0 )
                {
                    var s = this.Text[i].substr(0,sr[0]);
                    slmeas = g.measureText(s).width;
                    g.fillText(s , this.XMRG , this.YMRG + cl );
                }  
                 g.fillStyle = 'rgb(0,0,255)';
               // draw selected text
                g.fillText(sr[2], this.XMRG + slmeas , this.YMRG + cl );
                
                // draw enline
                if ( sr[1] <this.Text[i].length )
                {
                    g.fillStyle = 'rgb(0,0,0)';
                    var s = this.Text[i].substr(sr[1],this.Text[i].length - sr[1]);
                    g.fillText(s , this.XMRG + slmeas + hlmeas , this.YMRG + cl );
                }
              
               continue;
            }
            
            // draw normal
            g.fillText(this.Text[i], this.XMRG , this.YMRG + cl );
        }

    }
    DrawCursor(force = false)
    {
        if ( force )
        {
            this.Draw();
            this.cursorVisible = true;
        }
        // Object is the window. this is boring...
        var p = this.CursorPositionToCanvasPosition(this.LineIndex, this.ColumnIndex);
        
        var g = this.displayCanvas.context;
        if ( this.cursorVisible )
            g.fillStyle = 'rgb(0,0,0)';
        else
        {
            this.Draw();
            this.cursorVisible = !this.cursorVisible;
            return;
        }
        g.fillRect(p.x,p.y - (this.WheelIndex*this.fontSize) - this.fontSize, this.fontSize, this.fontSize);
        g.fillStyle = 'rgb(255,255,255)';
     
        if ( this.Text[this.ColumnIndex].length > this.LineIndex)
        {
            g.fillText(this.GetCharAtCursorPosition(this.LineIndex, this.ColumnIndex), p.x, p.y - (this.WheelIndex*this.fontSize))
        }
            
        this.cursorVisible = !this.cursorVisible;

    }
    
    // @  Navig
    UpdateLineIndex(dir=0)
    {
        if ( dir == 0 ) // go to left
        {
           if ( this.LineIndex > 0 )
               this.LineIndex--;
        }
        else // go to right
        {
            if ( this.LineIndex < this.Text[this.ColumnIndex].length )
                this.LineIndex++;
        }
        this.DrawCursor(true);
    }
    
    UpdateColumnIndex(dir = 0) 
    {
        if ( dir == 0 ) // go to down
        {
           if ( this.ColumnIndex < this.Text.length-1 )
           {
                this.ColumnIndex++;
           }
              
        }
        else // go to up
        {
            if ( this.ColumnIndex > 0  )
            {
                this.ColumnIndex--;
            }
                
        }
        if ( this.LineIndex >= this.Text[this.ColumnIndex].length)
            this.LineIndex = this.Text[this.ColumnIndex].length;
        
        this.DrawCursor(true);
        this.HasChangedLine = true
    }
    
    //@ Modify Text
    
    //@ Called when [enter] pressed
    AddNewLine()
    {
        if ( this.Text.length == 0 )
        {
            this.Text.push("");
            this.DrawCursor(true);
            return;
        }
        
        // @ split text[columnindex] at lineindex.
        var leftpart = this.Text[this.ColumnIndex].substr(0, this.LineIndex);
        var rightpart = this.Text[this.ColumnIndex].substr(this.LineIndex, this.Text[this.ColumnIndex].length - this.LineIndex);
        
        this.Text[this.ColumnIndex] = leftpart;
        this.Text.splice(this.ColumnIndex + 1,0,rightpart);
        this.LineIndex = 0;
        this.UpdateColumnIndex(); //++
        
        this.TextHasChanged = true
        
        
    }
    DeleteLastChar()
    {
        if ( this.selStart.x != -1 )
        {
            this.ReplaceSelection([""]);
            return;
        }
       if ( this.LineIndex == 0 ){ 
           
           // @ return if first line 
           if ( this.ColumnIndex == 0  ){ return; } // do nothing.
           
           // @ append current line to previous column... remove the line from array.
           var eol = this.Text[this.ColumnIndex-1].length;
           this.Text[this.ColumnIndex-1] += this.Text[this.ColumnIndex];
           this.Text.splice(this.ColumnIndex,1);
           
           this.UpdateColumnIndex(-1); //--
           // @ set cursor at end of line
           
           this.LineIndex = eol;
           //@ Draw
           this.DrawCursor(true); 
           return ; 
       }
       
       var insertText = this.Text[this.ColumnIndex].substr(0, this.LineIndex - 1);
       insertText +=  this.Text[this.ColumnIndex].substr(this.LineIndex , this.Text[this.ColumnIndex].length);
       this.Text[this.ColumnIndex] = insertText;
        
       this.UpdateLineIndex(); 
       this.TextHasChanged = true
       
        
    }
    AddChar(c)
    {
        if ( this.selStart.x != -1 )
        {
            this.ReplaceSelection([c], 1);
            return;
        }
            
        var leftpart = this.Text[this.ColumnIndex].substr(0, this.LineIndex);
        var rightpart = this.Text[this.ColumnIndex].substr(this.LineIndex, this.Text[this.ColumnIndex].length - this.LineIndex);
        this.Text[this.ColumnIndex] = leftpart + c + rightpart;
        
        this.UpdateLineIndex(1); //++
        this.TextHasChanged = true
        
    }
    // this things work.
    
  
    async PasteFromClipPaper()
    {
        var text;
        try
        {
             text = await navigator.clipboard.readText();
        }
        catch(e)
        {
            text = this.backupClipBoard;
        
        };
        
        var newtext = text.split("\r\n");
        
        var textFrags = this.SplitTextAtCursor(this.LineIndex,this.ColumnIndex);
        var textA = textFrags[0];
        var textB = textFrags[1];
        
        textA[textA.length- 1] += newtext[0];
        
        // if newtext is longer than one do something sp
        
        for (var i = 1; i < newtext.length; i++)
                textA.push(newtext[i]);
        
        this.ColumnIndex = textA.length-1;
        this.LineIndex =  textA[textA.length-1].length + 1;
        
        textA[textA.length- 1] += textB[0];
        
        
        
        // add resident text 
        for (var i = 1; i < textB.length; i++)
            textA.push(textB[i]);
        
        this.Text = textA;
        this.Draw();
        this.TextHasChanged = true
        return;
      
    }
   
    SplitTextAtCursor(cursorx, cursory)
    {
        // return two string array 
        var textA = new Array();
        var textB = new Array();
        
        for (var i = 0 ; i < this.Text.length; i++ )
        {
            // Draw Selection if needed
            if ( i < cursory)
            {
                textA.push(this.Text[i]);
            }
            if ( i == cursory )
            {
                textA.push(this.Text[i].substr(0,cursorx));
                textB.push(this.Text[i].substr(cursorx,this.Text[i].length-cursorx));
            }
            if ( i >cursory)
                textB.push(this.Text[i]);
        }
        return [textA, textB];
        
    }
    SplitTextFromSelection()
    {
        // return two string array 
        var textA = new Array();
        var textB = new Array();
        
        for (var i = 0 ; i < this.Text.length; i++ )
        {
            // Draw Selection if needed
            if ( i < this.selStart.y)
            {
                textA.push(this.Text[i]);
            }
            
            var sr = this.GetSelectedTextAtLine(i);
            if ( sr[2].length > 0)
            {
               // draw start sel
                if ( sr[0] > 0 )
                {
                    textA.push(this.Text[i].substr(0,sr[0]));
                }  
                // draw enline
                if ( sr[1] <this.Text[i].length )
                {
                    textB.push(this.Text[i].substr(sr[1],this.Text[i].length - sr[1]));
                }
               continue;
            }
            if ( i > this.selStart.y)
                textB.push(this.Text[i]);
        }
        return [textA, textB];
        
    }
    EndSelection()
    {
        this.selStart = new Vector2(-1,-1);
        this.selEnd  =  new Vector2(-1,-1);
        
    }
    CopySelection()
    {
        var t = this.GetSelectedText();
        var s = "";
        for (var i = 0 ; i < t.length; i++ )
        {
            s+=t[i]+"\r\n";
        }
        CopyToClipBoard(s);
        this.backupClipBoard = s;
        
    }
    ReplaceSelection(newtext, carret = 0)
    {
        // What i want is to split the text before and after the selection....
        
        var textFrags = this.SplitTextFromSelection();
        var textA = textFrags[0];
        var textB = textFrags[1];
        
        textA[textA.length- 1] += newtext[0];
        
        // if newtext is longer than one do something sp
        
        for (var i = 1; i < newtext.length; i++)
                textA.push(newtext[i]);
        
        this.ColumnIndex = textA.length-1;
        this.LineIndex =  textA[textA.length-1].length + carret;
        
        textA[textA.length- 1] += textB[0];
        
        
        
        // add resident text 
        for (var i = 1; i < textB.length; i++)
            textA.push(textB[i]);
        
        this.Text = textA;
        this.EndSelection();
        this.Draw();
        this.TextHasChanged = true
       
        
    }
    GetSelectedText()
    {
        var r = new Array();
        for (var i = 0 ; i < this.Text.length; i++)
        {
            var sel = this.GetSelectedTextAtLine(i);
            if ( sel[2].length > 0 )
                r.push(sel[2]);
        }
        return r;
    }
    GetSelectedTextAtLine(y)
    {
        // return [index of start, index of end, string]
        
        if ( y < this.selStart.y || y > this.selEnd.y || VectorsDistance(this.selStart, this.selEnd) == 0  )
        {
            return [0,0,""];
            //return empty
        }
        var ps = 0;
        var pe = this.Text[y].length;
        
        if (  y == this.selStart.y )
            ps = this.selStart.x;
        
         if ( y == this.selEnd.y )
            pe = this.selEnd.x;
        
        return [ps,pe, this.Text[y].substr(ps,pe-ps)];
        
    }
    OnSelectEnd()
    {
        
        if ( VectorsDistance(this.selStart, this.selEnd) == 0 )
        {
            this.selStart = new Vector2(-1,-1);
            this.selEnd  =  new Vector2(-1,-1);
            return;
        }
    }
    
    ComputeSelectionOrder()
    {
        var ss = new Vector2(this.selStart.x, this.selStart.y)
        var se = new Vector2(this.selEnd.x, this.selEnd.y)
        
        if ( (ss.y > se.y) || (ss.y == se.y && ss.x > se.x))
        {
            //switch end.
            this.SwitchSelectionOrder();
            return;
        }
        return;
        if ( ss.y == se.y && ss.x > se.x)
        {
            //switch end.
            this.SwitchSelectionOrder();
            return;
        }
    }
    SwitchSelectionOrder()
    {
        var ss = new Vector2(this.selStart.x, this.selStart.y)
        var se = new Vector2(this.selEnd.x, this.selEnd.y)
        this.selEnd = ss;
        this.selStart = se;
    }
    OnMouseDown(e)
    {
        
        var eventObject = this.eventObject;
        var p = eventObject.ScreenPositionToCursorPosition(mouseX, mouseY)
        eventObject.selStart = p;
        eventObject.selEnd  =  p;
        eventObject.mouseisDown = true;
        
    }
    OnMouseMove(e)
    {
        var eventObject = this.eventObject;
        if ( !eventObject.mouseisDown )
            return;
        
        var p = eventObject.ScreenPositionToCursorPosition(mouseX, mouseY);
        if ( eventObject.selStart.x >= 0 )
        {
            eventObject.selEnd =  p;
            eventObject.ComputeSelectionOrder();
        }
        eventObject.LineIndex = p.x;
        eventObject.ColumnIndex = p.y; 
        eventObject.DrawCursor(true)
        
    }
    OnMouseUp(e)
    {
        // get the line from mouse  
        var eventObject = this.eventObject;
        if ( eventObject.selStart.x >= 0 )
        {
            eventObject.selEnd =  eventObject.ScreenPositionToCursorPosition(mouseX, mouseY);
            eventObject.ComputeSelectionOrder();
            console.log("end selection at " + eventObject.selEnd.x + " " + eventObject.selEnd.y);
            eventObject.OnSelectEnd();
        }
       
        var v =  eventObject.ScreenPositionToCursorPosition(mouseX, mouseY);
        eventObject.LineIndex = v.x;
        eventObject.ColumnIndex = v.y; 
        eventObject.DrawCursor(true)
        eventObject.mouseisDown = false;
     
    }
    OnKeyUp(e)
    {
        var eventObject = this.eventObject;
        if ( e.keyCode == 17 )
           eventObject.ControlKeyPressed = false;
    }
    // @ Events
    OnKeyDown(e)
    {
        // Get bind object.
        var eventObject = this.eventObject;
        console.log(e.keyCode);
        // @ Check special key
        switch ( e.keyCode )
        {
            case 20: return;
           
            case 37 : eventObject.UpdateLineIndex(); return;
            case 39 : eventObject.UpdateLineIndex(1); return;
            case 40 : eventObject.UpdateColumnIndex(); return;
            case 38 : eventObject.UpdateColumnIndex(1); return;
            case 8  : eventObject.DeleteLastChar(); return;
            case 13 : eventObject.AddNewLine(); return;
                
            case 17 : eventObject.ControlKeyPressed = true;return;
            case 67: if ( eventObject.ControlKeyPressed == true){ eventObject.CopySelection(); return;} break;
            case 86 : if ( eventObject.ControlKeyPressed == true){eventObject.PasteFromClipPaper(); return;} break;
            case 88 : if ( eventObject.ControlKeyPressed == true){eventObject.CopySelection(); eventObject.DeleteLastChar(); return;} break;
            
          
        }
        if ( !KeyIsIllegal(e.key) )
             eventObject.AddChar(e.key); 
        
        // Check code change here.
    }

    
    MouseWheelHandler2(e) 
    {
        var eventObject = this.eventObject;
        e.preventDefault;
        if ( e.deltaY  > 0 )
        {
            if ( eventObject.WheelIndex < eventObject.Text.length-10  )
            {
               eventObject.WheelIndex++;  
            }
        }
        if ( e.deltaY  < 0 )
        {
            if ( eventObject.WheelIndex > 0 )
            {
                eventObject.WheelIndex--; 
                
            }
        }
        eventObject.Draw();
    
    }
    GetCharAtCursorPosition(cursorx, cursory)
    {
        return this.Text[cursory][cursorx];
    }
    // @ misc function
    CursorPositionToScreenPosition(cursorx,cursory)
    {
        var y = this.YMRG + cursory * this.fontSize + this.displayCanvas.box.y - (this.WheelIndex*this.fontSize);
        var x = cursorx * this.fontWidth + this.XMRG + this.displayCanvas.box.x; 
       return new Vector2(x,y);
    }
    CursorPositionToCanvasPosition(cursorx, cursory)
    {
        /*
            var cl = (i-this.WheelIndex) * this.fontSize ;
            g.fillText(this.Text[i], this.XMRG , this.YMRG + cl );
        */
        var y = this.YMRG + cursory * this.fontSize ;
        var x = cursorx * this.fontWidth + this.XMRG; 
        return new Vector2(x,y);
        
    }
    ScreenPositionToCursorPosition(x,y)
    {
        var py = Math.ceil((y-this.displayCanvas.box.y+(this.WheelIndex*this.fontSize)-this.YMRG)/this.fontSize); 
        
        if ( py < 0 )
            py = 0;
        if ( py >= this.Text.length)
            py = this.Text.length -1
        
        var px = Math.ceil((x -this.displayCanvas.box.x-this.XMRG) / this.fontWidth)
        
        if ( px < 0 )
            px = 0;
        if ( px >= this.Text[py].length)
            px = this.Text[py].length -1
        
        return new Vector2(px,py);
    }
    
    
}




