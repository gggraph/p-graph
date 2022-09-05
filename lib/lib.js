class LibraryEntry
{
    constructor(TypeName, nativeScript, file = "")
    {
        this.typename = TypeName;
        this.NativeScript = nativeScript;
    }
}

var Library = new Array(); // array of LibraryEntry 

// This function is called when bloc name is changed. 
// This load native script to the block if entry was found in library.
function TryLoadBlockFromLibraryEntries(bloc)
{ 
    var i;
    for ( i = 0 ; i < Library.length; i++)
    {
        if ( Library[i].typename == bloc.typename)
        {
            // Entry was found. Copy Library data then reset block.
            bloc.NativeScript = Library[i].NativeScript;
            return;
        }
    }
    // Do we create new Entry if declar & method are not empty string ?
    return; 
}

// Those functions run when code has changed. 
// This update library entry code & force recompile all blocks with the specfic typename
function RefreshNativeScriptFromBlock(bloc)
{
    UpdateNativeScriptForType(bloc.typename, bloc.NativeScript);
}

function UpdateNativeScriptForType(typename, newscript)
{
    // Refresh Library Entry
    var i;
    var entryfound = false;
    for ( i = 0 ; i < Library.length; i++)
    {
        if ( Library[i].typename == typename)
        {
            // Refresh entryScript
            Library[i].NativeScript = newscript;
            entryfound = true;
            break;
        }
    }
    if (!entryfound)
    {
        Library.push(new LibraryEntry(typename, newscript));
    }
    // Refresh all blocks 
    for (i=0; i < Blocks.length; i++)
    {
        if ( Blocks[i].typename == typename)
        {
            Blocks[i].NativeScript = newscript;
            InterpreteBlockCode(Blocks[i]); 
            Blocks[i].R();
        }
        
    }
    
}


// This function is called when reloading library.
function IsEntryAlreadyExists(typename)
{
    var i; 
    for ( i = 0 ; i < Library.length; i++ )
    {
        if ( Library[i].typename == typename)
            return true;
    }
    return false;
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
