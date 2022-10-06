// @ Class 
class Canvas 
{ 
    constructor(canvas, div, box ){
        this.general = canvas;
        this.div     = div;
        this.context = this.general.getContext('2d'); 
        this.mouseisover = false;
        this.mousepressed = false;
        this.hasdoubleclicked = false;
        this.box= box;
        this.focusPosition = 0;
        this.SetPositionAndDimension();
        this.bordersize = 0;
    }
    SetPosition()
    {
        this.div.style = "position:absolute; top:"+this.box.y+"px; left:"+this.box.x+"px; z-index:" + this.focusPosition; 
    }
    SetPositionAndDimension()
    {
        this.div.style = "position:absolute; top:"+this.box.y+"px; left:"+this.box.x+"px; z-index:" + this.focusPosition; 
        this.general.width = this.box.w;
        this.general.height = this.box.h;
    }
    
    // @ Draw parameters
    Blank()
    {
        this.ForceFill("rgb(255,255,255)");
    }
     ForceFill(color)
    {
         var _g = this.context;
         _g.fillStyle = color;
         _g.fillRect(0,0,this.box.w, this.box.h);
    }
    Fill(color)
    {
        this.FillRect(0,0,this.box.w, this.box.h,color);
    }
    
    // @ Basic HTML5 draw command
    FillRect(x,y,w,h,color)
    {
        var _g = this.context;
        x+= this.bordersize;
        y+= this.bordersize;
        _g.fillStyle = color;
        // lower w/h is above 
        if ( x+w > this.box.w-this.bordersize*2)
            w = this.box.w-this.bordersize - x ;
        if ( y+h> this.box.h-this.bordersize*2)
            h = this.box.h-this.bordersize - y ;

        _g.fillRect(x,y,w,h);
    }
    StrokeRect(x,y,w,h,color,linewidth)
    {
        var _g = this.context;
        x+= this.bordersize;
        y+= this.bordersize;
        _g.strokeStyle = color;
        _g.lineWidth = linewidth;
        // lower w/h is above 
        if ( x+w > this.box.w-this.bordersize*2)
            w = this.box.w-this.bordersize - x ;
        if ( y+h> this.box.h-this.bordersize*2)
            h = this.box.h-this.bordersize - y ;

        _g.strokeRect(x,y,w,h);
    }
    FillSquare(x,y,s, color)
    {
         var _g = this.context;

        x+= this.bordersize;
        y+= this.bordersize;
         _g.fillStyle = color;
        // lower w/h is above 
        if ( x+s > this.box.w-this.bordersize*2)
            s = this.box.w-this.bordersize - x ;
        if ( y+s> this.box.h-this.bordersize*2)
            s = this.box.h-this.bordersize - y ;

       _g.fillRect(x,y,s,s);
    }
    StrokeSquare(x,y,s,color,linewidth)
    {
        var _g = this.context;
        x+= this.bordersize;
        y+= this.bordersize;
         _g.strokeStyle = color;
        _g.lineWidth = linewidth;
        // lower w/h is above 
        if ( x+s > this.box.w-this.bordersize*2)
            s = this.box.w-this.bordersize - x ;
        if ( y+s> this.box.h-this.bordersize)
            s = this.box.h-this.bordersize - y ;

       _g.strokeRect(x,y,s,s);
    }
    
    DrawLine(x,y,x1,y1,color,linewidth)
    {
        var _g = this.context;
       _g.strokeStyle = color;
       _g.lineWidth = linewidth;
       _g.beginPath();
       _g.moveTo(x, y);
       _g.lineTo(x1,y1);
       _g.closePath();
       _g.stroke();
    }
    FillCircle(centerx, centery, rad, color)
    {
        var _g = this.context;
        _g.fillStyle = color;
        _g.beginPath();
        _g.arc(centerx, centery, rad, 0, 2* Math.PI, false);
        _g.fill();
        _g.closePath();
    }
    StrokeCircle(centerx, centery, rad,color,linewidth)
    {
        var _g = this.context;
        _g.strokeStyle = color;
        _g.lineWidth = linewidth;
        _g.beginPath();
        _g.arc(centerx, centery, rad, 0, 2* Math.PI, false);
        _g.stroke();
        _g.closePath();
    }

    FillTriangle(x0,y0,x1,y1,x2,y2, color)
    {
        var _g = this.context;
        _g.fillStyle = color;
        _g.beginPath()
        _g.moveTo(x0, y0);
        _g.lineTo(x1, y1);
        _g.lineTo(x2, y2);
        _g.lineTo(x0, y0);
        _g.fill();
        _g.closePath()
    }
    StrokeTriangle(x0,y0,x1,y1,x2,y2, color,linewidth)
    {
        var _g = this.context;
        _g.strokeStyle = color;
        _g.lineWidth = linewidth;
        _g.beginPath()
        _g.moveTo(x0, y0);
        _g.lineTo(x1, y1);
        _g.lineTo(x2, y2);
        _g.lineTo(x0, y0);
        _g.closePath()
        _g.stroke();
        
    }
    FillArc(centerx, centery, rad, anglestart, angleend, color)
    {
        var _g = this.context;
         _g.fillStyle = color;
        _g.beginPath();
        _g.arc(centerx, centery, rad, anglestart, angleend, false);
        _g.fill();
        _g.closePath();
    }
    StrokeArc(centerx, centery, rad, anglestart, angleend ,color,linewidth)
    {
        var _g = this.context;
        _g.strokeStyle = color;
        _g.lineWidth = linewidth;
        _g.beginPath();
        _g.arc(centerx, centery, rad, anglestart, angleend, false);
        _g.stroke();
        _g.closePath();
    }
    OpenLine(x,y, color, linewidth)
    {
        var _g = this.context;
        this.LastPathPosition = new Vector2(x,y);
        _g.strokeStyle = color;
        _g.lineWidth = linewidth;
    }
    MoveLine(x,y)
    {
        var _g = this.context;
        _g.beginPath();
        _g.moveTo(this.LastPathPosition.x, this.LastPathPosition.y);
        _g.lineTo(x,y)
        _g.stroke();
        _g.closePath();
        this.LastPathPosition.x = x;
        this.LastPathPosition.y = y;
    }
    MeasureText(text,fontname, fontsize, style)
    {
        var _g = this.context;
        _g.font = style + " "+fontsize+"px "+fontname;
        return _g.measureText(text).width;
    }
    FillText(text, x, y , color, fontname, fontsize, style)
    {
        var _g = this.context;
        _g.fillStyle = color;
        _g.font = style + " "+fontsize+"px "+fontname;
        _g.fillText(text, x, y);
    }
    StrokeText(text, x, y, color, fontname, fontsize, style)
    {
        var _g = this.context;
        _g.strokeStyle = color;
        _g.font = style + " "+fontsize+"px "+fontname;
        _g.strokeText(text, x, y);
    }
}

function GetColor(r,g,b)
{
    return 'rgb('+r+','+g+','+b+')'
}

// Easy Function to create a canvas... 
var CanvasUniqueIdentifier = 0;
function CreateCanvas(x,y,w,h)
{
    // Update the HTML
    
    var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "div"+CanvasUniqueIdentifier;
    var canv = document.createElement('canvas');
    canv.id = 'canv'+CanvasUniqueIdentifier;
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    // Update counter
    CanvasUniqueIdentifier++;
    
    // return
    return new Canvas(canv, newDiv,new Box(x,y,w,h));

}

var ScreenCanvas;
var miniScreenCanvas;
var OutputCanvas;

function OpenCloseMiniScreen()
{
    if ( miniScreenCanvas.Opened)
    {
        UserIsGrabbing = false;
        miniScreenCanvas.box = new Box (0,0,0,0);
        miniScreenCanvas.SetPositionAndDimension();    
        miniScreenCanvas.Opened=false;
        OutputCanvas = ScreenCanvas;
    
    }   
    else
    {
        miniScreenCanvas.box = new Box (ScreenCanvas.box.w/4, ScreenCanvas.box.h/4, window.innerHeight /2, window.innerHeight /2);
        miniScreenCanvas.SetPositionAndDimension();
        miniScreenCanvas.Opened=true;
        ReDrawMiniScreen();
        OutputCanvas = miniScreenCanvas;
    }
}
function OnMiniScreenMousePressed()
{
    var bordersize = miniScreenCanvas.bordersize;
    
    if ( !UserIsGrabbing )
    {
        // if south-east body set -4 
        if ( IsMouseInsideBox(new Box(miniScreenCanvas.box.w-bordersize,miniScreenCanvas.box.h-bordersize,bordersize*2,bordersize*2), miniScreenCanvas))
        {
            console.log("inside s-e");
            miniScreenCanvas.grabIndex = -4;
            miniScreenCanvas.grabbed = true;
            return;
        }
        // if south body set -2 
        if ( IsMouseInsideBox(new Box(0,miniScreenCanvas.box.h-bordersize,miniScreenCanvas.box.w,bordersize*2), miniScreenCanvas))
        {
            console.log("inside south");
            miniScreenCanvas.grabIndex = -2;
            miniScreenCanvas.grabbed = true;
            return;
        }
        // if east body set -3 
        if ( IsMouseInsideBox(new Box(miniScreenCanvas.box.w-bordersize,0,bordersize*2,miniScreenCanvas.box.h), miniScreenCanvas))
        {
            miniScreenCanvas.grabIndex = -3;
            miniScreenCanvas.grabbed = true;
            console.log("inside east");
             return;
        }
        UserIsGrabbing = true;
        // if main body set -1
        miniScreenCanvas.grabIndex = -1;
        miniScreenCanvas.grabOrigin = new Vector2(mouseX-miniScreenCanvas.box.x, mouseY - miniScreenCanvas.box.y);
        miniScreenCanvas.grabbed = true;
    }
   
}
function RunMiniScreen()
{
    if ( miniScreenCanvas.grabbed)
    {
        if ( !mousepressed)
        {
            UserIsGrabbing = false;
            miniScreenCanvas.grabbed = false;
            return;
        }
        
        switch (miniScreenCanvas.grabIndex )
        {
            case -4:
                miniScreenCanvas.box.w = mouseX-miniScreenCanvas.box.x;
                miniScreenCanvas.box.h = mouseY-miniScreenCanvas.box.y;
                miniScreenCanvas.SetPositionAndDimension();
                ReDrawMiniScreen();
                return;
            case -3:
                miniScreenCanvas.box.w = mouseX-miniScreenCanvas.box.x;
                miniScreenCanvas.SetPositionAndDimension();
                miniScreenCanvas.ForceFill("rgb(0,0,0)");
                ReDrawMiniScreen();
                return;
            case -2:
                miniScreenCanvas.box.h = mouseY-miniScreenCanvas.box.y;
                miniScreenCanvas.SetPositionAndDimension();
                miniScreenCanvas.ForceFill("rgb(0,0,0)");
                ReDrawMiniScreen();
                return;
            case -1:
                miniScreenCanvas.box.x = mouseX-miniScreenCanvas.grabOrigin.x; 
                miniScreenCanvas.box.y = mouseY-miniScreenCanvas.grabOrigin.y;
                miniScreenCanvas.SetPosition();
                return;
        }
    }
}
function ForceResetMiniScreenPosition()
{
     miniScreenCanvas.box = new Box (ScreenCanvas.box.w/4, ScreenCanvas.box.h/4, window.innerHeight /2, window.innerHeight /2);
     miniScreenCanvas.SetPositionAndDimension();
     ReDrawMiniScreen();
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

