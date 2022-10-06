

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
        this.id =  new Date().getTime()+Blocks.length;             // create a unique ID at creation...
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
        this.dcoutmethods = [""]
        this.wireoutmethods = [""]
        this.dcinmethods = [""]
        this.wireinmethods = [""]
        this.miscmethods = [""]
        
        // IO
        this.inputslots = new Array();  // Array of size (inputnumber) containing array of int (id of blocks) 
        this.outputslots = new Array(); // Array of size (outputnumber) containing array of int (id of blocks)
        
        this.wiringData = null;
        this.selected = false;
        // Virtual function for special blocks + override...
        this.OnCreate();
        
    }
    
    OnCreate()
    {
         //console.log("New block created : " + this.typename);
    }
  
    Destroy( updateList = true )
    {
        // Run --end method...
        if ( this.miscmethods.length > 1 )
        {
            var s = this.miscmethods[1].split("?").join("Blocks["+this.index+"]");
            eval("(async () => {"+s+"})()");
        }
        
        // @ Clear ports
        var incount = this.inputslots.length;
        var outcount = this.outputslots.length;
        var i;
        for(i=incount-1;i>=0;i--)
            this.ClearInputPort(i);
        for(i=outcount-1;i>=0;i--)
            this.ClearOutputPort(i);
        
        // @ Try remove bloc from editor
        ide.TryCloseBlock(this)
        
        // @ Unset Interaction (we can only destroy while renaming so lets just do if renamed )
        UserIsTyping = false;
        
        if (!updateList)
            return;
        
        Blocks.splice(this.index,1);
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
            //for ( var i = this.inputslots.length-1; i>= count ;i--)
            //     this.ClearInputPort(i);
               
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
            
            //for ( var i = this.outputslots.length-1; i>=count;i--)
            //    this.ClearOutputPort(i);
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
            this.memory.splice(size);
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
        //console.log("[default wire out] Try connect " + this.typename);
        if ( this.outputslots.length <= PortNumber)
            return;
        
        this.outputslots[PortNumber].push(new WireOutData(destId, destCOM));
        var destbloc = GetBlockByID(destId);
        destbloc.AddWireIn(destCOM, this.id, PortNumber );
        //console.log("[default wire out] Success connect" + this.typename);
        // async on connect out code...
        if ( this.wireoutmethods.length-1 < PortNumber)
            return;
        //console.log("[default wire out] running method on connect" + this.typename);
        var s = this.wireoutmethods[PortNumber].split("?").join("Blocks["+this.index+"]");
        eval("(async () => {var wport = "+destCOM+";var wblock = Blocks["+destbloc.index+"];"+s+"})()");
        
    }
    // @ Called by AddWireOut
    AddWireIn(PortNumber, destId, destCOM)
    {
        //console.log("[default wire in] Try connect " + this.typename);
        if ( this.inputslots.length <= PortNumber)
            return;
        this.inputslots[PortNumber].push(new WireInData(destId, destCOM));
        //console.log("[default wire in] Success connect" + this.typename);
         // async on connect in code...
        if ( this.wireinmethods.length-1 < PortNumber)
            return;
        //console.log("[default wire in] running method on connect" + this.typename);
         var destbloc = GetBlockByID(destId);
        var s = this.wireinmethods[PortNumber].split("?").join("Blocks["+this.index+"]");
        eval("(async () => {var wport = "+destCOM+";var wblock = Blocks["+destbloc.index+"];"+s+"})()");
    }
    // Can be usefull
    ClearInputPort(PortNumber)
    {
        // @ Clear all related outputslots
        var i;
        for (i= 0 ; i < this.inputslots[PortNumber].length; i++)
        {
            var sourcebloc = GetBlockByID(this.inputslots[PortNumber][i].blocId);
            if ( sourcebloc == null )
                continue;
            var port       = this.inputslots[PortNumber][i].comPort;
            // Find Wire Index
            var n;
            for (n = 0; n < sourcebloc.outputslots[port].length; n++)
            {
                if (sourcebloc.outputslots[port][n].blocId == this.id
                   && sourcebloc.outputslots[port][n].comPort ==PortNumber)
                {
                    // @ Should slice here ...
                    //console.log("Should remove wire of " + sourcebloc.typename + " at port #" + port + " wire #" + n );
                    sourcebloc.ClearOutputPortWire(port, n);
                    break;
                }
            }
        }
        for (i = this.inputslots[PortNumber].length -1; i>=0; i--)
            this.ClearInputPortWire(PortNumber,i)
    }
    ClearOutputPort(PortNumber)
    {
        // @ Clear all related inputslots 
        var i;
        for (i= 0 ; i < this.outputslots[PortNumber].length; i++)
        {
            var sourcebloc = GetBlockByID(this.outputslots[PortNumber][i].blocId);
            if ( sourcebloc == null )
                continue;
            var port       = this.outputslots[PortNumber][i].comPort;
            // Find Wire Index
            var n;
            for (n = 0; n < sourcebloc.inputslots[port].length; n++)
            {
                if (sourcebloc.inputslots[port][n].blocId == this.id
                   && sourcebloc.inputslots[port][n].comPort ==PortNumber)
                {
                    // @ Should slice here ...
                    //console.log("Should remove wire of " + sourcebloc.typename + " at port #" + port + " wire #" + n );
                    sourcebloc.ClearInputPortWire(port, n );
                    break;
                }
            }
            
        }
        for (i = this.outputslots[PortNumber].length -1; i>=0; i--)
            this.ClearOutputPortWire(PortNumber,i)
    }
    ClearInputPortWire(PortNumber, WireIndex)
    {
        // Verify if wire exist.
        if ( this.inputslots.length <= PortNumber)
            return;
        if ( this.inputslots[PortNumber].length <= WireIndex)
            return;
        
          if ( this.dcinmethods.length > PortNumber)
        {
            var destbloc = GetBlockByID(this.inputslots[PortNumber][WireIndex].blocId);
            if ( destbloc != null)
            {
               var wport = this.inputslots[PortNumber][WireIndex].comPort;
               var s = this.dcinmethods[PortNumber].split("?").join("Blocks["+this.index+"]");
               eval("(async () => {var wport = "+wport+";var wblock = Blocks["+destbloc.index+"];"+s+"})()"); 
            }
             
        }
        
        this.inputslots[PortNumber].splice(WireIndex,1);
    }
    ClearOutputPortWire(PortNumber, WireIndex)
    {
          // Verify if wire exist.
        if ( this.outputslots.length <= PortNumber)
            return;
        if ( this.outputslots[PortNumber].length <= WireIndex)
            return;
        
        // async on disconnect out code...var destbloc = GetBlockByID(destId);
        if ( this.dcoutmethods.length > PortNumber
           )
        {
             var destbloc = GetBlockByID(this.outputslots[PortNumber][WireIndex].blocId);
             var wport = this.outputslots[PortNumber][WireIndex].comPort;
            var s = this.dcoutmethods[PortNumber].split("?").join("Blocks["+this.index+"]");
           eval("(async () => {var wport = "+wport+";var wblock = Blocks["+destbloc.index+"];"+s+"})()");
        }
       
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
        if ( w < 40 )
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
        if (this.selected || IsMouseInsideBox(this.bodyBox,this.displayCanvas) || this.CurrentlyInteract() )
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
           
            if (this.selected || IsMouseInsideBox(this.inputsboxes[i],this.displayCanvas) ){
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
            if (this.selected ||IsMouseInsideBox(this.outputsboxes[i],this.displayCanvas) ){
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
                var destbloc = GetBlockByID(this.outputslots[i][n].blocId);
                if (destbloc.Window != this.Window)
                    continue;
                _g.strokeStyle = VisualParameters.WireColor; 
                _g.lineWidth = VisualParameters.WireWidth;
                _g.beginPath();
                _g.moveTo(
                    this.outputsboxes[i].x + this.outputsboxes[i].w / 2 ,
                    this.outputsboxes[i].y + this.outputsboxes[i].h / 2
                        );
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
    // Output raw value
    O_true(portnumber,value)
    {
        var i; 
        for (i = this.outputslots[portnumber].length - 1 ; i >=0 ; i-- )
        {
            var outpbloc = GetBlockByID(this.outputslots[portnumber][i].blocId);
            outpbloc.I
            (
                this.outputslots[portnumber][i].comPort, value
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
        
        // @ Grabbing for selection
        if ( this.selected)
        {
            for ( var i = 0 ; i < Blocks.length; i++) 
            {
                if ( !Blocks[i].selected)
                    continue;
                Blocks[i].GrabOrigin = new Vector2(mouseX-Blocks[i].bodyBox.x, mouseY - Blocks[i].bodyBox.y);
                Blocks[i].grabbed = true;
            }
            UserIsGrabbing = true;
            return;
        }
        // @ Normal Grab
        this.GrabOrigin = new Vector2(mouseX-this.bodyBox.x, mouseY - this.bodyBox.y);
        this.grabbed = true;
        UserIsGrabbing = true;
    }
    
    LoadMemoryFromArguments(s)
    {
        if ( s == null )
            return ;
        var sp = s.split(' ')
        var ctr = 0;
        for ( var i = 0 ; i < sp.length ; i++)
        {
            if ( this.memory.length <= ctr)
            {
                console.log("break cause not enough mem")
                 break;
            }
               

            if  ( sp[i].length > 0 )
            {
                if ( ctr > 0)
                {  
                    var value = TryParseLine(sp[i]);
                    this.I(ctr, value);
                    
                    if ( this.miscmethods.length > 0 )
                    {
                        // string arguments can create issues.
                        var parsed = parseFloat(value);
                        var argline = "";
                         if (!isNaN(parsed))
                            argline = "var arg = "+value+"; var argctr = "+ ctr+";"
                        else
                            argline = "var arg = '"+value+"';var argctr = "+ ctr+";"
                        
                        var s = this.miscmethods[0].split("?").join("Blocks["+this.index+"]");
                        eval("(async () => {"+argline+s+"})()");
                    }
                    
                }
                ctr++;
            }
        }
    }
    // @ This can cause error when loading with [in ] [out ] creation
    LoadFromTypeName(fromfile = false, updateide = true)
    {
        // @ Check if string null
        if ( this.typename.length == 0) 
        {
            this.typename = this.backupName; 
            return;
        }
        
        //ide.TryCloseBlock(this);
        var entrytp = this.typename;
        this.typename = GetValidBlockTypeFromString(this.typename);
        if ( this.typename == null ){return;}
        
        // @ Check if typename equal precendent typename
        if (this.typename == GetValidBlockTypeFromString(this.backupName) )
        {
            this.LoadMemoryFromArguments(entrytp);
            this.typename = entrytp;
            return;
        }
        
        var extblock = TryLoadExtensionBlock(this);
        var b = this;
        if ( extblock != null )
        {
            // Set extblock at this position in Blocks array.
            // Variation 2. It is bad because it is not cleaning [ditto ] & [virtual ]
            Blocks[this.index] = extblock;
            // Copy index.
            extblock.index = this.index;
            // Compile
            TryLoadBlockFromLibraryEntries(extblock);
            CopyBlockData(extblock, this);
            extblock.ForceCompile();
            if ( updateide)
                ide.TryLoadBlock(extblock);
            
            extblock.LoadMemoryFromArguments(entrytp);
            extblock.typename = entrytp;
            
            // We do not need to destroy WireInfo... [BUT] We need to do some cleanup (destroy abstractions... if ditto or virtual)
            
            // By calling OnChangeIdentity...
            this.OnChangeIdentity();
            // not destroying if previous block [virtual ] or [ditto ] is hyper dangerous.
            //this.Destroy(false);
            // we really do not need to destroy inputs/outputs...
            return;
            
        }
        else
        {
            TryLoadBlockFromLibraryEntries(this);
            if ( updateide)
                ide.TryLoadBlock(this);
            this.ForceCompile();
        }
        // Copy memory arguments. TryParseLine
        b.LoadMemoryFromArguments(entrytp);
        b.typename = entrytp;
     
    }
    OnChangeIdentity(){} // UseFull function to call when a block has changed identity through renaming
    
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
        var r = Editor.GetValidIOAtPosition(this);
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
function GetValidBlockTypeFromString(s)
{
    if ( s == null )
        return ;
    var sp =  s.split(' ');;
    for ( var i = 0 ; i < sp.length; i++)
    {
        if  ( sp[i].length > 0 )
        {
            return sp[i];
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

function CopyCreateGroupOfBlocks(blocs, centerOffset, window, canvas)
{
    // Get centroid of all blocks? Only get most topXTopY of all blocks? well...
    var centroidX = 0;
    var centroidY = 0;
    for ( var i = 0 ; i < blocs.length; i++ )
    {
        centroidX += blocs[i].bodyBox.x;
        centroidY += blocs[i].bodyBox.y;
        blocs[i].selected = false;
    }
    centroidX /= blocs.length;
    centroidY /= blocs.length;
    var CopiedBlocks = new Array();
    // Duplicate all blocks ( without wiring them... ). Should we copy also their memory? yes!
    for ( var i = 0 ; i < blocs.length; i++)
    {
        // Center of those objects should be at mouse position (related to canvas)
        var x = blocs[i].bodyBox.x + centerOffset.x - canvas.box.x - centroidX;
        var y = blocs[i].bodyBox.y + centerOffset.y - canvas.box.y - centroidY;
        var b = CreateSpecificBlock(blocs[i].typename, x, y, window, canvas);
        // console.log("[virtual]cloning block "+ blocs[i].typename + " at " + x + ":"+ y)
        // Copy blocks memory. Only if a valid type...
        // Get block by ID. Cause ID can change;
        var id = b.id;
        b = GetBlockByID(id);
        //console.log("[virtual]blocks succesffully created : " + b.typename)
        for ( var m = 0 ; m < blocs[i].memory.length; m++)
        {
            if ( typeof  blocs[i].memory[m] == "string" 
                || typeof blocs[i].memory[m] == "number"
                || typeof blocs[i].memory[m] == "boolean")
                b.memory[m] = blocs[i].memory[m];
        }
        CopiedBlocks.push(b);  
    }
    for ( var i = 0 ; i < blocs.length; i++)
    {
        // Go through all outputs. Check if they are connected to any other selected block...
        // If true. just connect to the one.
        for ( var a = 0; a < blocs[i].outputslots.length; a++)
        {
            for ( var b = 0 ; b < blocs[i].outputslots[a].length; b++)
            {
                var wire = blocs[i].outputslots[a][b];
                for ( var c = 0; c < blocs.length; c++)
                {
                    if ( wire.blocId == blocs[c].id)
                    {
                        CopiedBlocks[i].AddWireOut(a,CopiedBlocks[c].id,wire.comPort); 
                        //console.log("[virtual] at copy connecting "+ CopiedBlocks[i].typename + " to " +CopiedBlocks[c].id  );
                    }
                }
            }
        }
    }
    
    return CopiedBlocks;
}
//@ return number of inlet found in window
function GetInletCountOfWindow(windowname)
{
    var iltc = 0;
    for ( var i = 0 ; i < Blocks.length ; i++)
    {
        if (Blocks[i].renaming || Blocks[i].Window != windowname)
                continue;
        if ( Blocks[i].typename.indexOf("inlet") > -1 )
        {
                if ( iltc < Blocks[i].memory[1] + 1)
                    iltc = Blocks[i].memory[1] + 1;
        }
    }
    return iltc;
}
function GetOutletCountOfWindow(windowname)
{
    var oltc = 0;
    for ( var i = 0 ; i < Blocks.length ; i++)
    {
        if (Blocks[i].renaming || Blocks[i].Window != windowname)
                continue;
        if ( Blocks[i].typename.indexOf("outlet") > -1 )
        {
            if ( oltc < Blocks[i].memory[1] + 1)
                oltc = Blocks[i].memory[1] + 1;
        }
    }
    return oltc;
}
// Get both inlet and outlet. returning number of inlet and outlet in an array
function GetWarpsCountOfWindow(windowname)
{
    var iltc = 0;
    var oltc = 0;
    for ( var i = 0 ; i < Blocks.length ; i++)
    {
        if (Blocks[i].renaming || Blocks[i].Window != windowname)
                continue;
        if ( Blocks[i].typename.indexOf("inlet") > -1 )
        {
                if ( iltc < Blocks[i].memory[1] + 1)
                    iltc = Blocks[i].memory[1] + 1;
                continue;
        }
        if ( Blocks[i].typename.indexOf("outlet") > -1 )
        {
            if ( oltc < Blocks[i].memory[1] + 1)
                oltc = Blocks[i].memory[1] + 1;
            continue;
        }
    }
    return [iltc,oltc];
}
// Destroy all blocks in a specific window
function DestroyAllBlocksInWindow(windowname)
{
    for ( var i = 0 ; i < Blocks.length; i++)
    {
        if ( Blocks[i].Window != windowname)
            continue;
        Blocks[i].Destroy();
    }
}
// Create a deep copy of window
function CreateDeepCopyOfWindow(windowbasename, canvas)
{
    // Select all blocks of the window. Then copy it. to a new window
        var winblocks = new Array();
        for ( var i = 0 ; i < Blocks.length; i++)
        {
           if ( Blocks[i].Window != windowbasename)
               continue;
           winblocks.push(Blocks[i]);
        }
        //console.log("[virtual] found " + winblocks.length + " blocks in space "+ windowbasename);
        // Get a valid copy index.
        var ctr = 0; 
        // search for existing window.
        while ( true )
        {
            if ( Editor.Windows.indexOf(windowbasename+"_"+ctr) == -1 )
                break;
            ctr++;
        }
        Editor.Windows.push(windowbasename+"_"+ctr);
        CopyCreateGroupOfBlocks(winblocks, 
                                new Vector2(canvas.box.x + (canvas.box.w/2) ,
                                            canvas.box.y + (canvas.box.h/2)), 
                                windowbasename+"_"+ctr, canvas)
        
        return windowbasename+"_"+ctr;
}
// @ Return an array of array. Each each 
function GetInletsOfWindow(windowname)
{
    var r = new Array();
    for ( var i = 0 ; i < Blocks.length ; i++)
    {
        if (Blocks[i].renaming || Blocks[i].Window != windowname)
                continue;
        if ( Blocks[i].typename.indexOf("inlet") > -1 )
        {
            if ( r.length <= Blocks[i].memory[1] )
                ResizeArray(r,Blocks[i].memory[1]+1)
            r[Blocks[i].memory[1]].push(Blocks[i]);
        }
    }
    return r;
}
function GetOutletsOfWindow(winndowname)
{
    var r = new Array();
    for ( var i = 0 ; i < Blocks.length ; i++)
    {
        if (Blocks[i].renaming || Blocks[i].Window != windowname)
                continue;
        if ( Blocks[i].typename.indexOf("outlet") > -1 )
        {
            if ( r.length <= Blocks[i].memory[1] )
                ResizeArray(r,Blocks[i].memory[1]+1)
            r[Blocks[i].memory[1]].push(Blocks[i]);
        }
    }
    return r;
}
function CreateNewBlock()
{
    //console.log("Creating new block");
    // Create block & Compile
    var newblock = new Block("new", Editor.WindowExplorer.Thumbnails[0], Editor.Canvas);
    Blocks.push(newblock);
    newblock.LoadFromTypeName();
    //ide.TryLoadBlock(newblock)

    return newblock;
    
}
function CreateSpecificBlock(typename, x, y , window = null, canvas = null )
{
    //console.log("Creating new block : " + typename + " at " + x + " " + y);
    if ( window == null)
        window =  Editor.WindowExplorer.Thumbnails[0]
    if ( canvas == null)
        canvas = Editor.Canvas;
    // Create block & Compile
    var newblock = new Block(typename,window,canvas);
    Blocks.push(newblock);
    newblock.LoadFromTypeName();
    newblock.SetPosition(x,y);
    //ide.TryLoadBlock(newblock)
    
    return newblock;
}


function CopyBlockData(dest,src)
{
    
    dest.id = src.id; 
    dest.index = src.index;
    
    dest.inputsboxes = new Array();
    for ( var i = 0 ; i < src.inputsboxes.length; i++)
    {
        dest.inputsboxes.push(new Box(src.inputsboxes[i].x,src.inputsboxes[i].y,
                                      src.inputsboxes[i].w,src.inputsboxes[i].h));
    }
    //dest.inputsboxes = src.inputsboxes; 
    dest.outputsboxes = new Array();
    for ( var i = 0 ; i < src.outputsboxes.length; i++)
    {
        dest.outputsboxes.push(new Box(src.outputsboxes[i].x,src.outputsboxes[i].y,
                                      src.outputsboxes[i].w,src.outputsboxes[i].h));
    }
    console.log( dest.outputsboxes.length);
    //dest.outputsboxes = src.outputsboxes;
    dest.inputslots = new Array();
    for ( var i = 0 ; i < src.inputslots.length; i++)
    {
        var slot = new Array();
        for ( var n = 0 ; n <  src.inputslots[i].length; n++)
        {
            slot.push(new WireInData(src.inputslots[i][n].blocId, src.inputslots[i][n].comPort));
        }
        dest.inputslots.push(slot);
    }
    //dest.inputslots = src.inputslots;
    dest.outputslots = new Array();
    for ( var i = 0 ; i < src.outputslots.length; i++)
    {
        var slot = new Array();
        for ( var n = 0 ; n <  src.outputslots[i].length; n++)
        {
            slot.push(new WireOutData(src.outputslots[i][n].blocId, src.outputslots[i][n].comPort));
        }
        dest.outputslots.push(slot);
    }
    //dest.outputslots = src.outputslots;
    
    dest.Window = src.Window; 
    dest.bodyBox = new Box(src.bodyBox.x,src.bodyBox.y, src.bodyBox.w, src.bodyBox.h) ;
    
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

