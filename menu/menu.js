
class gExplorer{ //< a ajouter
    
       constructor(){
        this.general;
        this.context;
        this.priority;
        this.content;
        this.top;
        
    }  
}

class gMenu{
 constructor(Comp,Dev, Temp){
        this.component = Comp;
        this.developMenu = Dev; // le menu a l'interieur du menu ... 
        this.template = Temp; // le template qu'il ouvre !! 
        
    }  
}

class Point
{
    constructor(x,y)
    {
        this.X = x;
        this.Y = y;
    }
}


var explorer;
var lastMenu =  new Point(-1,-1);
var mouseoverMenu;
var explorerGlyphes;
var MenuMap; // < le menu initial
var mousePressedOnMenu = false;

// @ Some parameters for Presentation ...
var explorerFontsize =16;
var explorerBoxInterval;
var explorerFont; //< a changer ...
var menuWidth; // set automatically
var highlightcolor = 'rgb(0, 0, 255)';
var fillcolor = 'rgb(255, 255, 255)';


function InitProceduralExplorer(){ //< reint
   setupMenuMap();
   scaleMenu();
   explorer = new Array();
   setInterval(UIex,10);
}


function LoadMenuMaps()
{
    SetUpFileMap();
    SetUpEditMap();
    SetUpNavMap();
    SetUpW3Map();
    SetUpHelpMap();
}
var FileMenuMap;
var EditMenuMap;
var NavMenuMap;
var HelpMenuMap;
var web3Map;

function SetUpFileMap()
{
     var EXContent = new Array();
     EXContent.push(new gMenu("simple drawer",null, "LoadExampleProject('simpledrawer')" ));
     EXContent.push(new gMenu("simple logic ",null, "LoadExampleProject('simplelogic')"));
     EXContent.push(new gMenu("blockchain demo",null, "LoadExampleProject('blockchain')"));
     EXContent.push(new gMenu("sound demo",null, "LoadExampleProject('sounddemo')"));
     EXContent.push(new gMenu("graph example",null, "LoadExampleProject('graphdemo')"));
     EXContent.push(new gMenu("tab example",null, "LoadExampleProject('tabdemo')"));
    
     var SAVEASContent = new Array();
     SAVEASContent.push(new gMenu(".lib",null, "SaveLibraryAsTextFile();", ));
     SAVEASContent.push(new gMenu(".map",null, "SaveMap()"));
     SAVEASContent.push(new gMenu(".html",null, "")); //<---- TODO
    
     var maincontent = new Array();
     maincontent.push(new gMenu("new", null, "LoadNewProject();"));
     maincontent.push(new gMenu("example", EXContent, ""));
     maincontent.push(new gMenu("save", null, "SaveProject();"));
     maincontent.push(new gMenu("save as", SAVEASContent, ""));
     maincontent.push(new gMenu("open", null, "importing = false ; $('#input-file').trigger('click');"));
     maincontent.push(new gMenu("import", null, "importing = true ; $('#input-file').trigger('click');"));

     // ??? add some backup here too ... like backup image or stuff 
     FileMenuMap = maincontent;
}
function SetUpEditMap()
{
     var LOGICContent = new Array();
     LOGICContent.push(new gMenu("bang", null, "CreateSpecificBlock('bang', EditorCanvas.box.w/2, EditorCanvas.box.h/2);"));
     LOGICContent.push(new gMenu("switch",null, "CreateSpecificBlock('switch', EditorCanvas.box.w/2, EditorCanvas.box.h/2);"));
    
     var GRContent = new Array();
     GRContent.push(new gMenu("slider", null, "CreateSpecificBlock('slider', EditorCanvas.box.w/2, EditorCanvas.box.h/2);"));
     GRContent.push(new gMenu("knob",null, "CreateSpecificBlock('knob', EditorCanvas.box.w/2, EditorCanvas.box.h/2);" ));
     GRContent.push(new gMenu("graph",null, "CreateSpecificBlock('graph', EditorCanvas.box.w/2, EditorCanvas.box.h/2);"));
     GRContent.push(new gMenu("display",null, "CreateSpecificBlock('display', EditorCanvas.box.w/2, EditorCanvas.box.h/2);"));
    
     var CREATEContent = new Array();
     CREATEContent.push(new gMenu("new                         [n]", null, "CreateSpecificBlock(' new ', EditorCanvas.box.w/2, EditorCanvas.box.h/2)"));
     CREATEContent.push(new gMenu("logic",LOGICContent, "", ));
     CREATEContent.push(new gMenu("graphic",GRContent, ""));
    
     var EXcontent = new Array();
     EXcontent.push(new gMenu("compile window", null, "prompt.AddEventText(TryCompileWindow(Windows[0]))"));
    
     var maincontent = new Array();
     maincontent.push(new gMenu("create", CREATEContent, ""));
     maincontent.push(new gMenu("experimental", EXcontent, ""));
     maincontent.push(new gMenu("edition mode", null, "document.body.style.cursor = 'default';inPlayMode = false;")); // + do smthing
     maincontent.push(new gMenu("play mode", null, "document.body.style.cursor ='pointer';inPlayMode = true;"));    // + do smthing
     EditMenuMap = maincontent;
}

function SetUpNavMap()
{
    var WINcontent = new Array();
    WINcontent.push(new gMenu("new", null, "AddNewWindow('win'+GetWindowsCount().toString());"));
    WINcontent.push(new gMenu("open all", null, "OpenAllWindows()"));
    WINcontent.push(new gMenu("close all", null, "CloseAllWindows()"));
    
     var SCRcontent = new Array();
    SCRcontent.push(new gMenu("open all", null, "OpenAllIDETabs()"));
    SCRcontent.push(new gMenu("close all", null, "CloseAllIDETabs()"));
    
    var maincontent = new Array();
    maincontent.push(new gMenu("window", WINcontent, ""));
    maincontent.push(new gMenu("script", SCRcontent, ""));
    NavMenuMap = maincontent;
}
function SetUpW3Map()
{
    var ETHcontent = new Array();
    ETHcontent.push(new gMenu("mainnet", null, "SwitchToEthereumNetwork('main')"));
    ETHcontent.push(new gMenu("ropsten", null, "SwitchToEthereumNetwork('ropsten')"));
    ETHcontent.push(new gMenu("rinkeby", null, "SwitchToEthereumNetwork('rinkeby')"));
    ETHcontent.push(new gMenu("kovan", null, "SwitchToEthereumNetwork('kovan')"));
    ETHcontent.push(new gMenu("goerli", null, "SwitchToEthereumNetwork('goerli')"));
    
    var TEZcontent = new Array();
    TEZcontent.push(new gMenu("mainnet", null, "SwitchToTezosNetwork('main')"));
    TEZcontent.push(new gMenu("ithacanet", null, "SwitchToTezosNetwork('ithacanet')"));
    TEZcontent.push(new gMenu("jakartanet", null, "SwitchToTezosNetwork('jakartanet')"));
    
    var NETcontent = new Array();
    NETcontent.push(new gMenu("ethereum", ETHcontent, ""));
    NETcontent.push(new gMenu("tezos", TEZcontent, ""));
    
    var SCcontent = new Array();
    SCcontent.push(new gMenu("configure", null, "var addr = originalPrompt('Contract Address:');if ( Network == Ethereum ){ if ( LoadedABI == null ) { prompt.AddEventText('ABI NOT LOADED');return;} ;Network.LoadContract(addr,LoadedABI );} else { Network.LoadContract(addr);}")); 

    SCcontent.push(new gMenu("get editor", null, "if ( Network == Ethereum ){window.open('https://remix.ethereum.org/', '_blank');} else {window.open('https://ide.ligolang.org/', '_blank');} ")); 
    SCcontent.push(new gMenu("load ABI", null, "$('#input-file').trigger('click');")); 
    
    var WALLcontent = new Array();
    WALLcontent.push(new gMenu("authentificate", null, "prompt.AddEventText('Not available. Wait for future update')")); 
    WALLcontent.push(new gMenu("about", null, "prompt.AddEventText('Not available. Wait for future update')")); 
    WALLcontent.push(new gMenu("get faucet", null, "prompt.AddEventText('Not available. Wait for future update')")); 
    
    var maincontent = new Array();
    maincontent.push(new gMenu("network", NETcontent, ""));
    maincontent.push(new gMenu("smartcontract", SCcontent, ""));
    maincontent.push(new gMenu("wallet", WALLcontent, ""));
    web3Map = maincontent;
}
function SetUpHelpMap()
{
    var maincontent = new Array();
    maincontent.push(new gMenu("library                     [$]", null, "if (!UserReadLibrary){OpenDoc();}else{CloseDoc();}"));
    maincontent.push(new gMenu("git", null, ""));
    maincontent.push(new gMenu("mouse calibration", null, "CreateMouseAccuracyCanvas()"));
    maincontent.push(new gMenu("about", null, ""));
   
    HelpMenuMap = maincontent;
}

// Default Map
function setupMenuMap(){
   
    var maincontent = new Array();
    maincontent.push(new gMenu("about", null, null));
    MenuMap = maincontent;
    
}

function explorerFunction(act){
     mousePressedOnMenu = false;
     DestroyallMenu();
     eval("(async () => {"+act+"})()");
    
}

function add_stamps_to_mapmenu(i){ // < donc TS system ok 
    return;
    var s = "TS:"+i.toString();
    var name = "img:0+stamp #" +i.toString();  
    var randomplacement = Math.floor(Math.random() * MenuMap.length); 
    MenuMap.splice(randomplacement, 0, new gMenu(name, null, s));
    
}


function scaleMenu(){
        
   var min  = 250; // 250
   var max = 520; //415
   var pcsscale =   window.innerWidth / 1920; 
   scExplorer = pcsscale * max;
    
    if ( scExplorer < min ){
        scExplorer =  min ; 
    }
    if ( scExplorer > max ){
        scExplorer = max ; 
    }
  
   menuWidth = scExplorer / 2; 

  
    explorerBoxInterval = scExplorer / 20;
    explorerFontsize = scExplorer / 25;
    explorerFont = "bold "+explorerFontsize.toString()+'px Courier';
}



function CreateMenu(x,y,content){

    if ( menuWidth == 0 )
    {
        scaleMenu();
    }
    explorer.push(new gExplorer());
    var i = explorer.length - 1;
    explorer[i].priority = i;
    
   var getform = document.getElementById('explorer');
   var newDiv = document.createElement("div");
   newDiv.id = "d"+i.toString();
   newDiv.style = "position:absolute; top:"+y.toString()+"px; left:"+x.toString()+"px; z-index:1000";
   var canv = document.createElement('canvas');
   canv.id = 'menu'+i.toString();
   canv.width = 0;
   canv.height = 0;
   
   getform.appendChild(newDiv); 
   newDiv.appendChild(canv);
   explorer[i].general = document.getElementById('menu'+i.toString());
   explorer[i].context = explorer[i].general.getContext('2d');
   explorer[i].general.width = menuWidth;
   explorer[i].content = content;
    
    // add a mouse pressed stuff 
    canv.onmousedown = function(){mousePressedOnMenu = true;console.log("on menu");};
    canv.onmouseup = function(){mousePressedOnMenu = false;console.log("not on menu");};

   explorer[i].general.height = content.length*explorerBoxInterval;
          
   explorer[i].context.font = 'bold '+explorerFontsize.toString()+'px Courier';;
   explorer[i].top = new Point(x,y);
   
}

function indexDestroyMenu(i,cond){
    
    var offset = 0;
    if ( cond == true ){
        offset = 2;
    }
    else{
        offset = 1;
    }
    var bakex = explorer;
    explorer = new Array();
    var n ;
    for ( n = 0 ; n < i+offset; n ++ ){
    explorer.push(bakex[n]);
    }
    for ( n = i +offset ; n < bakex.length; n++ ){
           document.getElementById("menu"+n.toString()).remove();
    document.getElementById('d'+n.toString()).remove();
    }
  
     
    
}

function DestroyallMenu(){
    var baksize = explorer.length;
      explorer = new Array();
    var n;
     for ( n = 0 ; n < baksize; n++ ){
     document.getElementById("menu"+n.toString()).remove();
     document.getElementById('d'+n.toString()).remove();
    }
    ToolBar.dropselected = -1;
}
function UIex(){
    var i ; 
    mouseoverMenu= -1;
    for ( i = 0 ; i < explorer.length; i++ ){
        explorer[i].context.clearRect(0,0,explorer[i].general.width,explorer[i].general.height);
        explorer[i].context.fillStyle = fillcolor;
        explorer[i].context.fillRect(0,0,explorer[i].general.width,explorer[i].general.height);
        
        // do square its better 
        explorer[i].context.lineWidth = 2;
        explorer[i].context.strokeStyle = 'rgb(0,0,0)';
        explorer[i].context.strokeRect(0,0,explorer[i].general.width,explorer[i].general.height);
        /*
        explorer[i].context.beginPath();
        explorer[i].context.moveTo(explorer[i].general.width,0);
         explorer[i].context.lineTo(explorer[i].general.width,explorer[i].general.height);
        explorer[i].context.moveTo(explorer[i].general.width,explorer[i].general.height);
        explorer[i].context.lineTo(0,explorer[i].general.height);
         explorer[i].context.stroke();
        explorer[i].context.closePath();
        */
        var n;
        for ( n = 0 ; n < explorer[i].content.length ; n++ ){
         var abox = new Box(0,n*explorerBoxInterval,explorer[i].general.width,explorerBoxInterval);
         if ( mouseX > explorer[i].top.X && mouseX < explorer[i].top.X + abox.w
         && mouseY >= explorer[i].top.Y + abox.y && mouseY <= explorer[i].top.Y + ( abox.y + abox.h )
         ){
             mouseoverMenu= i;
             var mousepressed = mousePressedOnMenu;
               if ( mousepressed == true && explorer[i].content[n].developMenu == null ){
                   mousepressed = false;
                   explorerFunction(explorer[i].content[n].template); // ok !
                   return;
               }
             
        if ( i != explorer.length - 1 ){
            if ( i != explorer.length - 2 ){
                indexDestroyMenu(i, false);
            }
            else{
                if (  i == lastMenu.X && n == lastMenu.Y ) {
                      indexDestroyMenu(i, true);   
                }
                else{
                    indexDestroyMenu(i, false); 
                }
            }
        }
        if ( explorer[i].content[n].developMenu != null && i == explorer.length - 1){
         
               lastMenu = new Point(i,n);
            CreateMenu(explorer[i].top.X + abox.w,  explorer[i].top.Y + ( abox.y ), explorer[i].content[n].developMenu);
     
        }
            explorer[i].context.fillStyle = highlightcolor;
            explorer[i].context.fillRect(abox.x ,abox.y , abox.w,abox.h);
             
       if ( !explorer[i].content[n].component.includes("img:")) {
           explorer[i].context.fillStyle = 'rgb(255, 255, 255)';
           explorer[i].context.fillText(explorer[i].content[n].component, abox.x + (explorerBoxInterval/7),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
          if ( explorer[i].content[n].develop == true ){
                    explorer[i].context.fillText("+", abox.w - ((explorerBoxInterval/7)*4),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               }
       }
       else{
            explorer[i].context.fillStyle = 'rgb(255, 255, 255)';
           var glypheindex = explorer[i].content[n].component.split(':');
           if ( !glypheindex[1].includes('+')){
           glypheindex = parseInt(glypheindex[1]) + 1;
           explorer[i].context.drawImage(explorerGlyphes[glypheindex], abox.x ,abox.y ,abox.w,abox.h);
                  if ( explorer[i].content[n].develop == true ){
                    explorer[i].context.fillText("+", abox.w - ((explorerBoxInterval/7)*4),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               }
           }
           else{
              glypheindex = glypheindex[1].split('+');
              var sglyphe = glypheindex[1];
              glypheindex = parseInt(glypheindex[0]) + 1;
              explorer[i].context.drawImage(explorerGlyphes[glypheindex], abox.x ,abox.y ,abox.w,abox.h);
              explorer[i].context.fillText( sglyphe, abox.x + (explorerBoxInterval/7),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               if ( explorer[i].content[n].develop == true ){
                    explorer[i].context.fillText("+", abox.w - ((explorerBoxInterval/7)*4),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               }
             
           }
           
       }
             
          }
         else{
             
       if ( !explorer[i].content[n].component.includes("img:")) {
           explorer[i].context.fillStyle = 'rgb(0, 0, 0)';
           explorer[i].context.fillText(explorer[i].content[n].component, abox.x + (explorerBoxInterval/7),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
       if ( explorer[i].content[n].develop == true ){
                    explorer[i].context.fillText("+", abox.w - ((explorerBoxInterval/7)*4),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               }
       }
       else{
            explorer[i].context.fillStyle = 'rgb(0, 0, 0)';
           var glypheindex = explorer[i].content[n].component.split(':');
           if ( !glypheindex[1].includes('+')){
           glypheindex = parseInt(glypheindex[1]);
           explorer[i].context.drawImage(explorerGlyphes[glypheindex], abox.x ,abox.y ,abox.w,abox.h);
                  if ( explorer[i].content[n].develop == true ){
                    explorer[i].context.fillText("+", abox.w - ((explorerBoxInterval/7)*4),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               }
           }
           else{
              glypheindex = glypheindex[1].split('+');
              var sglyphe = glypheindex[1];
              glypheindex = parseInt(glypheindex[0]);
              explorer[i].context.drawImage(explorerGlyphes[glypheindex], abox.x ,abox.y ,abox.w,abox.h);
              explorer[i].context.fillText( sglyphe, abox.x + (explorerBoxInterval/7),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
                if ( explorer[i].content[n].develop == true ){
                    explorer[i].context.fillText("+", abox.w - ((explorerBoxInterval/7)*4),abox.y + explorerBoxInterval - (explorerBoxInterval/7));
               }
           }
           
       }
             
             
         }
            
        }
    
    }
 
}



