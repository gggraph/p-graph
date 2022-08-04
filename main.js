
async function Boot()
{
  
    // @ Load stuff
    LoadFont();
    document.getElementById('input-file').addEventListener('change', getFile);
    window.onresize = UpdateCanvasDimension;
    
    // @ Set up editor
    InitEditorCanvas();
    //@ Set up screen
    InitScreenCanvas();
    // Set Up CodeEditor
    InitPrompt();
    InitIDECanvas();
    // @ Set up thumbnails 
    InitIDEThumbnails();
    InitWDWThumbnails();
    AddNewWindow("default"); 
    //@set up explorer
    InitProceduralExplorer();
    //@set up tool bar for test ...
    InitToolBar();
    ResizeScreenEditorRatio(window.innerWidth/2);
    
    // Web 3
    InitEthereumNetwork();
    InitTezosNetwork();
    SwitchToTezosNetwork("ithacanet");
    

      //@ Load Default Project
    await LoadExampleProject("blockchain");
   
    // Set PlayMode
    document.body.style.cursor = "pointer";inPlayMode = true;
    await LoadUpdatedLib();
    
    // OpenLibrary
    OpenDoc();
    
    //@ Start core loop
    setInterval(RunSystem, 10);
   
}


function LoadFont(){

    return;
      var newStyle = document.createElement('style');
       newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: Fontlab;\
    src: url('fonts/fontlab-webfont.ttf') format('ttf');\
}\
"));
      newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: Autopia;\
    src: url('fonts/Autopia-Bold.ttf') format('ttf');\
}\
"));
      newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: Autopia;\
    src: url('fonts/Autopia-Bold-Italic.ttf') format('ttf');\
}\
"));
  
}

function RunSystem()
{
 
   if ( miniScreenOpened)
       UpdateMiniScreenPositionAndDimension();
    // @ Display/Run Editor
    RunEditor();
    
    // @ Display Lib if doc opened 
   if ( UserReadLibrary)
   {
       DisplayDocumentation();
   }
}

function ResizeScreenEditorRatio(screenwidth)
{
    DestroyallMenu();
    scaleMenu();
    // @Toolbar
    ToolBar.Canvas.box =new Box(0,0,screenwidth, explorerBoxInterval);
    ToolBar.Canvas.SetPositionAndDimension();
    ToolBar.Blank();
    ToolBar.Display();
    // @ Resizing Screen
    ScreenCanvas.box = new Box(0,ToolBar.Canvas.box.h,ToolBar.Canvas.box.w, window.innerHeight - ToolBar.Canvas.box.h - (window.innerHeight/20));
    ScreenCanvas.SetPositionAndDimension();
    var backupstyle = ScreenCanvas.context.fillStyle;
    ScreenCanvas.context.fillStyle = 'rgb(0,0,0)';
    ScreenCanvas.Fill();
    ScreenCanvas.context.fillStyle = backupstyle;
    // @ Proccess Mini Screen
    if ( miniScreenOpened)
        ForceResetMiniScreenPosition();
     // @ Resizing Editor
    EditorCanvas.box = new Box(screenwidth ,0,window.innerWidth - ScreenCanvas.box.w - 10, window.innerHeight - (window.innerHeight/20));
    EditorCanvas.SetPositionAndDimension();
    // @ Resizing Prompt
    prompt.Canvas.box = new Box(EditorCanvas.box.x,(window.innerHeight-window.innerHeight/24-20),EditorCanvas.box.w, window.innerHeight/24 );
    prompt.Canvas.SetPositionAndDimension();
      // @ Resizing IDE
     ide.Canvas.box = new Box(  EditorCanvas.box.x, window.innerHeight-window.innerWidth/8-20 - prompt.Canvas.box.h, EditorCanvas.box.w,  window.innerWidth/8); 
     ide.Canvas.SetPositionAndDimension();
     ide.DrawIde();
     ide.DrawScriptText();
     ide.tempBox = ide.Canvas.box;
     ide.UnHideIDE();
    // @ Resizing Thummbnails
    // ide thumbnails
    
    ideThumbnails.Canvas.box = new Box( EditorCanvas.box.x, window.innerHeight-ide.Canvas.box.h-prompt.Canvas.box.h-window.innerHeight/24-20, EditorCanvas.box.w, window.innerHeight/24);
    ideThumbnails.Canvas.SetPositionAndDimension();
    ideThumbnails.Draw();
    windowThumbnails.Canvas.box = new Box( EditorCanvas.box.x, 0, EditorCanvas.box.w, window.innerHeight/24);
    windowThumbnails.Canvas.SetPositionAndDimension();
    windowThumbnails.Draw();
    // @recompute bouton relative if library opened 
    if ( !UserReadLibrary)
        return;
    barheight = ScreenCanvas.box.h / Library.length; 
    barBox = new Box(ScreenCanvas.box.w-30, 0, 30, barheight);
    docRelativeHeight =  docRealHeight;
    docRelativeHeight-=ScreenCanvas.box.h; 
    if ( docRelativeHeight < 0 )
        docRelativeHeight = 0;
}

function UpdateCanvasDimension()
{
     ResizeScreenEditorRatio(window.innerWidth/2);
}

// Some Info about where user interact in DOM element
var divFocus = -1;
function isEditorFocus()
{
    return divFocus == 1;
}

function SetFocusOnEditor()
{
    DestroyallMenu();
    divFocus = 1;
}
function SetFocusOnIDE()
{
     DestroyallMenu();
     divFocus = 2;
}
function SetFocusOnPrompt()
{
     DestroyallMenu();
     divFocus = 3;
}
function SetFocusOnScreen()
{
    // @ Clear 
     DestroyallMenu();
     divFocus = 4;
}


