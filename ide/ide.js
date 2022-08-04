// @ Code editor

// Replace all thing relative to windowsindex or something

class IDE 
{

    constructor (canvas)
    {
        this.Canvas = canvas;
        this.Text = new Array();
        this.Text.push("");
        this.CapsEnabled = false;
        this.LineIndex = 0;
        this.ColumnIndex = 0; 
        this.WheelIndex = 0
        this.cursorVisible = false;
        this.ctrlPressed = false;
        this.BlockID = 0; 
        this.selectionStart = null;; 
        this.selectionEnd = null;
        this.hasUpdated   = false;
        this.hide = false;
        
        // all of this is working...
        this.Canvas.general.onmousedown = function (e) { ide.MouseDownEvent(e); console.log("Mouse down on IDE") } ; 
        this.Canvas.general.onmousemove = function (e) { ide.MouseMoveEvent(e);console.log("Mouse move on IDE") } ; 
         this.Canvas.general.addEventListener("DOMMouseScroll", this.MouseWheelHandler1, false);
         this.Canvas.general.addEventListener('wheel',this.MouseWheelHandler2 );
        
         this.Canvas.general.addEventListener("keydown", this.KBEvent, false);
         this.Canvas.general.addEventListener("keyup", this.KUEvent, false);
        
    
        
        this.DrawIde();
        setInterval(this.DrawCursor, 700 );
        
    }
    handlePaste () {
  
        navigator.clipboard.readText()
        .then(text => {
            var splittext = text.split("\r\n"); 
            var i; 
            var furthertext = ide.Text[ide.ColumnIndex].substr(ide.LineIndex,ide.Text[ide.ColumnIndex].length);
            ide.Text[ide.ColumnIndex] = ide.Text[ide.ColumnIndex].substr(0,ide.LineIndex);
            ide.Text[ide.ColumnIndex] += splittext[0];
            
            for ( i = 1 ; i < splittext.length; i++ ) 
            {
                
                ide.Text.splice(ide.ColumnIndex + i, 0, splittext[i] );
            }
            ide.ColumnIndex += splittext.length - 1; 
            ide.LineIndex = ide.Text[ide.ColumnIndex].length;
            ide.Text[ide.ColumnIndex] += furthertext;
         
            ide.DrawScriptText();
            
            
        })
        .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
        });
    }
   
    DrawCursor() 
    {
        // blinking mechanics
        var g = ide.Canvas.context;
         g.lineWidth = 1;
        if ( ide.cursorVisible)
        {
           g.strokeStyle = 'rgb(0,0,0)';
            var cl = 9+(ide.ColumnIndex-ide.WheelIndex) * 16 ;
            var ll = ide.LineIndex * 9.6 +12; // between 9 and 10 ... 
            g.strokeRect(ll,cl,1, 14);
        }
        else 
        { 
            // @ Clear
            g.strokeStyle = 'rgb(255,255,255)';
            var cl = 9+(ide.ColumnIndex-ide.WheelIndex) * 16 ;
            var ll = ide.LineIndex * 9.6 +12; // between 9 and 10 ..
             g.strokeRect(ll,cl,1, 14);
        }
        
        ide.cursorVisible = !ide.cursorVisible; 
         g.lineWidth = 5;
    } 
    DrawIde()
    {
        this.BlankWindow();
        var g = this.Canvas.context;
        g.lineWidth = 3;
        g.strokeRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
    }
    BlankWindow()
    {
        var g = this.Canvas.context;
        g.fillStyle = 'rgb(255,255,255)';
        g.fillRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
        g.fillStyle = 'rgb(0,0,0)';
    }
    
    UpdateEditor(blocid) 
    {
        console.log("Refreshing editor");
        var bloc = GetBlockByID(blocid);
        
        if ( bloc == null ) 
        {
            this.BlockID = blocid;
            this.Text = new Array();
            this.Text.push("");
            this.ColumnIndex = 0; 
            this.LineIndex = 0;
            this.DrawScriptText();
            return;
   
        }
        
        
        this.Text = bloc.NativeScript; 
        if ( this.Text.length == 0)
        {
            this.Text.push("");
        }
        this.BlockID = blocid;
        this.ColumnIndex = 0; 
        this.LineIndex = 0;
        this.DrawScriptText();
    } 
    
    DrawScriptText()
    {
        this.BlankWindow();
        var g = this.Canvas.context;
        if ( this.selectionStart != null )
        {
            g.fillStyle = 'rgb(200,200,255)';
           
            var n ;
            for ( n = this.selectionStart.X; n < this.selectionEnd.X; n++ )
            {     
                var cl = 8+ this.ColumnIndex * 16 ;
                var ll = n * 9.6 +11; // between 9 and 10 ...
                g.fillRect(ll , cl , 16, 16  );
            }
            g.fillStyle = 'rgb(0,0,0)';
        }
        g.font = "bold 16px Courier";
        var i ; 
        for (i = 0 ; i < this.Text.length; i++ )
        {
            var cl = (i-this.WheelIndex) * 16 ;
            g.fillText(this.Text[i], 10 , 20 + cl );
        }
        this.cursorVisible = true;
        console.log("drawing on ide");
    }
    SwitchCapsMode()
    {
        this.CapsEnabled = !this.CapsEnabled; 
    }
    
    UpdateLineIndex(dir=0)
    {
        ide.cursorVisible = true;
        if ( dir == 0 ) // go to left
        {
           if ( this.LineIndex > 0 )
           {
               this.LineIndex--;
           }
        }
        else // go to right
        {
            if ( this.LineIndex < this.Text[this.ColumnIndex].length )
            {
                this.LineIndex++;
            }
        }
                this.DrawScriptText();
    }
    
    UpdateColumnIndex(dir = 0) 
    {
        ide.cursorVisible = true;
        if ( dir == 0 ) // go to down
        {
           if ( this.ColumnIndex < this.Text.length-1 )
           {
               // move also the content  from line index 
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
                this.DrawScriptText();
        OnCodeUpdate();
    }
    AddNewLine()
    {
        // push a line where column his. then update column index.
        // move string 
        if ( this.ColumnIndex == this.Text.length - 1 && this.Text.length > 9 )
        { 
            this.WheelIndex = this.Text.length-9 ;
        }
        this.Text.splice(this.ColumnIndex + 1,0,"");
        this.ColumnIndex++;
        this.LineIndex = 0;
        this.DrawScriptText();
        OnCodeUpdate();
    }
    
    DeleteLastChar()
    {
       if ( this.LineIndex == 0 ){ 
           
            if ( this.ColumnIndex == 0  ){ return; } // do nothing.
           // we should also delete this line 
           this.Text.splice(this.ColumnIndex,1);
           this.ColumnIndex --;
           OnCodeUpdate();
           
           if ( this.ColumnIndex < 0 ) {
               this.ColumnIndex = 0; 
           }
           this.LineIndex = this.Text[this.ColumnIndex].length; 
           return ; 
       }
       
        var insertText = this.Text[ide.ColumnIndex].substr(0, this.LineIndex - 1);
        insertText +=  ide.Text[ide.ColumnIndex].substr(ide.LineIndex ,ide.Text[ide.ColumnIndex].length);
        ide.Text[ide.ColumnIndex] = insertText;
        
       this.UpdateLineIndex();
       this.DrawScriptText();
       ide.hasUpdated = true;
    }
        
    MouseDownEvent(e)
    {
       SetFocusOnIDE();
       if ( ide.ctrlPressed )
       {
          
               ide.selectionStart = ide.MousePositionToTextPosition(e);
               ide.selectionEnd = ide.MousePositionToTextPosition(e);
               ide.DrawScriptText();
       }
    }
    
    MouseMoveEvent(e)
    {
        if ( ide.ctrlPressed )
       {
           if ( ide.selectionStart != null )
           
           {
               var v = ide.MousePositionToTextPosition(e);
               ide.selectionEnd = v;
               if ( v.Y > ide.selectionStart.Y  )
               {
                   ide.selectionEnd = v;
                   ide.DrawScriptText();
               }
               else
               {
                   if ( v.X > ide.selectionStart.X )
                   {
                       ide.selectionEnd =v;
                       ide.DrawScriptText();
                   }
               }
           }
       }  
    }
    MouseUpEvent(e)
    {
        // get the line from mouse  
        var v =  ide.MousePositionToTextPosition(e);
        ide.LineIndex = v.x;
        ide.ColumnIndex = v.y; 
        ide.cursorVisible =  true;
        ide.DrawScriptText();
     
    }
    
    MouseWheelHandler1(e) {
    // we need to setup for chrome ... 
    console.log("wheeling!");
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
   // mousewheeled = delta;
    
    }
    MouseWheelHandler2(e) {
        e.preventDefault;
        // mousewheeled += event.deltaY * -0.01;
        if ( event.deltaY  > 0 )
        {
            if ( ide.WheelIndex < ide.Text.length-10  )
            {
               ide.WheelIndex++;  
            }
            
            
        }
        if ( event.deltaY  < 0 )
        {
           // dont minus if wheel index is below 0 
            if ( ide.WheelIndex > 0 )
            {
                ide.WheelIndex--; 
                
            }
       
        }
        ide.DrawScriptText();
    
    }
    MousePositionToTextPosition(e)
    {
        var i ; 
        var mousetest = e.clientY - (window.innerHeight  - this.Canvas.box.h-20 - dos.Height - 20);
        var y = 0; 
        while ( true )
        {
            if ( mousetest < (y-this.WheelIndex)*16 + 20   )
            {
                y-= 2;
                break;
            } 
            y++;
        }
        //window.innerHeight  - this.Height-20 - dos.Height;
        if ( y > this.Text.length - 1 ){ y = this.Text.length - 1; }
       
        var x = 0;
        
        while ( true )
        {
            if ( e.clientX < 9.6 * x + 12 )
            {
                x --;
                break;
            }
            x++;
        }
        if ( x > ide.Text[y].length ){x = ide.Text[ide.ColumnIndex].length; }
        if ( x < 0 ){ x = 0; }
        if ( y < 0 ){ y = 0 ;}
        return new Vector2(x,y);
    
    }
    
    HideIDE(){  
        this.tempBox = new Box(this.Canvas.box.x,this.Canvas.box.y,this.Canvas.box.w,this.Canvas.box.h );
        this.Canvas.box = new Box(this.Canvas.box.x, this.Canvas.box.y, 0,0);
        this.Canvas.SetPositionAndDimension();
        // Update thumbnails pos
        ideThumbnails.Canvas.box.y = ideThumbnails.Canvas.box.y + this.tempBox.h;
        ideThumbnails.Canvas.SetPositionAndDimension();
        ideThumbnails.Draw();
        this.hide = true;
    }
    UnHideIDE()
    {
        this.Canvas.box = new Box(this.tempBox.x, this.tempBox.y, this.tempBox.w,this.tempBox.h);
        this.Canvas.SetPositionAndDimension();
             // Update thumbnails pos
        ideThumbnails.Canvas.box.y = ideThumbnails.Canvas.box.y - this.tempBox.h;
        ideThumbnails.Canvas.SetPositionAndDimension();
        ideThumbnails.Draw();
        this.DrawIde();
        this.DrawScriptText();
        this.hide = false;
    }
    KUEvent(e)
    {
        console.log("called");
        if ( e.keyCode == 17 ) 
        {
            ide.ctrlPressed = false;
        }
    }
    KBEvent(e)
    {
        // SOME STUFF TO AVOID CRASH HERE MY GOD ...
        console.log("key on ide");
        // Super weird that here columnindex is not defined lol 
        ide.selectionStart = null; 
        ide.selectionEnd = null; 
        switch ( e.keyCode )
        {
            case 20: ide.SwitchCapsMode(); return;
            case 37: ide.UpdateLineIndex(); return;
            case 39 : ide.UpdateLineIndex(1); return;
            case 8: ide.DeleteLastChar(); return;
            case 13: ide.AddNewLine(); return;
                
            case 37: ide.UpdateLineIndex(); return;
            case 39: ide.UpdateLineIndex(1); return;
            case 40: ide.UpdateColumnIndex(); return;
            case 38: ide.UpdateColumnIndex(1); return;
            case 17: ide.ctrlPressed = true;  return;
            case 86: if ( ide.ctrlPressed){ide.handlePaste(); return;} break;
            
          
        }
        var insertText = ide.Text[ide.ColumnIndex].substr(0, ide.LineIndex);
        if ( !KeyIsIllegal(e.key) )
        {
            insertText += e.key;
        }
        ide.hasUpdated = true;
        
        insertText +=  ide.Text[ide.ColumnIndex].substr(ide.LineIndex ,ide.Text[ide.ColumnIndex].length);
        ide.Text[ide.ColumnIndex] = insertText;
        ide.DrawScriptText();
        ide.UpdateLineIndex(1);
        

    }
}


var ide;
//onkeydown = function(e){e.preventDefault()}; // disable shitty stuff ... 

function InitIDECanvas()
{
    
    var formone = document.getElementById('form1');
    var newDiv = document.createElement("div");
    newDiv.id = "ide_div";
    var canv = document.createElement('canvas');
    canv.id = 'ide';
    canv.tabIndex = 1000;
    formone.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    var spcanvas = new Canvas(canv, newDiv,
                              new Box(  EditorCanvas.box.x, window.innerHeight-window.innerWidth/8-20 - prompt.Canvas.box.h, 
                                       EditorCanvas.box.w,  window.innerWidth/8));
    ide = new IDE(spcanvas);
}

function OnCodeUpdate()
{
    // @ Code Update everytime we have changed a line and we switch to a new line 
    if (!ide.hasUpdated)
        return;
    
    var bloc = GetBlockByID(ide.BlockID);
    if (bloc == null )
        return;
    RefreshNativeScriptFromBlock(bloc);
    
    
    console.log("Update Code");
    ide.hasUpdated = false;
}

class IdeExplorer extends ThumbnailExplorer
{
    SetThumbnailPriority(index)
    {
        array_move(this.Thumbnails, index, 0);
        if ( this.Thumbnails.length > 0 )
            ide.UpdateEditor(this.Thumbnails[0].id);
        this.Draw();
    }
    GetTitleAtThumbnailIndex(index)
    {
        return this.Thumbnails[index].typename;
    }
    GetSimilarThumbnailIndex(data)
    {
        var i;
        for (i=0;i<this.Thumbnails.length;i++)
        {
            if (this.Thumbnails[i].typename == data.typename)
                return i;
        }
        return -1;
    }
    MouseEvent(e)
    {
        var i; 
        var x = 0;
        var thumbwidth = ideThumbnails.Canvas.box.w / ideThumbnails.Thumbnails.length;
        // apply a max ... 
        if ( thumbwidth > ideThumbnails.Canvas.box.w / 10 )
        {
            thumbwidth = ideThumbnails.Canvas.box.w / 10 ; 
        }
        for ( i = 0; i < ideThumbnails.Thumbnails.length; i++ )
        {
            if ( IsVectorInsideBox(new Vector2(mouseX - ideThumbnails.Canvas.box.x, mouseY - ideThumbnails.Canvas.box.y), new Box(x,0,thumbwidth,ideThumbnails.Canvas.box.h-1)))
            {
                // Do something here when clicking ...
                ideThumbnails.SetThumbnailPriority(i);
                // remove if clickclock
                //thumbexplorer.Thumbnails.splice(i,1);
                //thumbexplorer.ThumbNames.splice(i,1);
                ideThumbnails.Draw();
                
                return;
            }
             x+= thumbwidth; 
        }
    }
    
}


var ideThumbnails;


function InitIDEThumbnails()
{
    var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "idethumbdiv";
    var canv = document.createElement('canvas');
    canv.id = 'idethumbcanv';
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    var spcanvas = new Canvas(canv, newDiv,
                              new Box( EditorCanvas.box.x, window.innerHeight-ide.Canvas.box.h-prompt.Canvas.box.h-window.innerHeight/24-20, 
                                       EditorCanvas.box.w, window.innerHeight/24));
    
    spcanvas.SetPositionAndDimension();
    ideThumbnails = new IdeExplorer(spcanvas);
   
}
function CloseAllIDETabs()
{
    ideThumbnails.Thumbnails = new Array();
    ideThumbnails.Draw();
    // Empty ide 
    ide.BlockID = 0; 
    ide.Text ="";
    ide.DrawIde();
    ide.DrawScriptText();
}
function OpenAllIDETabs()
{
    var i;
    for (i = 0 ; i < Blocks.length; i++ )
        ideThumbnails.AddThumbnail(Blocks[i]);
    ideThumbnails.Draw();
}


