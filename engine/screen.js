var ScreenCanvas;
var miniScreenCanvas;
var miniScreenOpened = false;

function InitScreenCanvas()
{
    var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "screendiv";
    var canv = document.createElement('canvas');
    canv.id = 'screencanvas';
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
   ScreenCanvas = new Canvas(canv, newDiv,
                             new Box(0,0,window.innerWidth /2 - 10, window.innerHeight - (window.innerHeight/50)));
    ScreenCanvas.focusPosition = 998;
    // Add some listener
    
    ScreenCanvas.general.onmouseenter = function(){ScreenCanvas.mouseisover = true;};
    ScreenCanvas.general.onmouseleave = function(){ScreenCanvas.mouseisover = false;};
    ScreenCanvas.general.onmousedown = function(){console.log("on screen");ScreenCanvas.mousepressed = true; SetFocusOnScreen();};
    ScreenCanvas.general.onmouseup = function(){ScreenCanvas.mousepressed = false; };
    ScreenCanvas.general.addEventListener('dblclick', function (e) {OpenCloseMiniScreen();});
    SetColor(0,0,0);
    ClearScreen();
    InitMiniScreenCanvas();
    ScreenCanvas.bordersize = 0;
    
}

function InitMiniScreenCanvas()
{
     var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "miniscreendiv";
    var canv = document.createElement('canvas');
    canv.id = 'miniscreencanvas';
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    miniScreenCanvas = new Canvas(canv, newDiv,new Box (0,0,0,0));
    miniScreenCanvas.focusPosition = 999;
   
    // Add some listener
    miniScreenCanvas.general.onmouseenter = function(){miniScreenCanvas.mouseisover = true;};
    miniScreenCanvas.general.onmouseleave = function(){miniScreenCanvas.mouseisover = false;};
    miniScreenCanvas.general.onmousedown = function(){console.log("on mini screen");OnMiniScreenMousePressed();miniScreenCanvas.mousepressed = true; SetFocusOnScreen();};
    miniScreenCanvas.general.onmouseup = function(){miniScreenCanvas.mousepressed = false;};
    miniScreenCanvas.general.addEventListener('dblclick', function (e) {OpenCloseMiniScreen();});
    
    // @ Set up border dimension
    miniScreenCanvas.bordersize = 20;
    ReDrawMiniScreen();
}

function OpenCloseMiniScreen()
{
    if ( miniScreenOpened)
    {
        currentGrab = null;
        miniScreenCanvas.box = new Box (0,0,0,0);miniScreenOpened=false;
        miniScreenCanvas.SetPositionAndDimension();
        
    }
         
    else
    {
        miniScreenCanvas.box = new Box (ScreenCanvas.box.w/4, ScreenCanvas.box.h/4, window.innerHeight /2, window.innerHeight /2);
        miniScreenOpened=true;
         miniScreenCanvas.SetPositionAndDimension();
        ReDrawMiniScreen();
    }
    console.log(miniScreenOpened)  
    
   
}
function OnMiniScreenMousePressed()
{
    var bordersize = miniScreenCanvas.bordersize;
    if ( currentGrab == null )
    {
        // if south-east body set -4 
        if ( IsMouseInsideBox(new Box(miniScreenCanvas.box.w-bordersize,miniScreenCanvas.box.h-bordersize,bordersize*2,bordersize*2), miniScreenCanvas))
        {
            console.log("inside s-e");
            currentGrab = new Grab(-4, new Vector2());
            return;
        }
        // if south body set -2 
        if ( IsMouseInsideBox(new Box(0,miniScreenCanvas.box.h-bordersize,miniScreenCanvas.box.w,bordersize*2), miniScreenCanvas))
        {
            console.log("inside south");
            currentGrab = new Grab(-2, new Vector2());
            return;
        }
        // if east body set -3 
        if ( IsMouseInsideBox(new Box(miniScreenCanvas.box.w-bordersize,0,bordersize*2,miniScreenCanvas.box.h), miniScreenCanvas))
        {
            currentGrab = new Grab(-3, new Vector2());
            console.log("inside east");
            
            return;
        }
        // if main body set -1 
        currentGrab = new Grab(-1, new Vector2(mouseX-miniScreenCanvas.box.x, mouseY - miniScreenCanvas.box.y));
    }
        
    //miniScreenCanvas.grabbed = true;
    //miniScreenCanvas.grabbedOffset = new Vector2(mouseX-miniScreenCanvas.box.x, mouseY - miniScreenCanvas.box.y);
}
function ForceResetMiniScreenPosition()
{
     miniScreenCanvas.box = new Box (ScreenCanvas.box.w/4, ScreenCanvas.box.h/4, window.innerHeight /2, window.innerHeight /2);
     miniScreenCanvas.SetPositionAndDimension();
     ReDrawMiniScreen();
}
function UpdateMiniScreenPositionAndDimension()
{
    // @ Proccess Grabbing 
    if ( currentGrab != null)
    {
        if ( currentGrab.Id == -4) // @ Check s-e redim
        {
            if (!mousepressed)
            {
                currentGrab = null;
                return;
            }
            else
            {
                miniScreenCanvas.box.w = mouseX-miniScreenCanvas.box.x;
                miniScreenCanvas.box.h = mouseY-miniScreenCanvas.box.y;
                miniScreenCanvas.SetPositionAndDimension();
                ReDrawMiniScreen();
            }
        }
        if ( currentGrab.Id == -3) // @ Check east redim
        {
            if (!mousepressed)
            {
                currentGrab = null;
                return;
            }
            else
            {
                miniScreenCanvas.box.w = mouseX-miniScreenCanvas.box.x;
                miniScreenCanvas.SetPositionAndDimension();
                SetColor(0,0,255);
                ReDrawMiniScreen();
            }
        }
        if ( currentGrab.Id == -2) // @ Check south redim
        {
            if (!mousepressed)
            {
                currentGrab = null;
                return;
            }
            else
            {
                miniScreenCanvas.box.h = mouseY-miniScreenCanvas.box.y;
                miniScreenCanvas.SetPositionAndDimension();
                SetColor(0,0,255);
                ReDrawMiniScreen();
            }
        }
        if ( currentGrab.Id == -1) 
        {
            if (!mousepressed)
            {
                currentGrab = null;
                return;
            }
            else
            {
                miniScreenCanvas.box.x = mouseX-currentGrab.Offset.x; 
                miniScreenCanvas.box.y = mouseY-currentGrab.Offset.y;
                miniScreenCanvas.SetPosition();
                
            }
        }
    }   
    
}
function ReDrawMiniScreen()
{
    // Carefull need recover fillsyle . strokestyle. linewidth 
    var _g = miniScreenCanvas.context;
    var recfillstyle = _g.fillStyle;
    var recstrstyle = _g.strokeStyle;
    var reclw       = _g.lineWidth;
    
    _g.fillStyle = 'rgb(0,0,0)';
    miniScreenCanvas.Fill();
    
    // Fill
    _g.fillStyle = 'rgb(255,255,255)'; // kind of grey ...
    _g.fillRect(0,0,miniScreenCanvas.box.w, miniScreenCanvas.bordersize); // title bar 
    _g.fillRect(0,0,miniScreenCanvas.bordersize, miniScreenCanvas.box.h); // no bar 
    _g.fillRect(miniScreenCanvas.box.w-miniScreenCanvas.bordersize,0,miniScreenCanvas.bordersize, miniScreenCanvas.box.h);// east bar 
    _g.fillRect(0,miniScreenCanvas.box.h-miniScreenCanvas.bordersize,miniScreenCanvas.box.w, miniScreenCanvas.bordersize);              // south bar 
    // Stroke
    _g.strokeStyle = 'rgb(0,0,0)';
    _g.lineWidth = 3;
     _g.strokeRect(0,0,miniScreenCanvas.bordersize, miniScreenCanvas.box.h); // no bar 
    _g.strokeRect(0,0,miniScreenCanvas.box.w, miniScreenCanvas.bordersize); // title bar 
    _g.strokeRect(miniScreenCanvas.box.w-miniScreenCanvas.bordersize,0,miniScreenCanvas.bordersize, miniScreenCanvas.box.h);// east bar 
    _g.strokeRect(0,miniScreenCanvas.box.h-miniScreenCanvas.bordersize,miniScreenCanvas.box.w, miniScreenCanvas.bordersize);              // south bar 

    // Text @ -_-_-_-_- miniscreen -_-_-_-_-_
     var title = "-°-°-°-°- miniscreen -°-°-°-°-";
     var fontsize = Math.round(0.615 * miniScreenCanvas.bordersize);
    _g.font = 'bold '+fontsize.toString()+'px Courier';
     var wc = _g.measureText(title).width; 
    
    _g.fillStyle = 'rgb(0,0,0)';
    var hoffset = Math.round(0.7*miniScreenCanvas.bordersize);
     _g.fillText(title, (miniScreenCanvas.box.w/2) - (wc/2),hoffset ); 
    
    _g.fillStyle = recfillstyle;
    _g.strokeStyle = recstrstyle;
    _g.lineWidth = reclw;
    
}
// @ Graphics
function ClearScreen()
{
    var canvas = ScreenCanvas;
    if ( miniScreenOpened)
        canvas = miniScreenCanvas;
     var _g = canvas.context;
    
     _g.fillRect(canvas.bordersize,canvas.bordersize,canvas.box.w-canvas.bordersize*2, canvas.box.h-canvas.bordersize*2);
}
function FillRect(x,y,w,h)
{
    var canvas = ScreenCanvas;
    if ( miniScreenOpened)
        canvas = miniScreenCanvas;
     var _g = canvas.context;
    
    x+= canvas.bordersize;
    y+= canvas.bordersize;
    
    // lower w/h is above 
    if ( x+w > canvas.box.w-canvas.bordersize*2)
        w = canvas.box.w-canvas.bordersize*2 - x ;
    if ( y+h> canvas.box.h-canvas.bordersize*2)
        h = canvas.box.h-canvas.bordersize*2 - y ;
    
    _g.fillRect(x,y,w,h);
}
function StrokeRect(x,y,w,h)
{
     var canvas = ScreenCanvas;
    if ( miniScreenOpened)
        canvas = miniScreenCanvas;
     var _g = canvas.context;
    
    x+= canvas.bordersize;
    y+= canvas.bordersize;
    
    // lower w/h is above 
    if ( x+w > canvas.box.w-canvas.bordersize*2)
        w = canvas.box.w-canvas.bordersize*2 - x ;
    if ( y+h> canvas.box.h-canvas.bordersize*2)
        h = canvas.box.h-canvas.bordersize*2 - y ;
    
   _g.strokeRect(x,y,w,h);
}
function FillSquare(x,y,s)
{
     var canvas = ScreenCanvas;
    if ( miniScreenOpened)
        canvas = miniScreenCanvas;
     var _g = canvas.context;
    
    x+= canvas.bordersize;
    y+= canvas.bordersize;
    
    // lower w/h is above 
    if ( x+s > canvas.box.w-canvas.bordersize*2)
        s = canvas.box.w-canvas.bordersize*2 - x ;
    if ( y+s> canvas.box.h-canvas.bordersize*2)
        s = canvas.box.h-canvas.bordersize*2 - y ;
    
   _g.fillRect(x,y,s,s);
}
function StrokeSquare(x,y,s)
{
    var canvas = ScreenCanvas;
    if ( miniScreenOpened)
        canvas = miniScreenCanvas;
     var _g = canvas.context;
    
    x+= canvas.bordersize;
    y+= canvas.bordersize;
    
    // lower w/h is above 
    if ( x+s > canvas.box.w-canvas.bordersize*2)
        s = canvas.box.w-canvas.bordersize*2 - x ;
    if ( y+s> canvas.box.h-canvas.bordersize*2)
        s = canvas.box.h-canvas.bordersize*2 - y ;
    
   _g.strokeRect(x,y,s,s);
}
function SetColor(r,g,b)
{
     var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
     _g.fillStyle = 'rgb('+r+','+g+','+b+')';
     _g.strokeStyle = 'rgb('+r+','+g+','+b+')';
}
function SetPixel(x,y)
{
    var canvas = ScreenCanvas;
    if ( miniScreenOpened)
        canvas = miniScreenCanvas;
     var _g = canvas.context;
    
    x+= canvas.bordersize;
    y+= canvas.bordersize;
    
    var s = _g.lineWidth;
    // lower w/h is above 
    if ( x+s > canvas.box.w-canvas.bordersize*2)
        s = canvas.box.w-canvas.bordersize*2 - x ;
    if ( y+s> canvas.box.h-canvas.bordersize*2)
        s = canvas.box.h-canvas.bordersize*2 - y ;
    
    _g.fillRect(x,y,s, s);
}
function SetPenWidth(val)
{
    var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
    _g.lineWidth = val;
    _g.strokeWidth = val;
}

// Limit here 
function DrawLine(x,y,x1,y1)
{
    var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
   _g.beginPath();
   _g.moveTo(x, y);
   _g.lineTo(x1,y1);
   _g.closePath();
   _g.stroke();
}
function FillCircle(centerx, centery, rad)
{
    var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
    _g.beginPath();
    _g.arc(centerx, centery, rad, 0, 2* Math.PI, false);
    _g.fill();
    _g.closePath();
}
function StrokeCircle(centerx, centery, rad)
{
    var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
    _g.beginPath();
    _g.arc(centerx, centery, rad, 0, 2* Math.PI, false);
    _g.stroke();
    _g.closePath();
}
function FillArc(centerx, centery, rad, radian)
{
    var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
    _g.beginPath();
    _g.arc(centerx, centery, rad, 0, radian, false);
    _g.fill();
    _g.closePath();
}
function StrokeArc(centerx, centery, rad, radian)
{
    var _g = ScreenCanvas.context;
      if ( miniScreenOpened)
         _g = miniScreenCanvas.context;
    _g.beginPath();
    _g.arc(centerx, centery, rad, 0, radian, false);
    _g.stroke();
    _g.closePath();
}

// Can interfere with screen basic draw. Use another system. 
var LastPathPosition = new Vector2(0,0);

function OpenLine(x,y)
{
    LastPathPosition.x = x;
    LastPathPosition.y = y;
}
function MoveLine(x,y)
{
    var _g = ScreenCanvas.context;
    if ( miniScreenOpened)
        _g = miniScreenCanvas.context;
    _g.beginPath();
    _g.moveTo(LastPathPosition.x, LastPathPosition.y);
    _g.lineTo(x,y)
    _g.stroke();
    _g.closePath();
    LastPathPosition.x = x;
    LastPathPosition.y = y;
}
