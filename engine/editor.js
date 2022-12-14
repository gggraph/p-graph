// Should allow renaming windows... 
// When db click. It should allow blinking text. & draw continuously. 
class WinExplorer extends Onglets
{
    
    Stroke()
    {
        var g = this.Canvas.context;
        g.strokeStyle = 'rgb(0,0,0)';
        g.lineWidth = 2;
        g.strokeRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
    }
    GetTitleAtThumbnailIndex(index)
    {
        return this.Thumbnails[index];
    }
    GetSimilarThumbnailIndex(data)
    {
        var i;
        for (i=0;i<this.Thumbnails.length;i++)
        {
            if (this.Thumbnails[i] == data)
                return i;
        }
        return -1;
    }
    MouseEvent(e)
    {
        var i; 
        var x = 0;
        var thumbwidth = this.eventObject.Canvas.box.w / (this.eventObject.Thumbnails.length+1);
        // apply a max ... 
        if ( thumbwidth > this.eventObject.Canvas.box.w / 10 )
        {
            thumbwidth = this.eventObject.Canvas.box.w / 10 ; 
        }
        for ( i = 0; i < this.eventObject.Thumbnails.length; i++ )
        {
            if ( IsVectorInsideBox(new Vector2(mouseX - this.eventObject.Canvas.box.x, mouseY - this.eventObject.Canvas.box.y), new Box(x,0,thumbwidth,this.eventObject.Canvas.box.h-1)))
            {
                // Do something here when clicking ...
                Editor.AddNewWindow(this.eventObject.Thumbnails[i]);
                return;
            }
             x+= thumbwidth; 
        }
        if ( IsVectorInsideBox(new Vector2(mouseX - this.eventObject.Canvas.box.x, mouseY - this.eventObject.Canvas.box.y), new Box(x,0,this.eventObject.Canvas.box.h,this.eventObject.Canvas.box.h-1)))
        {
            this.plushl = true;
            Editor.AddNewWindow("win"+Editor.Windows.length);
            
        }
        else
            this.plushl = false;
    }
    // @  --> From Key Event
    OnDoubleClick() 
    {
        // We need some blinking mechanism so we should constantly refreshing Draw() fonction... example : eval("while())
    }
    Draw()
    {
        // Blank
        this.Blank();
        // Do nothing if no onglet
        if ( this.Thumbnails.length == 0 ){ return ; }
        
        var g = this.Canvas.context;
        
        // Compute onglet width 
        var thumbwidth = this.Canvas.box.w / (this.Thumbnails.length+1);
        // Cap Onglet width if needed
        if ( thumbwidth > this.Canvas.box.w / 10 )
        {
            thumbwidth = this.Canvas.box.w / 10 ; 
        }
        if ( thumbwidth<40)
            thumbwidth= 40;
        var x = 0;
        // Draw onglet and text
        for ( var i = 0 ; i < this.Thumbnails.length; i++ )
        {
             var title = this.GetTitleAtThumbnailIndex(i);
             var wc = g.measureText(title).width; 
             
             // Lowered text while onglet is lower that 75% of onglet width...
            while ( wc > (this.Canvas.box.w / 10 * 0.75))
            {
                title = title.substr(0,title.length-1) 
                wc = g.measureText(title).width; 
            } 
            
            // @ Draw box 
             g.fillStyle = VisualParameters.OngletsFillColor;
            // if hightlight (i=0) use hightlight color
            if ( IsMouseInsideBox(new Box(x,1,thumbwidth, this.Canvas.box.h-1), this.Canvas))
                 g.fillStyle = VisualParameters.OngletsPassLightColor;
            if ( i==0)
                g.fillStyle = VisualParameters.OngletsHighLightColor;
            
             g.fillRect(x,1,thumbwidth, this.Canvas.box.h-1);
            
             // @ Draw Text
             g.fillStyle = VisualParameters.OngletsStrokeColor;
             g.font = VisualParameters.OngletsFont;
             g.fillText(title,x + (thumbwidth/2) - (wc/2), (this.Canvas.box.h-1)/2 + VisualParameters.OngletsFontSize/4 );
            
             x+= thumbwidth; 
        }
        
        // add a + here 
        g.fillStyle = "rgb(0,0,0)";
        if ( this.plushl == true )
            g.fillStyle = VisualParameters.OngletsPassLightColor;
        g.fillRect(x,1,this.Canvas.box.h-1, this.Canvas.box.h-1);
        g.strokeStyle = 'rgb(0,0,0)';
        //g.strokeRect(x,1,this.Canvas.box.h-1, this.Canvas.box.h-1);
        g.fillStyle = VisualParameters.OngletsStrokeColor;
        g.font = VisualParameters.OngletsFont;
        wc = g.measureText("+").width; 
        g.fillText("+",x + (this.Canvas.box.h/2) - (wc/2), (this.Canvas.box.h-1)/2 + VisualParameters.OngletsFontSize/4 );
        //this.Stroke();
    }
    ProccessRenaming(e)
    {
    }
    
    
}
class PatchEditor
{
    
    constructor()
    {
        // @ Create Patch canvas
        this.Canvas = CreateCanvas(0,0,0,0);
        this.Canvas.general.tabIndex = 1000;
        // @ Set up windows space...
        this.Windows = new Array();
        this.WindowExplorer = new WinExplorer();
        this.AddNewWindow("default");
        this.PatchInstances = new Array();
        // @ Play Mode system
        this.inPlayMode = false;
        // @ Set up events 
        this.Canvas.general.addEventListener('mousedown', SetFocusOnEditor ,false);
        //this.Canvas.general.addEventListener('mouseup', this.OnMouseUp,false);
        this.Canvas.general.addEventListener('keydown', this.OnKeyDown, false);
        this.Canvas.general.addEventListener('dblclick',this.OnDoubleClick);
        
    }
    SetExplorerDimension(box)
    {
        this.WindowExplorer.SetDimension(box);
    }
    SetPatchDimension(box)
    {
        this.Canvas.box = box;
        this.Canvas.SetPositionAndDimension();
    }
    
    Run()
    {
        this.Info = "";
        this.TryResizing();
        this.ProccessPatchBlocks();
        this.PrintInfo();
        this.ProccessSelection();
    }
    SetPlayMode()
    {
        
    }
    
    TryResizing()
    {
        if ( !UserIsGrabbing)
        {
            if ( IsMouseInsideBox(new Box(-10, 0, 20, this.Canvas.box.h), this.Canvas ) )
            {
                // @ Set cursor
                document.body.style.cursor = "e-resize";
                if ( mousepressed)
                {
                    UserIsGrabbing = true;
                    this.borderGrabbed = true;
                }
            }
            else if ( document.body.style.cursor == "e-resize")
            {
                if ( this.inPlayMode )
                {
                    document.body.style.cursor = "pointer";
                }
                else
                {
                    document.body.style.cursor = "default"; 
                }
            }
        }
        if (this.borderGrabbed == true)
        {
            if ( !mousepressed)
            {
                UserIsGrabbing = false;
                this.borderGrabbed = false;
                return;
            }
            ResizeScreenEditorRatio(mouseX);
        }
    }

    ProccessPatchBlocks()
    {
         var _g = this.Canvas.context;
        _g.fillStyle = VisualParameters.BlockFillColor;
        _g.fillRect(0,0,this.Canvas.box.w, this.Canvas.box.h);
        _g.lineWidth =  VisualParameters.BlockBorderWidth;
        _g.strokeStyle = VisualParameters.BlockStrokeColor;
        _g.strokeRect(0,0,this.Canvas.box.w, this.Canvas.box.h);

        // @ Display Blocks
        var i; 
        for (i = 0 ; i < Blocks.length; i++)
        {
            if ( Blocks[i].Window == this.WindowExplorer.Thumbnails[0])
            {
                 Blocks[i].Draw();
                 Blocks[i].Interact();
                 if ( this.SelectionBox != null )
                     Blocks[i].selected = IsBoxInsideBox(Blocks[i].bodyBox, this.SelectionBox)
            }

        }
    }
    
    PrintInfo()
    {
        var _g = this.Canvas.context;
        if ( this.Info.length == 0 )
            return;


        var height = 12;
        _g.font = 'bold '+ height.toString()+ 'px Courier';
        var m = _g.measureText(this.Info)

        _g.fillStyle = VisualParameters.BlockStrokeColor;
        _g.fillRect(mouseX-this.Canvas.box.x,mouseY-this.Canvas.box.y-height,m.width, height + height/2);

        _g.fillStyle = VisualParameters.BlockFillColor;
        _g.fillText(this.Info, mouseX-this.Canvas.box.x,mouseY-this.Canvas.box.y ); 

    }
    
    // Windows 
    AddNewWindow(windowName)
    {
        var index = this.Windows.indexOf(windowName);
        if ( index > -1 )
        {
             this.WindowExplorer.AddThumbnail(windowName);
             return false;
        }
        else
        {
            this.Windows.push(windowName);
            this.WindowExplorer.AddThumbnail(windowName);
            return true;
        }
    }
    CloseWindow(windowName)
    {
        this.WindowExplorer.CloseThumbnail(windowName);
    }
    OpenAllWindows()
    {
        var i; 
        for (i = 0 ; i < Blocks.length; i++ )
        {
            this.AddNewWindow(Blocks[i].Window);
        }
    }
    CloseAllWindows()
    {
         this.WindowExplorer.Thumbnails = new Array();
         this.AddNewWindow("default");
    }
    DestroyAllWindows()
    {
         // Close documentation
         Documentation.Close();
         // If IDE is defined...
         ide.CloseAllTabs();
         // Destroy all Blocks
         for ( var i = 0 ; i < Blocks.length; i++ )
             Blocks[i].Destroy();
         Blocks = new Array();
         this.Windows = new Array();
         this.WindowExplorer.Thumbnails = new Array();
         this.AddNewWindow("default");
    }
    DestroyWindow(windowname)
    {
        DestroyAllBlocksInWindow(windowname);
        this.CloseWindow(windowname);
        var idx = this.Windows.indexOf(windowname);
        if ( idx > -1 ){ this.Windows.splice(idx,1)}
    }
    GetEmptyWindow()
    {
        // Iterate through all windows. iterate through all blocks searching for 
        for (var i = 0 ; i < this.Windows.length; i++ )
        {
            for (var n = 0 ; n < Blocks.length; n++ )
            {
                var _f = false;
                if ( Blocks[i].Window == this.Windows[i])
                {
                    _f = true;
                    break;
                }
                if (!_f)
                    return this.Windows[i];
            }
        }
        return "win"+this.Windows.length;
    }
    
    
    // Wiring Utilities
    GetValidIOAtPosition(block)
    {
        var i;
        for (i = 0; i < Blocks.length; i++)
        {
            if ( block.Window != Blocks[i].Window)
                continue;
            
            if ( Blocks[i].id == block.wiringData.blocId )
                continue;
            
            if (block.wiringData.fromInput)
            {
                var n;
                for (n=0; n < Blocks[i].outputsboxes.length; n++)
                {
                    if (IsMouseInsideBox(Blocks[i].outputsboxes[n], block.displayCanvas)) 
                    {
                        return new Array(i,n);
                    }
                }
            }
            else
            {
                var n;
                for (n=0; n < Blocks[i].inputsboxes.length; n++)
                {
                    if (IsMouseInsideBox(Blocks[i].inputsboxes[n], block.displayCanvas))
                    {
                        return new Array(i,n);
                    }
                }
            }

        }

        return false;
    }
    
    // User Interaction
    OnDoubleClick()
    {
        Editor.hasdoubleclicked = true;  
        var i;
        for (i = 0 ; i < Blocks.length; i++ )
        {
             if ( Blocks[i].Window == Editor.WindowExplorer.Thumbnails[0])
            {
               Blocks[i].TryInteract();
            }
          
        }
        Editor.hasdoubleclicked = false;  
    }
    OnKeyDown(e)
    {
        
        // Get renamed block.
        for ( var i = 0 ; i < Blocks.length; i++)
        {
            if ( Blocks[i].renaming)
            {
                Blocks[i].ProccessRenaming(e);
                return;
            }
                
        }
        // Some short keys here : 
        // [N]                  Create new block
        // [ENTER]              Hide/Show Editor
        // [I]                  Create number block
        // [K]                  Create knob block
        // [CTRL+C]             Copy Selected block 67
        // [CTRL+V]             Paste Selected blocks. 86
        // [CTRL+X]             use window def (88)
        // [P]                  Switch betwwen play mode/ edition mode 
        //console.log(e.keyCode);
        switch ( e.keyCode)
        {
            case 67: if ( ctrlPressed){Editor.CopySelection()}break;
            case 86: if (ctrlPressed){Editor.PasteSelection()}break;
            case 88: if (ctrlPressed) {Editor.CopySelection(true)}break;
            case 46: Editor.DestroySelection(); break;
            case 78:  CreateNewBlock();break;
            case 13: if ( ide.hide){ide.UnHide()}else{ide.Hide();}break;
        }
       
    }
    ProccessSelection()
    {
        // Check if we can start selection 
        if ( mousepressed )
        {
            if ( this.SelectionBox == null )
            {
                if ( UserIsGrabbing || UserIsTyping || UserIsWiring)
                    return;
                UserIsGrabbing = true;
                this.SelectionBox = new Box(mouseX - this.Canvas.box.x, mouseY- this.Canvas.box.y, 0, 0);
                return;    
            }
            this.SelectionBox.w = (mouseX-this.Canvas.box.x) -this.SelectionBox.x ;
            this.SelectionBox.h = (mouseY-this.Canvas.box.y) -this.SelectionBox.y;
            // @ Update selection UI
            // @ Stroke square at selection...
            var _g = this.Canvas.context;
            _g.lineWidth = 1;
            _g.strokeStyle = VisualParameters.BlockStrokeColor;
            _g.strokeRect(this.SelectionBox.x, this.SelectionBox.y, this.SelectionBox.w, this.SelectionBox.h);            
        }
        else
        {
            if ( this.SelectionBox == null )
                return;
            //@ Do something here where selection
            UserIsGrabbing = false;
            this.SelectionBox= null;
        }
        
    }
    // Selection can be grabbed all at once. Can be copy etc. 
    
    CopySelection(cut=false) 
    {
        this.SelectedBlocks = new Array();
        for ( var i = 0 ; i < Blocks.length; i++ )
        {
            if ( Blocks[i].selected)
            {
                this.SelectedBlocks.push(Blocks[i]);
                if ( cut)
                    Blocks[i].Window = "presspaper";
            }
                
        }
        // signal it
        prompt.AddEventText(this.SelectedBlocks.length + " blocks copied...")
    }
    DestroySelection()
    {
        this.SelectedBlocks = new Array();
        for ( var i = Blocks.length-1 ; i >= 0 ; i-- )
        {
            if ( Blocks[i].selected)
                Blocks[i].Destroy();
        }
    }
    PasteSelection()
    {
        // Copy to current window all selected blocks...
        if ( this.SelectedBlocks == null)
            return;
        var copied = CopyCreateGroupOfBlocks(this.SelectedBlocks, new Vector2(mouseX, mouseY),
                                Editor.WindowExplorer.Thumbnails[0], Editor.Canvas);
        for ( var i = 0 ; i < copied.length ; i++)
            copied[i].selected = true;
        if ( this.SelectedBlocks[0].Window == "presspaper")
        {
            for ( var i = 0 ; i < this.SelectedBlocks.length; i++ )
            {
                this.SelectedBlocks[i].Destroy();
            }
        }
        // also selected new blocks copied...
        this.SelectedBlocks = null;
    }
    OnMouseDown(e)
    {
        SetFocusOnEditor();
    }
    OnMouseUp(e)
    {
       
    }
    
}

var Editor;

// General data
var mousepressed = false;
var ctrlPressed = false;
var shftPressed = false;
var mouseX = 0; // more readable access to e.client 
var mouseY = 0; // more readable access to e.client 

var cursorDimension = new Vector2(10,20);
onmousedown = function(e){  mousepressed = true; };
onmouseup = function(e){  mousepressed = false; };
onmousemove = function(e){  mouseX = e.clientX - cursorDimension.x ; mouseY=e.clientY - cursorDimension.y; };

// General events 
onkeydown = function(e)
{
    if ( e.keyCode == 17 || e.keyCode == 91 ) // @ctrl
    { 
        ctrlPressed = true;
    } 
    if ( e.keyCode == 16 ) // @shift
    { 
       shftPressed = true;
    } 
    e.preventDefault();
}
onkeyup = function(e){
   
    if ( e.keyCode == 17 || e.keyCode == 91) // @ctrl
    { 
      ctrlPressed = false;
    } 
    if ( e.keyCode == 16) // @shift
    { 
       shftPressed = false;
    }
   
};
// General user interaction info

var UserIsGrabbing = false;
var UserIsTyping   = false;
var UserIsWiring   = false;

