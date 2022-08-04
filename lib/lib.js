class LibraryEntry
{
    constructor(TypeName, nativeScript)
    {
        this.typename = TypeName;
        this.NativeScript = nativeScript;
    }
}

var Library = new Array(); // array of LibraryEntry 

// This function is called when bloc name is changed 
function TryLoadBlockFromLibraryEntries(bloc)
{
    // we should do some sanity here by removing empty space and lower case  
    var i;
    for ( i = 0 ; i < Library.length; i++)
    {
        if ( Library[i].typename == bloc.typename)
        {
            // Entry was found. Copy Library data then reset block.
            bloc.NativeScript = Library[i].NativeScript;
            InterpreteBlockCode(bloc); 
            bloc.R();
            return;
        }
    }
    // Do we create new Entry if declar & method are not empty string ?
    return; 
}

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

