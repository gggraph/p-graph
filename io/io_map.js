//@ IO

var importing = true;

async function LoadDefaultProject()
{
    $.ajax({
        url : "defaultproject.txt",
        dataType: "text",
        async:false,
        success : function (data) 
        {
            LoadNewProject();
            var txt = data.toString().split("\r\n");
            importing = false;
            LoadProjectFromFile(txt);
            
            if ( !UserReadLibrary)
                OpenDoc();
        }
        });
        
}
async function LoadExampleProject(name)
{
    name = "example/" + name;
    $.ajax({
        url : name+".txt",
        dataType: "text",
        async:false,
        success : function (data) 
        {
            if ( UserReadLibrary)
                CloseDoc();
            LoadNewProject();
            var txt = data.toString().split("\r\n");
            importing = false;
            LoadProjectFromFile(txt);
        }
        });
        
}
async function GenerateHTML()
{
    
}
// @ New project 
function FastLoadNewProject()
{
     Blocks = new Array();
    // Empty thumbnails
    CloseAllIDETabs();
    // Empty Windows 
    CloseAllWindows();
    
    
}
function LoadNewProject()
{
    var i; 
    for (i = Blocks.length-1; i >=0 ; i-- )
    {
        if ( Blocks[i].Window != "doc")
            Blocks[i].Destroy();
    }
    // Empty Windows 
    CloseAllWindows();
}

const saveBlockMap = ["knob","slider","/","*","+","-","number","switch"]
function IsBlockElligibleForSave(bloc)
{
    if ( saveBlockMap.indexOf(bloc.typename) > -1)
        return true;
    else
        return false;
}

function GetMapDataAsText()
{
    if ( UserReadLibrary)
        CloseDoc();
    // @ Just Save All blocks. ( Their ID, their Typename, their spacename, their x, their y)
    var text = new Array();
    text.push(Windows.length+"\r\n");
    var i ; 
    for (i = 0 ; i < Windows.length; i++ )
    {
        text.push(Windows[i]+"\r\n");
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
    // @ gives error here 
    var numwin = Windows.length; 
    if ( UserReadLibrary)
        numwin--;
    text.push(numwin+"\r\n");
    for (i = 0 ; i<Windows.length ;i++)
    {
        if ( Windows[i] != "doc")
            text.push(Windows[i]+"\r\n");
    }
    // @ Opened Thumbnails
    text.push(ideThumbnails.Thumbnails.length+"\r\n");
    for (i = ideThumbnails.Thumbnails.length-1 ; i >= 0 ;i--)
        text.push(ideThumbnails.Thumbnails[i].id+"\r\n");
    
    return text;
}
function SaveMap()
{
   
    var blob = new Blob(GetMapDataAsText());
    saveAs(blob, new Date().getTime().toString()+".map");
    prompt.AddEventText("saving .map")
}
function LoadMapFromFile(text)
{
    // Clear Array, thumbnails, IDE
    if ( !importing )
    {
        Blocks = new Array();
        CloseAllWindows();
    }
        
    // Load
    var i;
    var winlength = parseInt(text[0]);
    var linectr = 1;
    for (i = 0 ; i < winlength; i++ )
    {
        AddNewWindow(text[linectr]);
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
        var newblock = new Block(typename, win, EditorCanvas);
        
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
        
        // @ Set memory if needed ...
        var mementriescount =  parseInt(text[linectr]);linectr++;
        if (mementriescount > 0 )
        {
            var nummem = 0;
            for (nummem = 0; nummem < mementriescount; nummem++)
            {
                // do some floatparse
                newblock.memory[nummem] = parseFloat(text[linectr]); linectr++;
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
        AddNewWindow(text[linectr]); linectr++;
    }
    // @ Open thumb
    var thumblength = parseInt(text[linectr]);linectr++;
    for (i = 0; i < thumblength; i++ )
    {
        var b = GetBlockByID(parseInt(text[linectr])); linectr++;
        ideThumbnails.AddThumbnail(b);
    }
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
function LoadProjectFromFile(text)
{
    var lineend = LoadLibraryFromTextFile(text); 
    // slice text
    var map = text.slice(lineend);
    LoadMapFromFile(map);
    BangAtLoad(); 
}