
function GetDefaultToolMap()
{

    var Maps = new Array();
    Maps.push(SetUpFileMap());
    Maps.push(SetUpEditMap());
    Maps.push(SetUpNavMap());
    Maps.push(SetUpW3Map());
    Maps.push(SetUpHelpMap());
    return Maps;
}

function SetUpFileMap()
{
     var EXContent = new Array();
     EXContent.push(new MapItem("simple drawer",null, "LoadExampleProject('simple drawer')" ));
     EXContent.push(new MapItem("simple logic ",null, "LoadExampleProject('simple logic')"));
     EXContent.push(new MapItem("blockchain demo",null, "LoadExampleProject('blockchain demo')"));
     EXContent.push(new MapItem("dummy synth",null, "LoadExampleProject('midi synth demo')"));
     EXContent.push(new MapItem("graph example",null, "LoadExampleProject('graph demo')"));
     EXContent.push(new MapItem("tab example",null, "LoadExampleProject('tab demo')"));
    
     var SAVEASContent = new Array();
     SAVEASContent.push(new MapItem(".lib",null, "SaveLibraryAsTextFile();", ));
     SAVEASContent.push(new MapItem(".map",null, "SaveMap()"));
     SAVEASContent.push(new MapItem(".html",null, "")); //<---- TODO
    
     var maincontent = new Array();
     maincontent.push(new MapItem("new", null, "LoadNewProject();"));
     maincontent.push(new MapItem("example", EXContent, ""));
     maincontent.push(new MapItem("save", null, "SaveProject();"));
     maincontent.push(new MapItem("save as", SAVEASContent, ""));
     maincontent.push(new MapItem("open", null, "importing = false ; $('#input-file').trigger('click');"));
     maincontent.push(new MapItem("import", null, "importing = true ; $('#input-file').trigger('click');"));

     // ??? add some backup here too ... like backup image or stuff 
     return new DropDown("File",maincontent);
}
function SetUpEditMap()
{
     var LOGICContent = new Array();
     LOGICContent.push(new MapItem("bang", null, "CreateSpecificBlock('bang', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2);"));
     LOGICContent.push(new MapItem("switch",null, "CreateSpecificBlock('switch', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2);"));
    
     var GRContent = new Array();
     GRContent.push(new MapItem("slider", null, "CreateSpecificBlock('slider', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2);"));
     GRContent.push(new MapItem("knob",null, "CreateSpecificBlock('knob', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2);" ));
     GRContent.push(new MapItem("graph",null, "CreateSpecificBlock('graph', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2);"));
     GRContent.push(new MapItem("display",null, "CreateSpecificBlock('display', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2);"));
    
     var CREATEContent = new Array();
     CREATEContent.push(new MapItem("new                         [n]", null, "CreateSpecificBlock(' new ', Editor.Canvas.box.w/2, Editor.Canvas.box.h/2)"));
     CREATEContent.push(new MapItem("logic",LOGICContent, "", ));
     CREATEContent.push(new MapItem("graphic",GRContent, ""));
    
     var EXcontent = new Array();
     EXcontent.push(new MapItem("compile window", null, "prompt.AddEventText(TryCompileWindow(Windows[0]))"));
    
     var maincontent = new Array();
     maincontent.push(new MapItem("create", CREATEContent, ""));
     maincontent.push(new MapItem("experimental", EXcontent, ""));
     maincontent.push(new MapItem("edition mode", null, "document.body.style.cursor = 'default'; Editor.inPlayMode = false;")); // + do smthing
     maincontent.push(new MapItem("play mode", null, "document.body.style.cursor ='pointer'; Editor.inPlayMode = true;"));    // + do smthing
     
     return new DropDown("Edit",maincontent);
}
 
function SetUpNavMap()
{
    var WINcontent = new Array();
    WINcontent.push(new MapItem("new", null, "Editor.AddNewWindow('win'+Editor.Windows.length);"));
    WINcontent.push(new MapItem("open all", null, "Editor.OpenAllWindows()"));
    WINcontent.push(new MapItem("close all", null, "Editor.CloseAllWindows()"));
    
     var SCRcontent = new Array();
    SCRcontent.push(new MapItem("open all", null, "ide.LoadAllBlocks()"));
    SCRcontent.push(new MapItem("close all", null, "ide.CloseAllTabs()"));
    
    var maincontent = new Array();
    maincontent.push(new MapItem("window", WINcontent, ""));
    maincontent.push(new MapItem("script", SCRcontent, ""));
    return new DropDown("Nav",maincontent);
}
function SetUpW3Map()
{
    var ETHcontent = new Array();
    ETHcontent.push(new MapItem("mainnet", null, "SwitchToEthereumNetwork('main')"));
    ETHcontent.push(new MapItem("ropsten", null, "SwitchToEthereumNetwork('ropsten')"));
    ETHcontent.push(new MapItem("rinkeby", null, "SwitchToEthereumNetwork('rinkeby')"));
    ETHcontent.push(new MapItem("kovan", null, "SwitchToEthereumNetwork('kovan')"));
    ETHcontent.push(new MapItem("goerli", null, "SwitchToEthereumNetwork('goerli')"));
    
    var TEZcontent = new Array();
    TEZcontent.push(new MapItem("mainnet", null, "SwitchToTezosNetwork('main')"));
    TEZcontent.push(new MapItem("ithacanet", null, "SwitchToTezosNetwork('ithacanet')"));
    TEZcontent.push(new MapItem("jakartanet", null, "SwitchToTezosNetwork('jakartanet')"));
    
    var NETcontent = new Array();
    NETcontent.push(new MapItem("ethereum", ETHcontent, ""));
    NETcontent.push(new MapItem("tezos", TEZcontent, ""));
    
    var SCcontent = new Array();
    SCcontent.push(new MapItem("configure", null, "var addr = originalPrompt('Contract Address:');if ( Network == Ethereum ){ if ( LoadedABI == null ) { prompt.AddEventText('ABI NOT LOADED');return;} ;Network.LoadContract(addr,LoadedABI );} else { Network.LoadContract(addr);}")); 

    SCcontent.push(new MapItem("get editor", null, "if ( Network == Ethereum ){window.open('https://remix.ethereum.org/', '_blank');} else {window.open('https://ide.ligolang.org/', '_blank');} ")); 
    SCcontent.push(new MapItem("load ABI", null, "$('#input-file').trigger('click');")); 
    
    var WALLcontent = new Array();
    WALLcontent.push(new MapItem("authentificate", null, "prompt.AddEventText('Not available. Wait for future update')")); 
    WALLcontent.push(new MapItem("about", null, "prompt.AddEventText('Not available. Wait for future update')")); 
    WALLcontent.push(new MapItem("get faucet", null, "prompt.AddEventText('Not available. Wait for future update')")); 
    
    var maincontent = new Array();
    maincontent.push(new MapItem("network", NETcontent, ""));
    maincontent.push(new MapItem("smartcontract", SCcontent, ""));
    maincontent.push(new MapItem("wallet", WALLcontent, ""));
    return new DropDown("web3",maincontent);
}
function SetUpHelpMap()
{
    var maincontent = new Array();
    maincontent.push(new MapItem("library                     [$]", null, "Documentation.OpenClose()"));
    maincontent.push(new MapItem("git", null, "window.open('https://github.com/gggraph/p-graph', '_blank');"));
    maincontent.push(new MapItem("mouse calibration", null, "CreateMouseAccuracyCanvas()"));
    maincontent.push(new MapItem("about", null, "prompt.AddEventText('PGRAPH ver 0.02 [05.09.2022]')"));
   
    return new DropDown("Help",maincontent);
}
