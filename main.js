
// TODO ADD EASIER TO UNDERSTANT DISPLAY....
class DisplayConfig
{
    constructor()
    {
        // @ General Height ratio as % of windows inner height.
        
        this.ToolBarHeight;
        this.ThumbnailsHeight;
        this.EditorHeight;
        this.CodeEditorHeight;
        this.PromptHeight;
        
        // @ Blocks visual parameters
        this.BlockFontName = "Autopia";
        this.BlockFontSize = 16;
        this.BlockFont = "16px Autopia";
        this.BlockFontWidth = 9;
        this.BlockFillColor = 'rgb(255,255,255)';
        this.BlockHighLightColor = 'rgb(0,0,255)';
        this.BlockStrokeColor = 'rgb(0,0,0)';
        this.BlockBorderWidth = 3;
        this.WireColor = 'rgb(0,0,0)';
        this.WireWidth = 1;
        
        // @ UI parameters 
        
        // Onglets parameters. Add -> Default max width 
        this.OngletsFillColor = 'rgb(0,0,0)';
        this.OngletsStrokeColor = 'rgb(255,255,255)';
        this.OngletsHighLightColor = 'rgb(0,0,255)';
        this.OngletsPassLightColor = 'rgb(50,50,50)';
        
        this.OngletsFontName = "Courier";
        this.OngletsFontSize = 16;
        this.OngletsFont = "bold 16px Fontlab";
        
        // @ ToolBar
        
        // @ DropDown
        this.DropDownWidth = 200;
        this.DropDownHeight;
        
        this.DropDownFont = "bold 18px Fontlab";
        this.DropDownFontSize = 18;
        this.DropDownFontName = "Fontlab";
        
        this.DropDownStrokeColor = 'rgb(0,0,0)';
        this.DropDownFillColor = 'rgb(255,255,255)';
        this.DropDownHighlightColor = 'rgb(0,0,255)';
        
        // @ Prompt Color 
        this.PrompterFillColor = 'rgb(0,0,0)';
        this.PrompterStrokeColor = 'rgb(255,255,255)';
        this.PrompterHighlightColor = 'rgb(0,0,255)';
        this.PrompterFont = "bold 22px Fontlab";
        this.PrompterFontSize = 22;
        this.PrompterFontName = "Fontlab"
        
    
    }
    UpdateFontsSize()
    {
            // default : width : 1920 height : 927
        this.DropDownFont = "bold 18px Fontlab";
        this.PrompterFont = "bold 20px Fontlab";
        this.OngletsFont = "bold 16px Fontlab";
    }
    SetDefaultProportionFromScreenDimension()
    {
        var heightdim = 10;
        this.ToolBarHeight    = Math.round(3/100 * (window.innerHeight-heightdim));
        this.ThumbnailsHeight = Math.round(4/100 *  (window.innerHeight-heightdim));
        this.EditorHeight     = Math.round(62/100 *  (window.innerHeight-heightdim));
        this.CodeEditorHeight = Math.round(26/100 *  (window.innerHeight-heightdim));
        this.PromptHeight     = Math.round(4/100 *  (window.innerHeight-heightdim));
        this.DropDownHeight   = Math.round(3/100 *  (window.innerHeight-heightdim));
    }
    
    SetBlockFont(fontSize, fontName)
    {
        this.BlockFontName = fontName;
        this.BlockFontSize = fontSize;
        this.BlockFont = fontSize+"px "+fontName;
        this.BlockFontWidth = 9;
    }
    SetThumbnailFont(fontSize, fontName)
    {
        this.OngletsFontName = fontName;
        this.OngletsFontSize = fontSize;
        this.OngletsFont = fontSize+"px "+fontName;
    }
    SetNightMode()
    {
        this.BlockFontName = "Autopia";
        this.BlockFontSize = 16;
        this.BlockFont = "16px Autopia";
        this.BlockFillColor = 'rgb(0,0,0)';
        this.BlockHighLightColor = 'rgb(0,0,255)';
        this.BlockStrokeColor =  'rgb(255,255,255)';
        this.BlockBorderWidth = 3;
        this.WireColor = 'rgb(255,255,255)';
        this.WireWidth = 1;
    }
    GetHeightFromPourcentage(prct)
    {
        return Math.round((prct/100)* (window.innerHeight-40));
    }
}

var VisualParameters;

async function Boot()
{
    // @ Load stuff
    LoadFont();

    
    // @ Init All Objects
    VisualParameters = new DisplayConfig(); 
    ToolBar = new DropDownMenu(GetDefaultToolMap()); 
    setInterval(function () {ToolBar.Run()}, 10);
    
    Editor = new PatchEditor();
    ide = new IDE();
    
    // @ Init prompter
    prompt = new Prompter();
    
    // @ Set up screens
    ScreenCanvas = CreateCanvas(0,0,0,0);
    ScreenCanvas.general.addEventListener('dblclick', function (e) {OpenCloseMiniScreen();});
    OutputCanvas = ScreenCanvas;
    // @ miniscreen : 
    miniScreenCanvas = CreateCanvas(0,0,0,0);
    miniScreenCanvas.Opened = false;
    miniScreenCanvas.bordersize = 20;
    miniScreenCanvas.general.addEventListener('dblclick', function (e) {OpenCloseMiniScreen();});
    miniScreenCanvas.general.addEventListener("mousedown", OnMiniScreenMousePressed, false);
    
    
    Documentation = new DocumentationDisplay(ScreenCanvas);
    // @ Add window event listener
    document.getElementById('input-file').addEventListener('change', getFile);
    window.onresize = UpdateCanvasDimension;
    
    // @ Set default ratio
    ResizeScreenEditorRatio(window.innerWidth/2);

    // Web 3
    InitEthereumNetwork();
    InitTezosNetwork();
    SwitchToTezosNetwork("jakartanet");
    

    await LoadUpdatedLib();
    //@ Load Default Project
    await LoadExampleProject("visual/simple drawer.map");
     // OpenLibrary
    Documentation.Open("vanilla.lib");
    
    // Set PlayMode
    Editor.inPlayMode = false;
    
    //@ Start core loop
    setInterval(RunSystem, 10);
       
}


var FontUniqueIdentifier = 0;

async function LoadFontFromFile(file)
{
    const data = await file.arrayBuffer();
    var font = new FontFace('font'+FontUniqueIdentifier, data);
    await font.load();
    document.fonts.add(font);
    FontUniqueIdentifier ++;
    console.log(document.fonts)
  
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
 
    
   if ( miniScreenCanvas.Opened)
       RunMiniScreen();
   
     // @ Display Lib if doc opened 
   if ( Documentation.Opened)
   {
       Documentation.Run();
   }
     // @ Display/Run Editor
    Editor.Run();
    
   
}

function ResizeScreenEditorRatio(screenwidth)
{
    var cehide = ide.hide;
    if ( ide.hide)
        ide.UnHide();
    VisualParameters.SetDefaultProportionFromScreenDimension();
    ToolBar.SetDImension(new Box(0,0,screenwidth, VisualParameters.ToolBarHeight));
    // @ Resizing Screen
    ScreenCanvas.box = new Box(0,ToolBar.Canvas.box.h,ToolBar.Canvas.box.w, window.innerHeight - ToolBar.Canvas.box.h - 20);
    ScreenCanvas.SetPositionAndDimension();
    ScreenCanvas.ForceFill('rgb(0,0,0)');
    
    // @ Proccess Mini Screen
    //if ( miniScreenOpened)
    //    ForceResetMiniScreenPosition();
    
    Editor.SetExplorerDimension(new Box(screenwidth+10, 0, window.innerWidth - ScreenCanvas.box.w - 20 ,VisualParameters.ToolBarHeight));
    Editor.SetPatchDimension(new Box( screenwidth+10, Editor.WindowExplorer.Canvas.box.h, Editor.WindowExplorer.Canvas.box.w-10 , VisualParameters.EditorHeight))
    Editor.WindowExplorer.Draw();
    // @ Resizing Ide
    ide.SetExplorerDimension( new Box(Editor.Canvas.box.x, Editor.Canvas.box.y+Editor.Canvas.box.h, Editor.Canvas.box.w, VisualParameters.ThumbnailsHeight));
    ide.SetEditorDimension( new Box( Editor.Canvas.box.x, ide.CodeExplorer.Canvas.box.y + ide.CodeExplorer.Canvas.box.h, Editor.Canvas.box.w, VisualParameters.CodeEditorHeight));
    ide.CodeExplorer.Draw();
    // @ Resizing Prompt
    prompt.Canvas.box = new Box(Editor.Canvas.box.x,ide.Canvas.box.y+ide.Canvas.box.h,Editor.Canvas.box.w, VisualParameters.PromptHeight);
    prompt.Canvas.SetPositionAndDimension();
    
    // @recompute bouton relative if library opened 
    if ( cehide ) 
        ide.Hide();
    if ( Documentation.Opened)
        Documentation.ComputeYScrollingRatio();
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
    ToolBar.SetSelection(-1);
    divFocus = 1;
}
function SetFocusOnIDE()
{
     ToolBar.SetSelection(-1);
     divFocus = 2;
}
function SetFocusOnPrompt()
{
     ToolBar.SetSelection(-1);
     divFocus = 3;
}
function SetFocusOnScreen()
{
    // @ Clear 
     ToolBar.SetSelection(-1);
     divFocus = 4;
}

var mouseAccuracyCanvas = null;

function CreateMouseAccuracyCanvas()
{
    if ( mouseAccuracyCanvas == null )
    {
        mouseAccuracyCanvas = CreateCanvas(0,0,0,0);
        mouseAccuracyCanvas.general.onmousedown = function(){SetMouseAccuracy();};
    }
    mouseAccuracyCanvas.box = new Box (ScreenCanvas.box.w/4, ScreenCanvas.box.h/4, window.innerHeight /2, window.innerHeight /2);
    mouseAccuracyCanvas.focusPosition = 999;
    mouseAccuracyCanvas.SetPositionAndDimension();
    DrawMouseAccuracy();
   
    // Add some listener
   
  
}
function DrawMouseAccuracy()
{
     var _g = mouseAccuracyCanvas.context;
        // Fill
    _g.fillStyle = 'rgb(0,0,0)'; 
    _g.fillRect(0,0,mouseAccuracyCanvas.box.w, mouseAccuracyCanvas.box.h);  
    
    // Circle
    _g.strokeStyle = 'rgb(255,255,255)'; 
    _g.lineWidth = 3;
    var centerx = mouseAccuracyCanvas.box.w/2;
    var centery = mouseAccuracyCanvas.box.h/2;
    var rad = 10;
    _g.beginPath();
    _g.arc(centerx, centery, rad, 0, 2* Math.PI, false);
    _g.stroke();
    _g.closePath();
    
    //Cross
    _g.lineWidth = 3;
        
        // First line 
    _g.beginPath();
    _g.moveTo(0, mouseAccuracyCanvas.box.h/2);
    _g.lineTo(mouseAccuracyCanvas.box.w, mouseAccuracyCanvas.box.h/2);
    _g.closePath();
    _g.stroke();
    // First line 
    _g.beginPath();
    _g.moveTo(mouseAccuracyCanvas.box.w/2, 0);
    _g.lineTo(mouseAccuracyCanvas.box.w/2, mouseAccuracyCanvas.box.h);
    _g.closePath();
    _g.stroke();
}
function SetMouseAccuracy()
{
    var mX = mouseX + cursorDimension.x;
    var mY = mouseY + cursorDimension.y;
    cursorDimension = new Vector2(mX-mouseAccuracyCanvas.box.x-mouseAccuracyCanvas.box.w/2, 
                                 mY-mouseAccuracyCanvas.box.y-mouseAccuracyCanvas.box.h/2);
     mouseAccuracyCanvas.box = new Box (0,0,0,0);
     mouseAccuracyCanvas.focusPosition = 999;
     mouseAccuracyCanvas.SetPositionAndDimension();
    prompt.AddEventText("mouse calibration set to X"+cursorDimension.x + " Y"+cursorDimension.y);
}


