//@ IO
/*
    Add Load Map/Project inside a specific canvas. :3
*/

var importing = true;

async function LoadExampleProject(name)
{
    $.ajax({
        url : "example/" + name,
        dataType: "text",
        async:false,
        success : function (data) 
        {
            if ( Documentation.opened)
                Documentation.Close();
            LoadNewProject();
            var txt = data.toString().split("\r\n");
            LoadMapFromFile(txt, Editor.Canvas);
        }
        });
        
}
async function GenerateHTML()
{
    
}
// @ New project 
function LoadNewProject()
{
    Editor.DestroyAllWindows();
}

const saveBlockMap = ["knob","slider","/","*","+","-","number","switch", "msg","comm","virtual","win"]
function IsBlockElligibleForSave(bloc)
{
    // Get block first typename  
    var t = GetValidBlockTypeFromString(bloc.typename);
    if ( saveBlockMap.indexOf(t) > -1)
        return true;
    else
        return false;
}

function GetMapDataAsText()
{
    Documentation.Close();
    
    // @ Just Save All blocks. ( Their ID, their Typename, their spacename, their x, their y)
    var text = new Array();
    
    var i ; 
    var windowlist = new Array();
    for (i = 0 ; i < Editor.Windows.length; i++ )
    {
        if ( Editor.Windows[i].indexOf('_') == -1)
            windowlist.push(Editor.Windows[i]+"\r\n");
            //text.push(Editor.Windows[i]+"\r\n");
    }
    text.push(windowlist.length+"\r\n");
    for (i = 0 ; i < windowlist.length; i++ )
        text.push(windowlist[i]);
    
    // get blocks count that are not in a window with a '_' token (reserved for virtual)
    var blocklist = new Array();
    for ( var i = 0 ; i < Blocks.length ; i++ )
    {
        if ( Blocks[i].Window.indexOf('_') == -1)
            blocklist.push(Blocks[i]);
    }
    text.push(blocklist.length+"\r\n");
    
    for (i = 0 ; i < blocklist.length; i++ )
    {
        text.push(blocklist[i].id+"\r\n");
        text.push(blocklist[i].typename+"\r\n");
        text.push(blocklist[i].Window+"\r\n");
        text.push(blocklist[i].bodyBox.x+"\r\n");
        text.push(blocklist[i].bodyBox.y+"\r\n");
        // Save Outputs slots
        text.push(blocklist[i].outputslots.length+"\r\n");
        var n; 
        for (n = 0 ; n < blocklist[i].outputslots.length; n++ )
        {
             text.push(blocklist[i].outputslots[n].length+"\r\n");
             var num; 
             for (num = 0; num <blocklist[i].outputslots[n].length; num++ )
             {
                    text.push(blocklist[i].outputslots[n][num].blocId+"\r\n");
                    text.push(blocklist[i].outputslots[n][num].comPort+"\r\n");
             }
           
        }
         var elligible= IsBlockElligibleForSave(blocklist[i])
         if ( elligible)
         {
            text.push(blocklist[i].memory.length+"\r\n");
            var n;
            for (n = 0; n < blocklist[i].memory.length; n++)
            {
                text.push(blocklist[i].memory[n]+"\r\n");
            }
         }
         else
            text.push("0"+"\r\n");
    }
    // @ Opened Window
    
    var numwin = Editor.WindowExplorer.Thumbnails.length; 
    text.push(numwin+"\r\n");
    
    for (i = 0 ; i< Editor.WindowExplorer.Thumbnails.length ;i++)
    {
        text.push(Editor.WindowExplorer.Thumbnails[i]+"\r\n");
    }
    // @ Opened Thumbnails
    text.push(ide.CodeExplorer.Thumbnails.length+"\r\n");
    for (i = ide.CodeExplorer.Thumbnails.length-1 ; i >= 0 ;i--)
        text.push(ide.CodeExplorer.Thumbnails[i].id+"\r\n");
    
    return text;
}
function SaveMap()
{
   
    var blob = new Blob(GetMapDataAsText());
    saveAs(blob, new Date().getTime().toString()+".map");
    prompt.AddEventText("saving .map")
}
function TryParseLine(line)
{
    if ( line.split(" ").length > 1 )
    {
        return line;
    }
    parsed = parseFloat(line);
    if (!isNaN(parsed))
    {
        return parsed;
    }    
    var parsed = parseInt(line);
    if (!isNaN(parsed))
    {
        return parsed;
    }
    return line;
}
// 
function LoadMapFromFile(text,canvas)
{
    // Clear Array, thumbnails, IDE
    if ( !importing )
        Editor.DestroyAllWindows();
        
    // Load
    var i;
    var winlength = parseInt(text[0]);
    var linectr = 1;
    for (i = 0 ; i < winlength; i++ )
    {
        Editor.Windows.push(text[linectr]);
        linectr++;
    } 
   
    var blocklength = parseInt(text[linectr]);linectr++;
    var abstractionBlocks = new Array();
    var lineforbloc = linectr;
    for (i = 0 ; i < blocklength; i++)
    {
        var id = parseInt(text[linectr]);linectr++;
        var typename =text[linectr];linectr++;
        var win = text[linectr];linectr++;
        var x= parseInt(text[linectr]);linectr++;
        var y = parseInt(text[linectr]);linectr++;
        var newblock = new Block(typename, win, canvas);
        
        // set ports after all blocks creation i guess ?
        var numoutputslots = parseInt(text[linectr]);linectr++;
        newblock.SetOutputCount(numoutputslots);
        var n; 
        if (numoutputslots>100)
        {
            console.log("parsing error");
            return;
        }
        for (n = 0 ; n < numoutputslots; n++ )
        {
            var numwire =  parseInt(text[linectr]);linectr++;
            var num; 
            if (numwire>999)
            {
                console.log("parsing error : " + numwire + " wires " + " for slots #"+ n );
                return;
            }
            linectr += numwire * 2;
        }
        // Push & load other dats
        Blocks.push(newblock);
        newblock.id = id;
        newblock.SetPosition(x,y);
        // we should not load [win ] & [virtual ] blocks at the time other blocks are not defined.
        if ( newblock.typename.indexOf("virtual ") == 0 
            || newblock.typename.indexOf("win ") == 0 
            || newblock.typename.indexOf("ditto ") == 0)
            abstractionBlocks.push(newblock);
        else
            newblock.LoadFromTypeName(true);
        
        // @ Set memory if needed ...
        var mementriescount =  parseInt(text[linectr]);linectr++;
        if (mementriescount > 0 )
        {
            var b = GetBlockByID(id);
            var nummem = 0;
            for (nummem = 0; nummem < mementriescount; nummem++)
            {
                b.memory[nummem] = TryParseLine(text[linectr]); linectr++;
            }
        }
        
    }
    // Wire Everything which is not abstraction ...
    // Load abstraction.
    // Load all abstraction blocks.

    
    // Setting Wires
    linectr = lineforbloc;
    for (i = 0 ; i < blocklength; i++)
    {
        var id = parseInt(text[linectr]);linectr++;
        var cbloc = GetBlockByID(id);
        if ( cbloc == null )
        {
            console.log("parsing error");
            return;
        }
            
        linectr += 4;
        // set ports after all blocks creation i guess ?
        var numoutputslots = parseInt(text[linectr]);linectr++;
        var n; 
        if (numoutputslots>50)
        {
            console.log("parsing error");
            return;
        }
        // manipulate i/o to meet requirement...
        if ( cbloc.outputslots.length < numoutputslots)
                cbloc.SetOutputCount(numoutputslots);
        for (n = 0 ; n < numoutputslots; n++ )
        {
            var numwire =  parseInt(text[linectr]);linectr++;
            var num; 
            if (numwire>999)
            {
                console.log("parsing error : " + numwire + " wires " + " for slots #"+ n );
                return;
            }
             for (num = 0; num <numwire; num++ )
             {
                
                var bID = parseInt(text[linectr]);linectr++;
                var cport = parseInt(text[linectr]);linectr++;
                // Check if the object exist... also set inputs slots number relative to 
                var destbloc =  GetBlockByID(bID);
                if ( destbloc != null)
                {
                    if ( destbloc.inputslots.length <= cport)
                        destbloc.SetInputCount(cport+1);
                    
                    cbloc.AddWireOut(n, bID, cport);
                }
                   
             }
            
        }
        // @ Set memory if needed ...
        var mementriescount =  parseInt(text[linectr]);linectr++;
        linectr+=mementriescount;
    }
    
    for ( i = 0 ; i < abstractionBlocks.length ; i ++)
        abstractionBlocks[i].LoadFromTypeName();
        
    
    // @ Open Windows
    var winlength = parseInt(text[linectr]);linectr++;
    for (i = 0; i < winlength; i++ )
    {
        Editor.AddNewWindow(text[linectr]); linectr++;
    }
    ide.CloseAllTabs();
    // @ Open thumb
    var thumblength = parseInt(text[linectr]);linectr++;
    for (i = 0; i < thumblength; i++ )
    {
        var b = GetBlockByID(parseInt(text[linectr])); linectr++;
        if ( b != null)
            ide.TryLoadBlock(b);
    }
    LoadBang(); 
    RecomputeMapIndex();
 
    prompt.AddEventText(".map successfully loaded");//. Blocks length : " + Blocks.length)

    
}

function SaveProject()
{
    var lib = GetLibraryDataAsText();
    var map = GetMapDataAsText();
    // Concat 
    var data = lib.concat(map);
    var blob = new Blob(data);
    saveAs(blob, new Date().getTime().toString()+".pgr");
    prompt.AddEventText("saving project")
   
}
function LoadProjectFromFile(text, canvas)
{
    var lineend = LoadLibraryFromTextFile(text); 
    // slice text
    var map = text.slice(lineend);
    LoadMapFromFile(map,canvas);
}