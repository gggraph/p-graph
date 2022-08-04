// @ Window
var Windows = new Array();
// Add a new window if Windows do not contnains windowName 
function AddNewWindow(windowName)
{
    var index = Windows.indexOf(windowName);
    if ( index > -1 )
    {
         windowThumbnails.AddThumbnail(windowName);
         return false;
    }
    else
    {
        Windows.push(windowName);
        windowThumbnails.AddThumbnail(windowName);
        return true;
    }
}
function OpenAllWindows()
{
    var i; 
    for (i = 0 ; i < Blocks.length; i++ )
    {
        if (Blocks[i].Window != "doc")
            AddNewWindow(Blocks[i].Window);
    }
}
function GetWindowsCount()
{
    var r = 0;
    var i; 
    for (i = 0 ; i < Blocks.length; i++ )
    {
        if (Blocks[i].Window != "doc")
            r++;
    }
    return r;
}
// @ Get an empty Window or create a new window 
function GetEmptyWindow()
{
    // @ Try found a not used window
    var i; 
    for (i= 0; i < Windows.length; i++ )
    {
        if ( Windows[i] == "doc")
            continue;
        var n;
        var winfound = false;
        for ( n = 0 ; n < Blocks.length; n++ )
        {
            if ( Blocks[n].Window == Windows[i] )
            {
                winfound = true;
                break;
            }
        }
        if ( !winfound)
            return Windows[i];
    }
    
    return "win"+GetWindowsCount().toString();
}
function CloseAllWindows()
{
     Windows = new Array();
     windowThumbnails.Thumbnails = new Array();
     AddNewWindow("default");
     windowThumbnails.Draw();
}

var windowThumbnails;

class WinExplorer extends ThumbnailExplorer
{
   
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
        var thumbwidth = windowThumbnails.Canvas.box.w / windowThumbnails.Thumbnails.length;
        // apply a max ... 
        if ( thumbwidth > windowThumbnails.Canvas.box.w / 10 )
        {
            thumbwidth = windowThumbnails.Canvas.box.w / 10 ; 
        }
        for ( i = 0; i < windowThumbnails.Thumbnails.length; i++ )
        {
            if ( IsVectorInsideBox(new Vector2(mouseX - windowThumbnails.Canvas.box.x, mouseY - windowThumbnails.Canvas.box.y), new Box(x,0,thumbwidth,windowThumbnails.Canvas.box.h-1)))
            {
                // Do something here when clicking ...
                windowThumbnails.SetThumbnailPriority(i);
                // remove if clickclock
                //thumbexplorer.Thumbnails.splice(i,1);
                //thumbexplorer.ThumbNames.splice(i,1);
                windowThumbnails.Draw();
                
                return;
            }
             x+= thumbwidth; 
        }
    }
    ProccessRenaming(e)
    {
   
       if ( e.keyCode == 13 ) // @ key enter was pressed 
        {
            if ( windowThumbnails.Thumbnails[0].length == 0)
            {
                windowThumbnails.Thumbnails[0] = this.backupname;
            }
            currentTyping = -1;
            this.Draw();
             // all the time or ?
             UpdateBlocksFromNewWindowName(windowThumbnails.Thumbnails[0], this.backupname);
            return;
        }
        var currentname = windowThumbnails.Thumbnails[0];
        if (  e.keyCode == 8 )
        {
            windowThumbnails.Thumbnails[0] = windowThumbnails.Thumbnails[0].substr(0,windowThumbnails.Thumbnails[0].length-1);
            
        }
        else
        {
            if ( !KeyIsIllegal(e.key))
            {
               windowThumbnails.Thumbnails[0] += e.key;
              
            }
             
        }
        UpdateBlocksFromNewWindowName(windowThumbnails.Thumbnails[0], currentname);
        this.Draw();
    }
    
    
}

function UpdateBlocksFromNewWindowName(newname, oldname)
{
    var i;
    for (i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].Window == oldname)
            Blocks[i].Window = newname;
    }
}

function InitWDWThumbnails()
{
    var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "wdwthumbdiv";
    var canv = document.createElement('canvas');
    canv.id = 'wdwthumbcanv';
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    var spcanvas = new Canvas(canv, newDiv,
                              new Box( EditorCanvas.box.x, 0, 
                                       EditorCanvas.box.w, window.innerHeight/24));
        
    windowThumbnails = new WinExplorer(spcanvas);
    
    spcanvas.general.addEventListener('dblclick', function (e) { 
        windowThumbnails.backupname = windowThumbnails.Thumbnails[0];
        windowThumbnails.Thumbnails[0] = ""; currentTyping = -2; 
        windowThumbnails.Draw();
        UpdateBlocksFromNewWindowName("", windowThumbnails.backupname);
        prompt.AddEventText("renaming window...")
        console.log("win has double clicked");
    });
}