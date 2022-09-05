function InterpreteBlockCode(block)
{
   var r = InterpreteNative(block.NativeScript);
   block.declar = r[0];
   block.methods = r[1];
}

function InterpreteNative(nativescript)
{
    var declar = GetDeclarationRegion(nativescript);
    var method = GetCodeRegion(nativescript);
    
    var declregion = ProccessPseudoRN(declar); // Get Back Array 
    var coderegion = ProccessPseudoRN(method); // Get Back Array 
    
    declar = InterpreteRegion(declregion);
    method = InterpreteRegion(coderegion);
        
    var methods = GetIPFCodeRegions(nativescript);
    if ( methods.length == 0)
        methods.push(method);
    else
        methods[0] = method;
    
    return new Array(declar, methods);
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

function GetDeclarationRegion(nativescript)
{
     // @ Get Lines Between --decl
    return GetTextInsideLabel("--decl", "--", nativescript)
}
function GetCodeRegion(nativescript)
{
    // @ Get Lines Between --code
    return GetTextInsideLabel("--code", "--", nativescript)
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
    // parse OUT()
    r = ParseOUT(r);
    return r; 
    
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
            console.log("MEM WAS FOUND AND ARG IS " + arg);
            
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
            console.log("OUT WAS FOUND -> COMPORT IS " + comport +" and ARG IS " + arg);
            
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