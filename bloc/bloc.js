/*
    TODO
    -> Better Logic on O()
    -> Double Click Logic
    -> ALU/LOGIC token detection when renaming
*/

// @ Wire Data
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
        this.NativeScript = new Array();
        this.memory = new Array(); // internal memory 
        this.declar = ""; // code called only at reset 
        this.method = "";  // code contained by this block as a string. Using reflection. 
        
        // IO
        this.inputslots = new Array();  // Array of size (inputnumber) containing array of int (id of blocks) 
        this.outputslots = new Array(); // Array of size (outputnumber) containing array of int (id of blocks)
        
        console.log("New block created!!!!");
        
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
        // @ Try remove opened thumbnail 
        // ->-<-<->-<->-<->-<->-< : this one make things buggy ....
        var indexthumb = ideThumbnails.Thumbnails.indexOf(this);
        if  ( indexthumb > -1 )
            ideThumbnails.Thumbnails.splice(indexthumb,1);
        ideThumbnails.Draw();
        // @Update also IDE
        if ( ide.BlockID == this.id)
        {
            ide.BlockID = 0;
            ide.Text = "";
            ide.DrawScriptText();
        }
        // Unset Interaction (we can only destroy while renaming so lets just do if renamed )
        currentTyping = -1;
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
        this.memory = new Array();
        var i;
        for (i =0 ; i< size;i++ )
            this.memory.push(0);
    }
    AddWireOut(PortNumber, destId, destCOM)
    {
        this.outputslots[PortNumber].push(new WireOutData(destId, destCOM));
        var destbloc = GetBlockByID(destId);
        destbloc.AddWireIn(destCOM, this.id, PortNumber );
    }
    // @ Called by AddWireOut
    AddWireIn(PortNumber, destId, destCOM)
    {
        
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
        TryLoadBlockFromLibraryEntries(this);
    }
    
    SetPosition(x,y)
    {
        this.bodyBox.x = x;
        this.bodyBox.y = y;
    }
    
    // Graphic
    Draw()
    {
        if ( currentTyping != this.id)
        {
            if ( TryDrawSpecial(this))
            return;
        }
        
        // Compute Width and Port distance
        var w = this.typename.length * 9;
        if ( w < 25 )
        {
            w = 40 ;
        }
        var maxSlot = this.inputslots.length;
        if (  this.outputslots.length > maxSlot){
            maxSlot = this.outputslots.length;
        }
        
        var segwidth = w /maxSlot ;
        if ( segwidth < 10 *1.5){
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
        this.DrawIOs(iostartpos,segwidth,this.inputslots.length, this.outputslots.length )
        
        // @ Print text
        var _g = this.displayCanvas.context;
        _g.fillStyle = 'rgb(0,0,0)';
        if (currentTyping == this.id )
        {
            _g.fillStyle = 'rgb(255,255,255)';
        }
        _g.font = "16px Autopia";
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
        _g.fillStyle = 'rgb(255,255,255)';
        if (currentTyping == this.id )
        {
            _g.fillStyle = 'rgb(0,0,255)';
        }
        _g.fillRect(this.bodyBox.x,this.bodyBox.y,this.bodyBox.w,this.bodyBox.h);
        
        // Outline
        _g.lineWidth = 3;
        _g.strokeStyle = 'rgb(0,0,0)';
        if (currentTyping == this.id )
        {
            _g.strokeStyle = 'rgb(255,255,255)';
        }
        if (IsMouseInsideBox(this.bodyBox,this.displayCanvas) || this.CurrentlyInteract() )
        {
            _g.strokeStyle = 'rgb(0,0,255)';
            EditorInfo = GetDocOfNativeScriptFromToken(this.NativeScript, "#df");
        }
        // if this is in library 
        _g.strokeRect(this.bodyBox.x,this.bodyBox.y,this.bodyBox.w,this.bodyBox.h);
    }
    // Generic Draw IOs functions...
    DrawIOs( iostartpos, segwidth, inpcount, ouptcount )
    {
        var _g = this.displayCanvas.context;
        var i;
        var px = iostartpos;
        if (!IsBlockWarpin(this))
        {
            for ( i = 0 ; i < inpcount; i++ )
            {
                _g.fillStyle = 'rgb(0,0,0)';
                this.inputsboxes[i].x = px; 
                this.inputsboxes[i].y = this.bodyBox.y - this.inputsboxes[i].h;
                if (IsMouseInsideBox(this.inputsboxes[i],this.displayCanvas) ){
                    _g.fillStyle = 'rgb(255,0,0)';
                    EditorInfo = GetDocOfNativeScriptFromToken(this.NativeScript, "#i"+i);
                }
                _g.fillRect(px , this.inputsboxes[i].y, this.inputsboxes[i].w,this.inputsboxes[i].h);
                px += segwidth;
            }
        }
        // @ Draw Outputs
        if (!IsBlockWarpout(this))
        {
            px = iostartpos;
            for ( i = 0 ; i < ouptcount; i++ )
            {
                _g.fillStyle = 'rgb(0,0,0)';
           
                this.outputsboxes[i].x = px; 
                this.outputsboxes[i].y = this.bodyBox.y + this.bodyBox.h;
                if (IsMouseInsideBox(this.outputsboxes[i],this.displayCanvas) ){
                    _g.fillStyle = 'rgb(255,0,0)';
                    EditorInfo = GetDocOfNativeScriptFromToken(this.NativeScript, "#o"+i);
                }
                _g.fillRect(px , this.outputsboxes[i].y, this.outputsboxes[i].w,this.outputsboxes[i].h);
                px += segwidth;
            }
        }
        
    }
    
    DrawWires()
    {
         var _g = this.displayCanvas.context;
        // @ Draw wires
        var i;
        if (!IsBlockWarpout(this))
        {
              for (i = 0 ; i < this.outputslots.length; i++)
                {
                    var n = 0; 
                    for (n = 0; n < this.outputslots[i].length; n++)
                    {
                        _g.strokeStyle = "rgba(0,0,0)"; 
                        _g.lineWidth = 1;
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
        }
           
    }
    OIO()
    {
        var s = this.method.split("?").join("Blocks["+this.index+"]");
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
        
        // Special bang graphics
        if ( this.typename == "bang" && this.Window == windowThumbnails.Thumbnails[0])
        {
            //@ Draw circle
            var _g = this.displayCanvas.context;
            var centerX = this.bodyBox.x + this.bodyBox.w / 2;
            var centerY = this.bodyBox.y + this.bodyBox.h / 2;
            _g.beginPath();
            _g.arc(centerX, centerY, 30, 0, 2* Math.PI, false);
            _g.fillStyle =  'rgb(0,0,255)';
            _g.fill();
            _g.closePath();
        }
    }
    
    // User Interaction
    CurrentlyInteract()
    {

        if ( currentGrab != null )
        {
            if ( currentGrab.Id == this.id )
                return true;
        }
        return linkedData.blocId == this.id;
    }
    Interact()
    {
        if ( currentTyping != this.id)
        {
            if ( TryInteractSpecial(this))
                return;
        }
        
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
        if ( currentTyping == this.id)
        {
            return true;
        }
        if ( currentGrab != null)
        {
             if ( currentGrab.Id == this.id)
            {
                this.ProccessGrabbing(); 
                return true;
            }
        }
       
        if ( linkedData.blocId == this.id)
        {
            this.ProccessLinking(); 
            return true;
        }
        if (!this.displayCanvas.mousepressed)
            return true;
        
        
        if (UserIsInteracting())
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
                 if ( this.displayCanvas.hasdoubleclicked )
                 {
                      // @ Destroy grabbed data... it can leave on the block
                    currentGrab = null;
                    this.ClearInputPort(i);
                    return;
                 }
                 linkedData = new WiringInfo(this.id, i, true);
                 return;
            }
        }
        for (i = 0 ; i < this.outputsboxes.length; i++)
        {
            if (IsMouseInsideBox(this.outputsboxes[i],this.displayCanvas))
            {
                if ( this.displayCanvas.hasdoubleclicked )
                {
                     // @ Destroy grabbed data... it can leave on the block
                    currentGrab = null;
                    this.ClearOutputPort(i);
                    return;
                }
                linkedData = new WiringInfo(this.id, i, false);
                return;
            }
        }      
    
        if (!IsMouseInsideBox(this.bodyBox,this.displayCanvas))
            return;
        
        // @ Update Code Editor 
        ideThumbnails.AddThumbnail(this);
        ide.UpdateEditor(this.id);
        
        if ( this.displayCanvas.hasdoubleclicked == true )
        {
            // @ Destroy grabbed data... it can leave on the block
            currentGrab = null;
            currentTyping = this.id;
            this.backupName = this.typename;
            this.typename = "";
            return;
        }
        
        // @ Do Grabbing
        currentGrab = new Grab(this.id, new Vector2(mouseX-this.bodyBox.x, mouseY - this.bodyBox.y));
    }
   
    // @ This can cause error when loading with [in ] [out ] creation
    LoadFromTypeName(fromfile = false) // @ does it every run ?
    {
        // @ Check if name is empty. if true, reload ancient name 
        if ( this.typename.length == 0) 
        {
            this.typename = this.backupName; 
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
            this.ForceCompile();
            // Hide input 1 & set memory
            this.typename = originalname;
            this.SetInputCount(1);
            this.SetMemorySize(2);
            this.memory[1] = parseFloat(value);
            return;
            
        }
        if ( fromfile)
        {
            this.ForceCompile();  
            return;
        }
        // @ Detect warp Out
         var outi = this.typename.indexOf("out ");
         if ( outi == 0)
         {
            var typename = this.typename.substr(4,this.typename.length-4);
            // @ Generated outscript
            var outscript = new Array();
            outscript.push("# AutoGenerated Code for Warping");
            outscript.push("# @ Logic for [OUT $] block");
            outscript.push("--decl");
            outscript.push("inp(1)"); // Do not draw for Input
            outscript.push("outp(1)");
            outscript.push("memset(1)");
            outscript.push("--code");
            outscript.push("out0(0)");
            this.NativeScript = outscript;
            ide.Text = outscript;
            ide.DrawScriptText();
            ide.hasUpdated = true;
            OnCodeUpdate();
                
            // we can eventually get all all blocks 
            var inblocs = GetAllBlocksByTypeName("in "+typename);
            if (inblocs.length == 0 )
            {
                //AddNewWindow("win"+GetWindowsCount().toString());
                AddNewWindow(GetEmptyWindow());
                //@ Create the inblock
                var inbloc = CreateSpecificBlock("in "+typename, this.displayCanvas.box.w/2,this.displayCanvas.box.h/2 );
                //@ Set a generic nativescript
                var genscript = new Array();
                genscript.push("# AutoGenerated Code for Warping");
                genscript.push("# @ Logic for [IN $] block");
                genscript.push("--decl");
                genscript.push("inp(1)"); // Do not draw for Input
                genscript.push("outp(1)");
                genscript.push("memset(1)");
                genscript.push("--code");
                genscript.push("out0(0)");
                inbloc.NativeScript = genscript;
                ide.Text = genscript;
                ide.DrawScriptText();
                ide.hasUpdated = true;
                OnCodeUpdate();
                inblocs.push(inbloc);
                    
            }
            //@ Link output to all in blocks
            var i; 
            for (i=0;i<inblocs.length;i++)
            {
                this.AddWireOut(0, inblocs[i].id, 0);
            }
                
        }
        
        // @ Detect warp In
        var ini = this.typename.indexOf("in ");
        if (ini == 0 )
        {
            var typename = this.typename.substr(3,this.typename.length-3);
            // @ Generated inputscript
            var genscript = new Array();
            genscript.push("# AutoGenerated Code for Warping");
            genscript.push("# @ Logic for [IN $] block");
            genscript.push("--decl");
            genscript.push("inp(1)"); // Do not draw for Input
            genscript.push("outp(1)");
            genscript.push("memset(1)");
            genscript.push("--code");
            genscript.push("out0(0)");
            this.NativeScript = genscript;
            ide.UpdateEditor(this.id);
            ide.Text = genscript;
            ide.DrawScriptText();
            ide.hasUpdated = true;
            OnCodeUpdate();
                
            var outblocs = GetAllBlocksByTypeName("out "+typename);
            for (i=0;i<outblocs.length;i++)
            {
                outblocs[i].AddWireOut(0, this.id, 0);
            }
                
        }
        this.ForceCompile();
    }
    
    ProccessRenaming(e)
    {
        if ( e.keyCode == 46 ) //@ key suppr was pressed  
        {
            this.Destroy();
            return; 
        }
       if ( e.keyCode == 13 ) // @ key enter was pressed 
        {
           
            // Reload
            this.LoadFromTypeName();
            // @ Set renaming false
            currentTyping = -1;
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
        if (!this.displayCanvas.mousepressed)
        {
            currentGrab = null;
            return;
        }
        this.bodyBox.x = mouseX-currentGrab.Offset.x; 
        this.bodyBox.y = mouseY-currentGrab.Offset.y;
    }
    ProccessLinking()
    {
        if (!this.displayCanvas.mousepressed )//|| !ctrlPressed)
        {
            // Get IO
            var r = GetValidIOAtPosition();
            if (r != false )
            {
                if (linkedData.fromInput)
                {
                    Blocks[r[0]].AddWireOut(r[1],this.id,linkedData.comPort);
                }
                else
                {
                    this.AddWireOut(linkedData.comPort, Blocks[r[0]].id,r[1]); //@ OK
                }
            }
            // @ Update input or output ...
            linkedData = new WiringInfo();
            return;
        }
        //  @ Draw line from this position to mouse Position
        var _g = this.displayCanvas.context;
        _g.strokeStyle = "rgba(0,0,0)"; 
        _g.lineWidth = 1;
        _g.beginPath();
        if (linkedData.fromInput)
        {
            _g.moveTo(this.inputsboxes[linkedData.comPort].x +this.inputsboxes[linkedData.comPort].w/2 ,this.inputsboxes[linkedData.comPort].y+this.inputsboxes[linkedData.comPort].h/2);
        }
        else
        {
             _g.moveTo(this.outputsboxes[linkedData.comPort].x +this.outputsboxes[linkedData.comPort].w/2 ,this.outputsboxes[linkedData.comPort].y+this.outputsboxes[linkedData.comPort].h/2);
        }
        // Magnet closed Boxes  
        _g.lineTo(mouseX-this.displayCanvas.box.x, mouseY-this.displayCanvas.box.y);
        _g.closePath();
        
        if (GetValidIOAtPosition() != false)
        {
            _g.strokeStyle = "rgba(0,0,255)"; 
        }
        
        _g.stroke();
        
    }
    
}

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
    var newblock = new Block(" new ", windowThumbnails.Thumbnails[0], EditorCanvas);
    Blocks.push(newblock);
    newblock.LoadFromTypeName();
    
    // Update UI
    ideThumbnails.AddThumbnail(newblock);
    ide.UpdateEditor(newblock.id);
    return newblock;
    
}
function CreateSpecificBlock(typename, x, y )
{
    console.log("Creating new block : " + typename + " at " + x + " " + y);
    
    // Create block & Compile
    var newblock = new Block(typename, windowThumbnails.Thumbnails[0], EditorCanvas);
    Blocks.push(newblock);
    newblock.LoadFromTypeName();
    newblock.SetPosition(x,y);
    
    // Update UI
    ideThumbnails.AddThumbnail(newblock);
    ide.UpdateEditor(newblock.id);
    return newblock;
}

//@ Experimental section
//@ Return result as a string
function TryCompileWindow(windowname)
{
    // @ Find entry called [in ]
    var i;
    var inblocks = new Array();
    for (i = 0 ; i < Blocks.length; i++ )
    {
        if ( Blocks[i].typename.indexOf("in ") >= 0)
        {
            inblocks.push(inblocks);
            break;
        }
    }
    if (inblocks.length == 0 ) 
    {
         return "COMPILING FAILED: No [in ] block found";
    }
    //@ Try Compiling entries 
    for (i=0;i < inblocks.length;i++)
    {
      
    }
    return "[WINDOW COMPILING IS NOT FULLY IMPLEMENTED]";
    
}
function TryCompileWindowFromInput(inputblock)
{
    
}