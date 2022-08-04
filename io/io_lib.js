// IO
async function LoadUpdatedLib()
{
    $.ajax({
        url : "example/vanilla.lib",
        dataType: "text",
        async:false,
        success : function (data) 
        {
            var txt = data.toString().split("\r\n");
            LoadLibraryFromTextFile(txt);
        }
        });
        
}
function GetLibraryDataAsText()
{
    // Save All Entries as binary
    var text = new Array();
    // Save Entries Number 
    text.push(Library.length + "\r\n")
    // Save all entries
    var i; 
    for ( i = 0 ; i< Library.length; i++ )
    {
         text.push(Library[i].typename + "\r\n"); 
         text.push(Library[i].NativeScript.length + "\r\n"); 
         var n;
         for (n = 0 ; n < Library[i].NativeScript.length; n++)
             text.push(Library[i].NativeScript[n] + "\r\n"); 
           
    }
    return text;
}
function SaveLibraryAsTextFile()
{
    var blob = new Blob(GetLibraryDataAsText());
    saveAs(blob, new Date().getTime().toString()+".lib");
    prompt.AddEventText("saving .lib")
}

function LoadLibraryFromTextFile(text)
{
    // Load All Entries as text file
    if ( !importing)
        Library = new Array();
    
    // @ Get entries length 
    var entryLength = parseInt(text[0]);
    var i;
    var linectr = 1;
    for (i = 0 ; i < entryLength; i++)
    {
        var tname = text[linectr];linectr++;
        var sc    = new Array();
        var sclength = parseInt(text[linectr]);linectr++;
        var n;
        for (n = 0 ; n < sclength; n++)
        {
            sc.push(text[linectr]); 
            linectr++;
        }
        //@ find conflicting library if typename already exists in library
        if ( !IsEntryAlreadyExists(tname))
            Library.push(new LibraryEntry(tname,sc));  
    }
    //@ refresh all blocks code
    var i; 
    for (i= 0; i < Blocks.length; i++)
        TryLoadBlockFromLibraryEntries(Blocks[i]);
    prompt.AddEventText(".lib successfully loaded")

    return linectr;
}