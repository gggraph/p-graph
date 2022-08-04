var UserReadLibrary = false;
// Display Library on Screen Canvas 
function OpenDoc()
{
    if (Library.length == 0)
    {
        prompt.AddEventText("no library entry found")
        return;
    }
    UserReadLibrary = true;
    var i ; var ypos = 0;
    ScreenCanvas.Blank();
    for (i = 0 ; i < Library.length; i++ )
    {
        ypos += 30;
        var newblock = new Block(Library[i].typename, "doc", ScreenCanvas);
        // give a true unique id ...
        newblock.id += i;
        Blocks.push(newblock);
        TryLoadBlockFromLibraryEntries(newblock);
        newblock.SetPosition(30,ypos);
        var doctext = GetDocOfNativeScript(Library[i].NativeScript);
        ypos+=20*doctext.length;
        ypos += 40;
    }
    
    barheight = ScreenCanvas.box.h / Library.length; 
    barBox = new Box(ScreenCanvas.box.w-30, 0, 30, barheight);
    docRelativeHeight =  ypos;
    docRealHeight = ypos;
    docRelativeHeight-=ScreenCanvas.box.h; 
    if ( docRelativeHeight < 0 )
        docRelativeHeight = 0;
}

function CloseDoc()
{
    UserReadLibrary = false;
    SetColor(0,0,0);
    ClearScreen();
    var i; 
    for ( i = Blocks.length -1 ; i >= 0; i-- )
    {
        if ( Blocks[i].Window == "doc" ) 
        {
            Blocks[i].Destroy();
        }
    }
}

// Stuff for printing
var docRealHeight = 0;
var docRelativeHeight = 0;
var barheight;
var barGrabbed = false;
var barOffset  = new Vector2();
var barBox; 

function DisplayDocumentation()
{
    
    var i ; 
    
    var _g = ScreenCanvas.context;
    ScreenCanvas.Blank();
    var blocnum = 0;
    // set y pos to barbox.y / docRelativeHeight * 100
    var prctpos = (barBox.y / docRelativeHeight)* (docRelativeHeight/ScreenCanvas.box.h);
    var ypos = 0 - (prctpos*docRelativeHeight);
    
    for ( i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].Window == "doc")
        {
            var beginy = ypos;
            ypos += 30;
            if ( currentGrab != null )
            {
                if ( currentGrab.Id == -10)
                    Blocks[i].SetPosition(30,ypos);
            }
            Blocks[i].Draw();
            Blocks[i].Interact();
            var doctext = GetDocOfNativeScript(Blocks[i].NativeScript);
            var n;
            for ( n = 0 ; n < doctext.length; n++)
            {
                _g.fillStyle = 'rgb(0,0,0)';
                _g.font = "bold 16px Courier";
                _g.fillText(doctext[n],100, ypos);
                ypos += 20;
            }
            ypos += 40;
            // @ Stroke a rect from last savedpos
            _g.lineWidth = 3;
            _g.strokeStyle = 'rgb(0,0,0)';
            _g.strokeRect( 5, beginy, ScreenCanvas.box.w - 10, ypos - beginy);
            blocnum++;
        }
    }
    
    // @ Display Blue Bar
    if ( blocnum == 0 )
        return;
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    _g.fillRect( ScreenCanvas.box.w-30, 0, 30, ScreenCanvas.box.h-10);
    _g.strokeStyle = 'rgb(0,0,0)';
    _g.fillRect( ScreenCanvas.box.w-30, 0, 30, ScreenCanvas.box.h-10);
    _g.fillStyle = 'rgb(0,0,255)';
    
    barheight = ScreenCanvas.box.h / Library.length - ScreenCanvas.box.h; 
    
    _g.fillRect(barBox.x, barBox.y, barBox.w, barBox.h);
    
    // Put hard problem i found ... 
    
    if ( currentGrab == null )
    {
        if ( ScreenCanvas.mousepressed && IsMouseInsideBox(barBox, ScreenCanvas))
        {
        // @ Set a new Grab
            currentGrab = new Grab(-10, new Vector2(mouseX-barBox.x, mouseY - barBox.y));
           
        } return;
    }
  
    if ( currentGrab.Id == -10)
    {
        if ( !ScreenCanvas.mousepressed)
        {
            currentGrab = null;return;
        }
        barBox.y = mouseY-barOffset.y;
        if ( barBox.y<0)
            barBox.y =0;
        if ( barBox.y >  ScreenCanvas.box.y-barheight)
            barBox.y = ScreenCanvas.box.y-barheight
        
    }
}
function GetDocOfNativeScript(nativescript)
{
    var r = new Array();
    var i;
    for ( i = 0 ; i < nativescript.length; i++)
    {
        if ( nativescript[i][0] == '#')
            r.push(nativescript[i].substr(1,nativescript[i].length-1))
        else
            break;
    }
    return r;
}

function GetDocOfNativeScriptFromToken(nativescript, token)
{
    var i;
    for ( i = 0 ; i < nativescript.length; i++)
    {
        if ( nativescript[i].indexOf(token) == 0)
            return nativescript[i].substr(token.length,nativescript[i].length-token.length)
    }
    return "";
}
