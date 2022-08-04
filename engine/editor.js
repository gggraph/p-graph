// @ Visual Scripting Editor

// @ General Interaction
// @ Default Grab structure
class Grab
{
    // @  Reserved ID
    // -1  On miniscreen
    // -10 On Lib Bar
    constructor(id, offset)
    {
        // @ Id of grab 
        this.Id = id;
        this.Offset = offset;
    }
}
var currentGrab = null;
var currentTyping = -1; // @  -1 : null reserved 
var inPlayMode = false;

function UserIsInteracting()
{
    if (currentGrab != null || linkedData.blocId > -1 || currentTyping != -1 )
        return true;
    return false;
}
// @ String Info
var EditorInfo = "hello";
// @ Display
var EditorCanvas;

function InitEditorCanvas()
{
    var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "maindiv";
    var canv = document.createElement('canvas');
    canv.id = 'maincanvas';
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    EditorCanvas = new Canvas(canv, newDiv,
                             new Box(window.innerWidth /2- 10,0,window.innerWidth /2- 10, window.innerHeight - (window.innerHeight/20)));
    // Add some listener
    EditorCanvas.general.onmouseenter = function(){EditorCanvas.mouseisover = true;};
    EditorCanvas.general.onmouseleave = function(){EditorCanvas.mouseisover = false;};
    EditorCanvas.general.onmousedown = function(){EditorCanvas.mousepressed = true; SetFocusOnEditor();};
    EditorCanvas.general.onmouseup = function(){EditorCanvas.mousepressed = false;};
    EditorCanvas.general.addEventListener('dblclick', function (e) {ProccessEditorDoubleClicking(); console.log("has double clicked");});
    
}

function BangAtLoad()
{
    
    var i;
    for (i = 0 ; i < Blocks.length; i++ )
    {
        if ( Blocks[i].typename == "onload")
        {
            // Run OIO to each object connected 
            var n;
            for (n = 0 ;  n < Blocks[i].outputslots[0].length; n++)
            {
                var b = GetBlockByID(Blocks[i].outputslots[0][n].blocId);
                b.OIO();
                
            }
        }
    }
}
// @ Better double-clicked 12/07/2022
function ProccessEditorDoubleClicking()
{
    // Do not rename if currently interacting ...
    EditorCanvas.hasdoubleclicked = true;  
    var i;
    for (i = 0 ; i < Blocks.length; i++ )
    {
         if ( !TryInteractSpecial(Blocks[i])) 
            Blocks[i].TryInteract();
    }
    EditorCanvas.hasdoubleclicked = false;  
}

// @ Core loop
function RunEditor()
{
    EditorInfo = "";
    // @ Try Resize Editor
    TryResizingEditor
    // @ Proccess All blocks
    ProccessAllBlocks();
    //@ Print editor info
    PrintEditorInfo();
    
   
}

function TryResizingEditor()
{
     //@ Check SCREEN/EDITOR ratio
    if (currentGrab == null  )
    {
        if ( IsMouseInsideBox(new Box(-10, 0, 20, EditorCanvas.box.h), EditorCanvas) )
        {
            // @ Set cursor
            document.body.style.cursor = "e-resize";
            if ( mousepressed)
            {
                currentGrab = new Grab(-20, new Vector2());
                console.log("should resize");
            }
        }
        else if ( document.body.style.cursor == "e-resize")
        {
            if ( inPlayMode )
            {
                document.body.style.cursor = "pointer";
            }
            else
            {
                document.body.style.cursor = "default"; 
            }
        }
    }
    if ( currentGrab != null )
    {
        
        if  (currentGrab.Id == -20)
        {
            if ( !mousepressed)
            {
                currentGrab = null;
                return;
            }
            // resize from mouseX pos...
            ResizeScreenEditorRatio(mouseX);
            
        }
    }
    
}

function ProccessAllBlocks()
{
     var _g = EditorCanvas.context;
    _g.fillStyle = 'rgb(255,255,255)';
    
    _g.fillRect(0,0,EditorCanvas.box.w, EditorCanvas.box.h);
    
    // @ Display Blocks
    var i; 
    for (i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].Window == windowThumbnails.Thumbnails[0])
        {
             Blocks[i].Draw();
             Blocks[i].Interact();
        }
       
    }
}

function PrintEditorInfo()
{
    // @ Print Editor Info In Black Square
     var _g = EditorCanvas.context;
     _g.fillStyle = 'rgb(0,0,0)';
    //EditorCanvas.box.x, window.innerHeight-ide.Canvas.box.h-prompt.Canvas.box.h-window.innerHeight/24-20, EditorCanvas.box.w, window.innerHeight/24
    var heightsize = window.innerHeight/24;
    var ypos = heightsize//window.innerHeight-ide.Canvas.box.h-prompt.Canvas.box.h-(heightsize*2)
    _g.fillRect(0,ypos,EditorCanvas.box.w, heightsize);
    // EditorCanvas.box.x, 0, EditorCanvas.box.w, window.innerHeight/24
    //_g.fillRect(0,heightsize,EditorCanvas.box.w, heightsize);
    
    // Draw Info
     var fontsize = 16;
     _g.fillStyle = 'rgb(255,255,255)';
     _g.font = 'bold '+fontsize.toString()+'px Courier';
     _g.fillText(EditorInfo, 10, ypos+10 ); 
}


// @ Wiring Info when proccess wiring 
class WiringInfo
{
    constructor(blocid = -1, comNumber = 0, fromInput = false)
    {
        this.blocId = blocid;
        this.comPort = comNumber;
        this.fromInput = fromInput;
    }
}
var linkedData  = new WiringInfo();

function GetValidIOAtPosition()
{
    var i;
    for (i = 0; i < Blocks.length; i++)
    {
        if ( Blocks[i].id == linkedData.blocId )
            continue;
        if (linkedData.fromInput)
        {
            var n;
            for (n=0; n < Blocks[i].outputsboxes.length; n++)
            {
                if (IsMouseInsideBox(Blocks[i].outputsboxes[n], EditorCanvas))
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
                if (IsMouseInsideBox(Blocks[i].inputsboxes[n], EditorCanvas))
                {
                    return new Array(i,n);
                }
            }
        }
        
    }
    
    return false;
}

// @ Configure mouse accuracy 
var mouseAccuracyCanvas = null;

function CreateMouseAccuracyCanvas()
{
    if ( mouseAccuracyCanvas == null )
    {
        var form = document.getElementById('mainform');
        var newDiv = document.createElement("div");
        newDiv.id = "mouseaccurdiv";
        var canv = document.createElement('canvas');
        canv.id = 'mouseaccurcanvas';
        form.appendChild(newDiv);
        newDiv.appendChild(canv);
        mouseAccuracyCanvas = new Canvas(canv, newDiv,new Box (0,0,0,0));
         mouseAccuracyCanvas.general.onmousedown = function(){SetMouseAccuracy();};
    }
    mouseAccuracyCanvas.box = new Box (ScreenCanvas.box.w/4, ScreenCanvas.box.h/4, window.innerHeight /2, window.innerHeight /2);
    mouseAccuracyCanvas.focusPosition = 999;
    mouseAccuracyCanvas.SetPositionAndDimension();
    DrawMouseAccuracy();
   
    // Add some listener
   
  
}
function DrawMouseAccuracy()
{
     var _g = mouseAccuracyCanvas.context;
        // Fill
    _g.fillStyle = 'rgb(0,0,0)'; 
    _g.fillRect(0,0,mouseAccuracyCanvas.box.w, mouseAccuracyCanvas.box.h);  
    
    // Circle
    _g.strokeStyle = 'rgb(255,255,255)'; 
    _g.lineWidth = 3;
    var centerx = mouseAccuracyCanvas.box.w/2;
    var centery = mouseAccuracyCanvas.box.h/2;
    var rad = 10;
    _g.beginPath();
    _g.arc(centerx, centery, rad, 0, 2* Math.PI, false);
    _g.stroke();
    _g.closePath();
    
    //Cross
    _g.lineWidth = 3;
        
        // First line 
    _g.beginPath();
    _g.moveTo(0, mouseAccuracyCanvas.box.h/2);
    _g.lineTo(mouseAccuracyCanvas.box.w, mouseAccuracyCanvas.box.h/2);
    _g.closePath();
    _g.stroke();
    // First line 
    _g.beginPath();
    _g.moveTo(mouseAccuracyCanvas.box.w/2, 0);
    _g.lineTo(mouseAccuracyCanvas.box.w/2, mouseAccuracyCanvas.box.h);
    _g.closePath();
    _g.stroke();
}
function SetMouseAccuracy()
{
    var mX = mouseX + cursorDimension.x;
    var mY = mouseY + cursorDimension.y;
    cursorDimension = new Vector2(mX-mouseAccuracyCanvas.box.x-mouseAccuracyCanvas.box.w/2, 
                                 mY-mouseAccuracyCanvas.box.y-mouseAccuracyCanvas.box.h/2);
     mouseAccuracyCanvas.box = new Box (0,0,0,0);
     mouseAccuracyCanvas.focusPosition = 999;
     mouseAccuracyCanvas.SetPositionAndDimension();
    prompt.AddEventText("mouse calibration set to X"+cursorDimension.x + " Y"+cursorDimension.y);
}


// @ Polling Mouse & Keyboard
// @ Poll Mouse
var mousepressed = false;
var mouseX = 0; // more readable access to e.client 
var mouseY = 0; // more readable access to e.client 

var cursorDimension = new Vector2(10,20);
onmousedown = function(e){  mousepressed = true; };
onmouseup = function(e){  mousepressed = false; };
onmousemove = function(e){  mouseX = e.clientX - cursorDimension.x ; mouseY=e.clientY - cursorDimension.y; };

var ctrlPressed = false;
var shftPressed = false;
// @ keycode depend on browser
onkeydown = function(e){
     if ( currentTyping == -2 )
    {
           // @ Proccess renaming
            windowThumbnails.ProccessRenaming(e);
            return;
        
    }
    if ( currentTyping >= 0 )
    {
           // @ Proccess renaming
            var bloc = GetBlockByID(currentTyping);
            bloc.ProccessRenaming(e);
            return;
        
    }
    if ( e.keyCode == 78 && isEditorFocus()) // @n
    { 
       CreateNewBlock();
    }
     if ( e.keyCode == 13 && isEditorFocus()) // @ enter
    { 
        if ( ide.hide )
        {
            ide.UnHideIDE();
        }
        else
        {
            ide.HideIDE();
        }
    }
    if ( e.keyCode == 17) // @ctrl
    { 
        ctrlPressed = true;
    } 
    if ( e.keyCode == 16) // @shift
    { 
       shftPressed = true;
    } 
};
onkeyup = function(e){
   
    if ( e.keyCode == 17) // @ctrl
    { 
      ctrlPressed = false;
    } 
    if ( e.keyCode == 16) // @shift
    { 
       shftPressed = false;
    }
    if ( e.keyCode == 164)
    {
        if  (!UserReadLibrary)
            OpenDoc();
        else
            CloseDoc();
    }
};

