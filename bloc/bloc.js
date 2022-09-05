

// @ Wire Data

class WiringInfo
{
    constructor(blocid = -1, comNumber = 0, fromInput = false)
    {
        this.blocId = blocid;
        this.comPort = comNumber;
        this.fromInput = fromInput;
    }
}

class WireInData
{
    constructor(blocID = 0, comPort = 0)
    {
        this.blocId = blocID;   // source block unique identifier
        this.comPort = comPort; // output port of source block
    }
}
class WireOutData
{
    constructor(blocID = 0, comPort = 0)
    {
        this.blocId = blocID;   // destination block unique identifier
        this.comPort = comPort; // input port of destination block
    }
}
class Block
{
    
    constructor(typename = " new ", window, displayCanvas)
    {
        this.id =  new Date().getTime();             // create a unique ID at creation...
        this.index = Blocks.length;
        this.typename = typename;  // text contained inside the block corresponding to its type
        this.values;       // values stored in block as a temp memory.
        
        // Graphical data : 
        this.displayCanvas = displayCanvas;
        this.bodyBox = new Box(mouseX - this.displayCanvas.box.x, mouseY- this.displayCanvas.box.y, 0 , 0);
        this.inputsboxes = new Array();
        this.outputsboxes = new Array();
        
        // @ Project IO
        this.Window = window;
        
        // Code
        this.NativeScript = [""];
        this.memory = new Array(); // internal memory 
        this.declar = ""; // code called only at reset 
        this.methods = [""];  // code contained by this block as a string. Using reflection. 
        
        // IO
        this.inputslots = new Array();  // Array of size (inputnumber) containing array of int (id of blocks) 
        this.outputslots = new Array(); // Array of size (outputnumber) containing array of int (id of blocks)
        
        this.wiringData = null;
        // Virtual function for special blocks + override...
        this.OnCreate();
        
    }
    
    OnCreate()
    {
         console.log("New block created : " + this.typename);
    }
  
    Destroy()
    {
        // @ Clear ports
        var incount = this.inputslots.length;
        var outcount = this.outputslots.length;
        var i;
        for(i=0;i<incount;i++)
            this.ClearInputPort(i);
        for(i=0;i<outcount;i++)
            this.ClearOutputPort(i);
        
        // @ Try remove bloc from editor
        ide.TryCloseBlock(this)
        
        // Unset Interaction (we can only destroy while renaming so lets just do if renamed )
        UserIsTyping = false;
        // Splice this elements from Blocks
        var index = Blocks.indexOf(this);
        if  (index > -1 )
        {
            Blocks.splice(index,1);
        }
        RecomputeMapIndex();
        
    }

    SetInputCount(count)
    {
        if ( this.memory.length < count )
        {
            this.SetMemorySize(count);
        }
        // Set inputbox
        this.inputsboxes = new Array(); 
        var n; 
        for (n=0; n < count; n++)
            this.inputsboxes.push(new Box(0,0,10,10));
        // Reset inputslots
        var dff = count - this.inputslots.length; 
        if (dff > 0)
        {
            var i;
            for ( i = 0; i<dff;i++)
                this.inputslots.push(new Array()); 
        
            return;    
        }
        if (dff < 0)
        {
            // Ouch could be dangerous! Do some cleaning hhere
            this.inputslots.splice(count);
            return;
        }
    }
    
    SetOutputCount(count)
    {
        // Set inputbox
        this.outputsboxes = new Array(); 
        var n; 
        for (n=0; n < count; n++)
            this.outputsboxes.push(new Box(0,0,10,10));
        
        var dff = count - this.outputslots.length; 
        if (dff > 0)
        {
            var i;
            for ( i = 0; i<dff;i++)
                this.outputslots.push(new Array()); 
        
        return;    
        }
        if (dff < 0)
        {
            this.outputslots.splice(count);
            return;
        }
    }
    SetMemorySize(size)
    {

        var dff = size - this.memory.length; 
        if (dff > 0)
        {
            var i;
            for ( i = 0; i<dff;i++)
                this.memory.push(0); 
        
            return;    
        }
        if (dff < 0)
        {
            this.memory.splice(count);
            return;
        }
        
        return;
        
        this.memory = new Array();
        var i;
        for (i =0 ; i< size;i++ )
            this.memory.push(0);
    }
    AddWireOut(PortNumber, destId, destCOM)
    {
        if ( this.outputslots.length <= PortNumber)
            return;
        this.outputslots[PortNumber].push(new WireOutData(destId, destCOM));
        var destbloc = GetBlockByID(destId);
        destbloc.AddWireIn(destCOM, this.id, PortNumber );
    }
    // @ Called by AddWireOut
    AddWireIn(PortNumber, destId, destCOM)
    {
        if ( this.inputslots.length <= PortNumber)
            return;
        this.inputslots[PortNumber].push(new WireInData(destId, destCOM));
    }
    // Can be usefull
    ClearInputPort(PortNumber)
    {
        // @ Clear all related outputslots
        var i;
        for (i= 0 ; i < this.inputslots[PortNumber].length; i++)
        {
            var sourcebloc = GetBlockByID(this.inputslots[PortNumber][i].blocId);
            var port       = this.inputslots[PortNumber][i].comPort;
            // Find Wire Index
            var n;
            for (n = 0; n < sourcebloc.outputslots[port].length; n++)
            {
                if (sourcebloc.outputslots[port][n].blocId == this.id
                   && sourcebloc.outputslots[port][n].comPort ==PortNumber)
                {
                    // @ Should slice here ...
                    console.log("Should remove wire of " + sourcebloc.typename + " at port #" + port + " wire #" + n );
                    sourcebloc.ClearOutputPortWire(port, n);
                    break;
                }
            }
        }
        this.inputslots[PortNumber] = new Array();
    }
    ClearOutputPort(PortNumber)
    {
        // @ Clear all related inputslots 
        var i;
        for (i= 0 ; i < this.outputslots[PortNumber].length; i++)
        {
            var sourcebloc = GetBlockByID(this.outputslots[PortNumber][i].blocId);
            var port       = this.outputslots[PortNumber][i].comPort;
            // Find Wire Index
            var n;
            for (n = 0; n < sourcebloc.inputslots[port].length; n++)
            {
                if (sourcebloc.inputslots[port][n].blocId == this.id
                   && sourcebloc.inputslots[port][n].comPort ==PortNumber)
                {
                    // @ Should slice here ...
                    console.log("Should remove wire of " + sourcebloc.typename + " at port #" + port + " wire #" + n );
                    sourcebloc.ClearInputPortWire(port, n);
                    break;
                }
            }
        }
        this.outputslots[PortNumber] = new Array();
    }
    ClearInputPortWire(PortNumber, WireIndex)
    {
        this.inputslots[PortNumber].splice(WireIndex,1);
    }
    ClearOutputPortWire(PortNumber, WireIndex)
    {
        this.outputslots[PortNumber].splice(WireIndex,1);
    }
    
 
    ForceCompile()
    {
        InterpreteBlockCode(this); 
        this.R();
    }
    
    SetPosition(x,y)
    {
        this.bodyBox.x = x;
        this.bodyBox.y = y;
    }
   
    // Graphic
    Draw()
    {
        this.DefaultDraw();
        
    }
    DefaultDraw()
    {
      
        // Compute Width and Port distance
        var w = this.typename.length * VisualParameters.BlockFontWidth; 
        if ( w < 25 )
        {
            w = 40 ;
        }
        var maxSlot = this.inputslots.length;
        if (  this.outputslots.length > maxSlot){
            maxSlot = this.outputslots.length;
        }
        
        var segwidth = w /maxSlot ;
        if ( segwidth < 10 * 1.5){
            // recompute w 
            segwidth = 10 * 1.5;
            w = maxSlot *segwidth;
        }
        
        this.bodyBox.w = w;
        this.bodyBox.h = 25;
        
        var iostartpos  = this.bodyBox.x + this.bodyBox.w/segwidth ; 
         
        // @ Draw Boxes
        this.DrawBody()
        
        // @ Draw IOs
        this.DrawI(iostartpos,segwidth,this.inputslots.length)
        this.DrawO(iostartpos,segwidth,this.outputslots.length)
        //this.DrawIOs(iostartpos,segwidth,this.inputslots.length, this.outputslots.length )
        
        // @ Print text
        var _g = this.displayCanvas.context;
        _g.fillStyle = VisualParameters.BlockStrokeColor;
        if (this.renaming)
        {
            _g.fillStyle = VisualParameters.BlockFillColor;
        }
        _g.font = VisualParameters.BlockFont;
        _g.fillText(this.typename,this.bodyBox.x,this.bodyBox.y+16 );
        
        // @ Draw Wires
        this.DrawWires();
        
    } 
    // Generic Draw Box
    DrawBody()
    {
        var _g = this.displayCanvas.context;
        // @ Draw Box
        // Plain color
        _g.fillStyle = VisualParameters.BlockFillColor;
        if (this.renaming)
        {
            _g.fillStyle = VisualParameters.BlockHighLightColor;
        }
        _g.fillRect(this.bodyBox.x,this.bodyBox.y,this.bodyBox.w,this.bodyBox.h);
        
        // Outline
        _g.lineWidth = VisualParameters.BlockBorderWidth;
        _g.strokeStyle = VisualParameters.BlockStrokeColor;
        if (this.renaming )
        {
            _g.strokeStyle = VisualParameters.BlockFillColor;
        }
        if (IsMouseInsideBox(this.bodyBox,this.displayCanvas) || this.CurrentlyInteract() )
        {
            _g.strokeStyle = VisualParameters.BlockHighLightColor;
            Editor.Info = GetDocOfNativeScriptFromToken(this.NativeScript, "#df");
        }
        // if this is in library 
        _g.strokeRect(this.bodyBox.x,this.bodyBox.y,this.bodyBox.w,this.bodyBox.h);
    }
    // Generic Draw IOs functions...
    DrawI(iostartpos, segwidth, inpcount)
    {
        var _g = this.displayCanvas.context;
        var i;
        var px = iostartpos;
        for ( i = 0 ; i < inpcount; i++ )
        {
            _g.fillStyle = VisualParameters.BlockStrokeColor;
            this.inputsboxes[i].x = px; 
            this.inputsboxes[i].y = this.bodyBox.y - this.inputsboxes[i].h;
            if (IsMouseInsideBox(this.inputsboxes[i],this.displayCanvas) ){
                _g.fillStyle = VisualParameters.BlockHighLightColor;
                Editor.Info = GetDocOfNativeScriptFromToken(this.NativeScript, "#i"+i);
            }
            _g.fillRect(px , this.inputsboxes[i].y, this.inputsboxes[i].w,this.inputsboxes[i].h);
            px += segwidth;
        }
    }
    DrawO(iostartpos, segwidth, ouptcount)
    {
        var _g = this.displayCanvas.context;
        var i;
        var px = iostartpos;
        for ( i = 0 ; i < ouptcount; i++ )
        {
            _g.fillStyle = VisualParameters.BlockStrokeColor;
           
            this.outputsboxes[i].x = px; 
            this.outputsboxes[i].y = this.bodyBox.y + this.bodyBox.h;
            if (IsMouseInsideBox(this.outputsboxes[i],this.displayCanvas) ){
                _g.fillStyle = VisualParameters.BlockHighLightColor;
                 Editor.Info = GetDocOfNativeScriptFromToken(this.NativeScript, "#o"+i);
            }
            _g.fillRect(px , this.outputsboxes[i].y, this.outputsboxes[i].w,this.outputsboxes[i].h);
            px += segwidth;
        }
    }
    
    DrawIOs( iostartpos, segwidth, inpcount, ouptcount )
    {
        DrawI(iostartpos,segwidth,inpcount)
        DrawO(iostartpos,segwidth,ouptcount)
    }
    
    DrawWires()
    {
         var _g = this.displayCanvas.context;
        // @ Draw wires
        var i;
        for (i = 0 ; i < this.outputslots.length; i++)
        {
            var n = 0; 
            for (n = 0; n < this.outputslots[i].length; n++)
            {
                _g.strokeStyle = VisualParameters.WireColor; 
                _g.lineWidth = VisualParameters.WireWidth;
                _g.beginPath();
                _g.moveTo(
                    this.outputsboxes[i].x + this.outputsboxes[i].w / 2 ,
                    this.outputsboxes[i].y + this.outputsboxes[i].h / 2
                        );
            var destbloc = GetBlockByID(this.outputslots[i][n].blocId);
            _g.lineTo(
                destbloc.inputsboxes[this.outputslots[i][n].comPort].x + 
                destbloc.inputsboxes[this.outputslots[i][n].comPort].w /2,
                destbloc.inputsboxes[this.outputslots[i][n].comPort].y + 
                destbloc.inputsboxes[this.outputslots[i][n].comPort].h /2,
                );
            _g.closePath();
            _g.stroke();
           }
      }
    }
    
    
    R()
    {
        var s = this.declar.split("?").join("Blocks["+this.index+"]");
        eval("(async () => {"+s+"})()");
    }
    // @ Called from other Block O()
    I(portnumber, data)
    {
        // Copy data to memory[portnumber]
        this.memory[portnumber] = data;
        // Bang if port 0
        if (portnumber == 0)
        {
            this.OIO();
            return;
        }
        // ipf mechanism
        if ( this.methods.length > portnumber)
        {
            var s = this.methods[portnumber].split("?").join("Blocks["+this.index+"]");
            eval("(async () => {"+s+"})()");
        }
           
    }
    OIO()
    {
        var s = this.methods[0].split("?").join("Blocks["+this.index+"]");
        eval("(async () => {"+s+"})()");
    }
    O(portnumber,memindex)
    {
       
        // We should i-- to not pass first parameters ...
        var i; 
        for (i = this.outputslots[portnumber].length - 1 ; i >=0 ; i-- )
        {
            var outpbloc = GetBlockByID(this.outputslots[portnumber][i].blocId);
            outpbloc.I
            (
                this.outputslots[portnumber][i].comPort, this.memory[memindex]
            );
        }
    }
    
    // User Interaction
    CurrentlyInteract()
    {
        // return true if isgrabbed or iswiring
        if ( this.wiringData != null || this.grabbed == true)
        {
            return true;
        }
        return false;
    }
    // Should be changed either
    Interact()
    {
        this.DefaultInteract();
    }
     
    DefaultInteract()
    {
        
        if (this.CheckInteraction())
            return;
        // @ Try Interact
        this.TryInteract();
    }
    CheckInteraction()
    {
        if ( this.renaming)
            return true;
        
        if ( this.grabbed)
        {
            this.ProccessGrabbing(); 
            return true;
        }
        if ( this.wiringData != null )
        {
            this.ProccessLinking(); 
            return true;
        }
       
        if (!mousepressed)
            return true;
        
        
        if (UserIsGrabbing||UserIsTyping|| UserIsWiring)
        {
            return true; 
        }
        return false;
    }
    
    TryInteract()
    {
        var i; 
        for (i = 0 ; i < this.inputsboxes.length; i++)
        {
            if (IsMouseInsideBox(this.inputsboxes[i], this.displayCanvas))
            {
                 if ( Editor.hasdoubleclicked )
                 {
                    this.grabbed = false; 
                    UserIsGrabbing = false;
                    this.ClearInputPort(i);
                    return;
                 }
                 this.wiringData = new WiringInfo(this.id, i, true);
                 UserIsWiring = true;
                 return;
            }
        }
        for (i = 0 ; i < this.outputsboxes.length; i++)
        {
            if (IsMouseInsideBox(this.outputsboxes[i],this.displayCanvas))
            {
                if ( Editor.hasdoubleclicked )
                {
                    this.grabbed = false;  
                    UserIsGrabbing = false;
                    this.ClearOutputPort(i);
                    return;
                }
                this.wiringData = new WiringInfo(this.id, i, false);
                UserIsWiring = true;
                return;
            }
        }      
    
        if (!IsMouseInsideBox(this.bodyBox,this.displayCanvas))
            return;
        
        // @ Update Code Editor 
        ide.TryLoadBlock(this)
        
        if ( Editor.hasdoubleclicked == true && !UserIsTyping)
        {
            // @ Destroy grabbed data... it can leave on the block
            this.grabbed = false;
            UserIsGrabbing = false;
            this.renaming = true;
            UserIsTyping = true;
            this.backupName = this.typename;
            this.typename = "";
            return;
        }
        
        // @ Do Grabbing
        this.GrabOrigin = new Vector2(mouseX-this.bodyBox.x, mouseY - this.bodyBox.y);
        this.grabbed = true;
        UserIsGrabbing = true;
    }
   
    // @ This can cause error when loading with [in ] [out ] creation
    LoadFromTypeName(fromfile = false) // @ does it every run ?
    {
         // @ Check if name is empty. do nothing & restore ancient typename variable.
        if ( this.typename.length == 0) 
        {
            this.typename = this.backupName; 
            return;
        }
        
        // @ Check if name correspond to an extension block? if true
        //   copy data of this block to  the new one. Then compile the block and return.
        var extblock = TryLoadExtensionBlock(this);
        if ( extblock != null )
        {
     
            // Set extblock at this position in Blocks array.
            Blocks[this.index] = extblock;
            // Copy index.
            extblock.index = this.index;
            // Compile
            TryLoadBlockFromLibraryEntries(extblock);
            CopyBlockData(extblock, this); // if we copy for predefined block this is not working
            extblock.ForceCompile();
            ide.TryLoadBlock(extblock);
            // Let time to garbage collector to free this class from memory.
            return;
        }
        // @ Is predefined arith block?
        
        if ( IsBlockPredefinedArithmetic(this))
        {
            var originalname = this.typename;
            var splitstr = this.typename.split(' ');
            var token = splitstr[0];
            
            var value =this.typename.substr(token.length, this.typename.length-token.length);
            // Load from script from token
            this.typename = token;
            TryLoadBlockFromLibraryEntries(this);
            this.ForceCompile();
            // Hide input 1 & set memory
            this.typename = originalname;
            this.SetInputCount(1);
            this.SetMemorySize(2);
            this.memory[1] = parseFloat(value);
            return;
        }
        TryLoadBlockFromLibraryEntries(this);
        ide.TryLoadBlock(this);
        this.ForceCompile();
    }
    
    ProccessRenaming(e)
    {
        
        if ( e.keyCode == 46 ) //@ key suppr was pressed  
        {
            this.Destroy();
            UserIsTyping = false;
            return; 
        }
        
       if ( e.keyCode == 13 ) // @ key enter was pressed 
        {
           
            // Reload
            this.renaming = false;
            UserIsTyping = false;
            this.LoadFromTypeName();
            return;
        }
        if (  e.keyCode == 8 )
            this.typename = this.typename.substr(0,this.typename.length-1);
        else
        {
            if ( !KeyIsIllegal(e.key))
            {
                this.typename += e.key;
            }
             
        }
        return;
        
    }
    ProccessGrabbing()
    {
        if (!mousepressed)
        {
            this.grabbed = false;
            UserIsGrabbing = false;
            return;
        }
        this.bodyBox.x = mouseX-this.GrabOrigin.x; 
        this.bodyBox.y = mouseY-this.GrabOrigin.y;
    }
    ProccessLinking()
    {
        var r = Editor.GetValidIOAtPosition(this.wiringData);
        if (!mousepressed )
        {
            // Get IO
            if (r != false )
            {
                if (this.wiringData.fromInput)
                {
                    Blocks[r[0]].AddWireOut(r[1],this.id,this.wiringData.comPort);
                }
                else
                {
                    this.AddWireOut(this.wiringData.comPort, Blocks[r[0]].id,r[1]); //@ OK
                }
            }
            this.wiringData = null;
            UserIsWiring = false;
            return;
        }
        //  @ Draw line from this position to mouse Position
        var _g = this.displayCanvas.context;
        _g.strokeStyle = "rgba(0,0,0)"; 
        _g.lineWidth = 1;
        _g.beginPath();
        if (this.wiringData.fromInput)
        {
            _g.moveTo(this.inputsboxes[this.wiringData.comPort].x +this.inputsboxes[this.wiringData.comPort].w/2 ,this.inputsboxes[this.wiringData.comPort].y+this.inputsboxes[this.wiringData.comPort].h/2);
        }
        else
        {
             _g.moveTo(this.outputsboxes[this.wiringData.comPort].x +this.outputsboxes[this.wiringData.comPort].w/2 ,this.outputsboxes[this.wiringData.comPort].y+this.outputsboxes[this.wiringData.comPort].h/2);
        }
        // Magnet closed Boxes  
        _g.lineTo(mouseX-this.displayCanvas.box.x, mouseY-this.displayCanvas.box.y);
        _g.closePath();
        
        if (r != false)
        {
            _g.strokeStyle = "rgba(0,0,255)"; 
        }
        
        _g.stroke();
        
    }
    
}

// some visual parameters for blocks : wire color, wire width, font, fontcolor, fontsize, fontwidth, body width, body color ... etc.


var Blocks = new Array();

function GetBlockByID(id)
{
    var i;
    for (i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].id == id )
        {
            return Blocks[i];
        }        
    }
    return null;
}
function GetBlockByTypeName(typename)
{
    var i;
    for (i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].typename == typename )
        {
            return Blocks[i];
        }        
    }
    return null;
}

function RecomputeMapIndex()
{
    var i;
    for (i = 0 ; i < Blocks.length; i++ )
    {
        Blocks[i].index = i;
    }
}

function GetAllBlocksByTypeName(typename)
{
    var r = new Array();
    var i;
    for (i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].typename == typename )
        {
            r.push(Blocks[i]);
        }        
    }
    return r;
}

function IsBlockPredefinedArithmetic(bloc)
{
    var arithmap = ["+","-","*","/",">","<",">=","<=","==","%"];
    var splitstr = bloc.typename.split(' ');
    if (arithmap.indexOf(splitstr[0])>-1 && splitstr.length > 1 )
        return true;
    return false;
}
function IsBlockWarpout(bloc)
{
    var r = bloc.typename.indexOf("out ");
    return r == 0;
}
function IsBlockWarpin(bloc)
{
    var r = bloc.typename.indexOf("in ");
    return r == 0;
}


function CreateNewBlock()
{
    console.log("Creating new block");
    // Create block & Compile
    var newblock = new Block(" new ", Editor.WindowExplorer.Thumbnails[0], Editor.Canvas);
    Blocks.push(newblock);
    newblock.LoadFromTypeName();
    ide.TryLoadBlock(newblock)

    return newblock;
    
}
function CreateSpecificBlock(typename, x, y )
{
    console.log("Creating new block : " + typename + " at " + x + " " + y);
    
    // Create block & Compile
    var newblock = new Block(typename, Editor.WindowExplorer.Thumbnails[0], Editor.Canvas);
    Blocks.push(newblock);
    newblock.LoadFromTypeName();
    newblock.SetPosition(x,y);
    ide.TryLoadBlock(newblock)
    
    return newblock;
}

function CopyBlockData(dest,src)
{
    
    dest.id = src.id; 
    dest.index = src.index;
    //dest.values = src.values;
    dest.inputboxes = src.inputboxes;
    dest.outputsboxes = src.outputsboxes;
    dest.Window = src.Window; 
    dest.inputslots = src.inputslots;
    dest.outputslots = src.outputslots;
    dest.bodyBox = src.bodyBox;
    
}


// @ Function that Load Bang when needed
function LoadBang()
{
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

