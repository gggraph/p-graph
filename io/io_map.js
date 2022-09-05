//@ IO
/*
    Add Load Map/Project inside a specific canvas. :3
*/

var importing = true;

async function LoadExampleProject(name)
{
    name = "example/" + name;
    $.ajax({
        url : name+".map",
        dataType: "text",
        async:false,
        success : function (data) 
        {
            if ( Documentation.opened)
                Documentation.Close();
            LoadNewProject();
            var txt = data.toString().split("\r\n");
            importing = false;
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
    // Close Documentation
    Documentation.Close();
    
    Blocks = new Array();
    // Empty thumbnails
    ide.CloseAllTabs();
    // Empty Windows 
    Editor.CloseAllWindows();
    
}

const saveBlockMap = ["knob","slider","/","*","+","-","number","switch", "msg"]
function IsBlockElligibleForSave(bloc)
{
    if ( saveBlockMap.indexOf(bloc.typename) > -1)
        return true;
    else
        return false;
}

function GetMapDataAsText()
{
    Documentation.Close();
    
    // @ Just Save All blocks. ( Their ID, their Typename, their spacename, their x, their y)
    var text = new Array();
    text.push(Editor.Windows.length+"\r\n");
    var i ; 
    for (i = 0 ; i < Editor.Windows.length; i++ )
    {
        text.push(Editor.Windows[i]+"\r\n");
    }
    text.push(Blocks.length+"\r\n");
    
    for (i = 0 ; i < Blocks.length; i++ )
    {
        text.push(Blocks[i].id+"\r\n");
        text.push(Blocks[i].typename+"\r\n");
        text.push(Blocks[i].Window+"\r\n");
        text.push(Blocks[i].bodyBox.x+"\r\n");
        text.push(Blocks[i].bodyBox.y+"\r\n");
        // Save Outputs slots
        text.push(Blocks[i].outputslots.length+"\r\n");
        var n; 
        for (n = 0 ; n < Blocks[i].outputslots.length; n++ )
        {
             text.push(Blocks[i].outputslots[n].length+"\r\n");
             var num; 
             for (num = 0; num <Blocks[i].outputslots[n].length; num++ )
             {
                    text.push(Blocks[i].outputslots[n][num].blocId+"\r\n");
                    text.push(Blocks[i].outputslots[n][num].comPort+"\r\n");
             }
           
        }
         var elligible= IsBlockElligibleForSave(Blocks[i])
         if ( elligible)
         {
            text.push(Blocks[i].memory.length+"\r\n");
            var n;
            for (n = 0; n < Blocks[i].memory.length; n++)
            {
                text.push(Blocks[i].memory[n]+"\r\n");
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
        return line;
    var parsed = parseInt(line);
    if (!isNaN(parsed))
        return parsed;
    parsed = parseFloat(line);
    if (!isNaN(parsed))
        return parsed;
    return line;
}
function LoadMapFromFile(text,canvas)
{
    // Clear Array, thumbnails, IDE
    if ( !importing )
    {
        Blocks = new Array();
        Editor.CloseAllWindows();
        Documentation.Close();
    }
        
    // Load
    var i;
    var winlength = parseInt(text[0]);
    var linectr = 1;
    for (i = 0 ; i < winlength; i++ )
    {
        Editor.AddNewWindow(text[linectr]);
        linectr++;
    } 
   
    var blocklength = parseInt(text[linectr]);linectr++;
    
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
        if (numoutputslots>50)
        {
            console.log("parsing error");
            return;
        }
        for (n = 0 ; n < numoutputslots; n++ )
        {
            var numwire =  parseInt(text[linectr]);linectr++;
            var num; 
            if (numwire>50)
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
        newblock.LoadFromTypeName(true);
        // <-- block data can change here 
        
        // @ Set memory if needed ...
        var mementriescount =  parseInt(text[linectr]);linectr++;
        if (mementriescount > 0 )
        {
            var b = GetBlockByID(id);
            var nummem = 0;
            for (nummem = 0; nummem < mementriescount; nummem++)
            {
                // This is writing to block memory but well not realling writing it ...
           
                b.memory[nummem] = TryParseLine(text[linectr]); linectr++;
            }
        }
        
    }
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
        for (n = 0 ; n < numoutputslots; n++ )
        {
            var numwire =  parseInt(text[linectr]);linectr++;
            var num; 
            if (numwire>50)
            {
                console.log("parsing error : " + numwire + " wires " + " for slots #"+ n );
                return;
            }
             for (num = 0; num <numwire; num++ )
             {
                    var bID = parseInt(text[linectr]);linectr++;
                    var cport = parseInt(text[linectr]);linectr++;
                    cbloc.AddWireOut(n, bID, cport);
             }
            
        }
        // @ Set memory if needed ...
        var mementriescount =  parseInt(text[linectr]);linectr++;
        linectr+=mementriescount;
    }
   
    // @ Open Windows
    var winlength = parseInt(text[linectr]);linectr++;
    for (i = 0; i < winlength; i++ )
    {
        Editor.AddNewWindow(text[linectr]); linectr++;
    }
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
    prompt.AddEventText(".map successfully loaded")

    
}

function SaveProject()
{
    console.log("called");
    var lib = GetLibraryDataAsText();
    var map = GetMapDataAsText();
    // Concat 
    var data = lib.concat(map);
    var blob = new Blob(data);
    saveAs(blob, new Date().getTime().toString()+".tezgraph");
    prompt.AddEventText("saving project")
   
}
function LoadProjectFromFile(text, canvas)
{
    var lineend = LoadLibraryFromTextFile(text); 
    // slice text
    var map = text.slice(lineend);
    LoadMapFromFile(map,canvas);
    LoadBang(); 
}