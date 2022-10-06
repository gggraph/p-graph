function InterpreteBlockCode(block)
{
   var r = InterpreteNative(block.NativeScript);
   block.declar = r[0];
   block.methods = r[1];
   
   block.wireoutmethods = r[2];
   block.dcoutmethods = r[3];
   block.wireinmethods = r[4];
   block.dcinmethods = r[5];
   block.miscmethods = r[6];
}

function InterpreteNative(nativescript)
{
    var declar = ProccessCodeFromRegion(nativescript,"--decl")
    var method = ProccessCodeFromRegion(nativescript,"--code")
    
    var methods = GetIPFCodeRegions(nativescript);
    if ( methods.length == 0)
        methods.push(method);
    else
        methods[0] = method;
    
    var ooc = GetWireOutRegions(nativescript)
    var ood = GetDCOutRegions(nativescript)
    var oic = GetWireInRegions(nativescript)
    var oid = GetDCInRegions(nativescript)
    
    var misc = new Array();
    misc.push(ProccessCodeFromRegion(nativescript,"--arg")) // #misc 0 is on argument received... 
    misc.push(ProccessCodeFromRegion(nativescript,"--end")) // #misc 0 is on argument received... 
    return new Array(declar, methods, ooc, ood, oic, oid, misc);
}
function ProccessCodeFromRegion(nativescript,regionname)
{
    var rawreg = GetTextInsideLabel(regionname, "--", nativescript);
    var proc = ProccessPseudoRN(rawreg);
    return InterpreteRegion(proc);
}
function GetDCInRegions(nativescript)
{
    var r = new Array();
    for (var i = 0; i < nativescript.length; i++ )
    {
        if ( nativescript[i].indexOf("--dcwi") == 0)
        {
            var ipnum = parseInt(nativescript[i].replaceAll("--dcwi",""));
            var dff = ipnum - r.length;
            if ( dff > 0)
            {
                for ( var n = 0 ; n < dff; n++)
                    r.push("");
            }
            if ( dff < 0)
                r.splice(ipnum);

            // Get region
            var rawreg = GetTextInsideLabel(nativescript[i], "--", nativescript);
            var proc = ProccessPseudoRN(rawreg);
            var code = InterpreteRegion(proc);
            r[ipnum] = code;
        }
    }
    return r;
}
function GetWireInRegions(nativescript)
{
    var r = new Array();
    for (var i = 0; i < nativescript.length; i++ )
    {
        if ( nativescript[i].indexOf("--wi") == 0)
        {
            var ipnum = parseInt(nativescript[i].replaceAll("--wi",""));
            var dff = ipnum - r.length;
            if ( dff > 0)
            {
                for ( var n = 0 ; n < dff; n++)
                    r.push("");
            }
            if ( dff < 0)
                r.splice(ipnum);

            // Get region
            var rawreg = GetTextInsideLabel(nativescript[i], "--", nativescript);
            var proc = ProccessPseudoRN(rawreg);
            var code = InterpreteRegion(proc);
            r[ipnum] = code;
        }
    }
    return r;
}
function GetDCOutRegions(nativescript)
{
    var r = new Array();
    for (var i = 0; i < nativescript.length; i++ )
    {
        if ( nativescript[i].indexOf("--dcwo") == 0)
        {
            var ipnum = parseInt(nativescript[i].replaceAll("--dcwo",""));
            var dff = ipnum - r.length;
            if ( dff > 0)
            {
                for ( var n = 0 ; n < dff; n++)
                    r.push("");
            }
            if ( dff < 0)
                r.splice(ipnum);

            // Get region
            var rawreg = GetTextInsideLabel(nativescript[i], "--", nativescript);
            var proc = ProccessPseudoRN(rawreg);
            var code = InterpreteRegion(proc);
            r[ipnum] = code;
        }
    }
    return r;
}
function GetWireOutRegions(nativescript)
{
    var r = new Array();
    for (var i = 0; i < nativescript.length; i++ )
    {
        if ( nativescript[i].indexOf("--wo") == 0)
        {
            var ipnum = parseInt(nativescript[i].replaceAll("--wo",""));
            var dff = ipnum - r.length;
            if ( dff > 0)
            {
                for ( var n = 0 ; n < dff; n++)
                    r.push("");
            }
            if ( dff < 0)
                r.splice(ipnum);

            // Get region
            var rawreg = GetTextInsideLabel(nativescript[i], "--", nativescript);
            var proc = ProccessPseudoRN(rawreg);
            var code = InterpreteRegion(proc);
            r[ipnum] = code;
        }
    }
    return r;
}

function GetIPFCodeRegions(nativescript)
{
    var r = new Array();
    for (var i = 0; i < nativescript.length; i++ )
    {
        if ( nativescript[i].indexOf("--ipf") == 0)
        {
            var ipnum = parseInt(nativescript[i].replaceAll("--ipf",""));
            var dff = ipnum - r.length;
            if ( dff > 0)
            {
                for ( var n = 0 ; n < dff; n++)
                    r.push("");
            }
            if ( dff < 0)
                r.splice(ipnum);

            // Get region
            var rawreg = GetTextInsideLabel(nativescript[i], "--", nativescript);
            var proc = ProccessPseudoRN(rawreg);
            var code = InterpreteRegion(proc);
            r[ipnum] = code;
        }
    }
    return r;
}


function ProccessPseudoRN(text)
{
    return text.split("[rn]");
}

function InterpreteRegion(region) // this is as a unique string; 
{
    var r = "";
    var i ; 
    
    // @ Remove commented region... 
    var unco_reg = new Array();
    for (i = 0 ; i < region.length; i++ )
    {
        // @ Do not process commented line 
        var s = region[i].replaceAll(" ","");
        if (s[0] == '#')
            continue;
        unco_reg.push(region[i]);
    }
    
    // @ Concat all lines 
    for (i = 0 ; i < unco_reg.length; i++ )
    {
        r += unco_reg[i] +";";
    }
    //@ Parse bloc-related symbol
    r = r.split("inp").join("?.SetInputCount");  
    r = r.split("outp").join("?.SetOutputCount"); 
    r = r.split("memset").join("?.SetMemorySize"); 
    // should always be equal to input size
    //@ Parse MEM & OUT STUFF
    // parse MEM()
    r = ParseMEM(r);
    r = ParseSELF(r);
    // parse OUT()
    r = ParseOUT(r);
    return r; 
    
}
function ParseSELF(text)
{
    return text.replaceAll("self", "?");    
}
function ParseMEM(text)
{
    //@ Check for MEM()
    while ( true )
    {
        var pos = text.indexOf("mem(");
        if ( pos >= 0 )
        {
            // mem was found 
            var arg  = "";
            var i; 
            var legit = false;
            for (i = pos+4; i < text.length; i++) // 4 is token lenngth 
            {
                if (text[i] ==')')
                {
                    // enclose bracket found
                    legit = true;
                    break;
                }
                arg += text[i].toString();
            }
            if ( !legit)
                break;
            // @
            //console.log("MEM WAS FOUND AND ARG IS " + arg);
            
            // @ replace text
            var rpstr = "?.memory["+arg+"]";
            
            text = text.replaceAll("mem("+arg+")", rpstr);
            continue;
        }
        return text;
    }
      
}
function ParseOUT(text)
{
    //@ Check for OUT
    while ( true )
    {
        var pos = text.indexOf("out");
        if ( pos >= 0)
        {
           // get char until "(" 
            var comport  = "";
            var argstart = 0;
            var i; 
            var legit = false;
            for (i = pos+3; i < text.length; i++) // 4 is token lenngth 
            {
                if (text[i] =='(')
                {
                    argstart = i+1;
                    legit = true;
                    break;
                }
                comport += text[i].toString();
            }
             if ( !legit)
                break;
            
            var arg  = "";
            legit = false;
            for (i = argstart; i < text.length; i++) // 4 is token lenngth 
            {
                if (text[i] ==')')
                {
                    legit = true;
                    break;
                }
                arg += text[i].toString();
            }
            if ( !legit)
                break;
            // @
            //console.log("OUT WAS FOUND -> COMPORT IS " + comport +" and ARG IS " + arg);
            
            // @ replace text
            var rpstr = "?.O("+comport+","+arg+")";
            text = text.replaceAll("out"+comport+"("+arg+")", rpstr);
            continue;
           
        }
         return text;
    }
    return text;
}

function ProccessGlobalCommand(cmd)
{
    console.log("proccessing DOS COMMAND : " + cmd);
    // should remove all  " " after first space
   // cmd = cmd.replaceAll(" ",""); 
    cmd = cmd.toLowerCase();
    if ( cmd == "save")
    {
        //DownloadStatus();
        return;
    }
    
    if ( cmd.includes("ren ")) 
    {
      
        var newname = cmd.replaceAll("ren ","");
        var block = GetBlockByID(ide.BlockID);
        if (block != null)
        {
           block.Rename(newname);
        }
        // @ Check 
        return;
    }
    if ( cmd.includes("savelib")) 
    {
        SaveLibraryAsTextFile();
        return;
    }
    if ( cmd.includes("savemap")) 
    {
        SaveMap();
        return;
    }
     if ( cmd.includes("save")) 
    {
        SaveProject();
        return;
    }
    if ( cmd.includes("load")) 
    {
       $('#input-file').trigger('click');
        return;
    }
    if ( cmd.includes("seti ")) 
    {
      
        var count = cmd.replaceAll("seti","");
        var block = GetBlockByID(ide.BlockID);
        if (block != null)
        {
            block.SetInputCount(parseInt(count));
        }
        return;
    }
     if ( cmd.includes("seto ")) 
    {
      
        var count = cmd.replaceAll("seto","");
        var block = GetBlockByID(ide.BlockID);
        if (block != null)
        {
            block.SetOutputCount(parseInt(count));
        }
        return;
    }
}