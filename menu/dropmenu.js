
class DropMenu
{
    constructor(canvas)
    {
        this.Canvas = canvas; 
        this.DropObjects = new Array("File","Edit","Navigate","Web3","Help");
        this.DropBoxes = new Array();
        this.dropselected = -1;
    }
    Blank()
    {
        var g = this.Canvas.context;
        g.fillStyle = 'rgb(255,255,255)';
        g.fillRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
    }
    Display()
    {
        this.Blank();
        var g = this.Canvas.context;
        if ( this.DropObjects.length == 0 ){ return ; }
        var i; 
        var x = 0;
        var thumbwidth = this.Canvas.box.w / this.DropObjects.length;
        // apply a max ... 
        if ( thumbwidth > this.Canvas.box.w / 15 )
        {
            thumbwidth = this.Canvas.box.w / 15 ; 
        }
        g.fillStyle = 'rgb(0,0,255)';
        g.strokeStyle = 'rgb(255,255,255)';
        for ( i = 0 ; i < this.DropObjects.length; i++ )
        {
            g.fillStyle = 'rgb(0,0,0)';
            if (  this.dropselected  == i )
                g.fillStyle = 'rgb(0,0,255)';
            g.fillRect(x,1,thumbwidth, this.Canvas.box.h-1);
            g.strokeRect(x,1,thumbwidth, this.Canvas.box.h-1);
            this.DropBoxes[i] = new Box(x,1,thumbwidth, this.Canvas.box.h-1);
            // also draw the title i guess ... 
            var title = this.DropObjects[i];
            console.log(title);
            var wc = g.measureText(title).width; 
            while ( wc > (thumbwidth * 0.75))
            {
                title = title.substr(0,title.length-1) // can pause problem ... 
                wc = g.measureText(title).width; 
                console.log("affined");
            } 
            
            g.fillStyle = 'rgb(255,255,255)';
            console.log(this.Canvas.box.h); // 26
            var fontsize = Math.round(0.615 * this.Canvas.box.h);
            g.font = fontsize+"px Autopia";
            g.fillText(title,x + 10,
                       //+ (thumbwidth/2) - (wc/2),
                       Math.round(0.77 * this.Canvas.box.h) ); // center it ... 
            x+= thumbwidth; 
        }
      
    }
    OnMove()
    {
        var i;
        for (i = 0; i < ToolBar.DropBoxes.length; i++)
        {
            if ( IsMouseInsideBox(ToolBar.DropBoxes[i], ToolBar.Canvas))
            {
                if (ToolBar.dropselected != i) // no menu 
                {
                    
                    DestroyallMenu();
                    LoadMenuMaps();
                    var Map = MenuMap;
                    switch(i)
                    {
                        case 0: Map = FileMenuMap; break;
                        case 1: Map = EditMenuMap; break;
                        case 2: Map = NavMenuMap; break;
                        case 3: Map = web3Map; break;
                        case 4: Map = HelpMenuMap; break;
                    }
                    // @ Do some test here 
                    CreateMenu( ToolBar.DropBoxes[i].x , ToolBar.DropBoxes[i].h, Map);
                    ToolBar.dropselected = i;
                    return;
                }
                
                
            }
        }
    }
}
var ToolBar;

function InitToolBar()
{
    var form = document.getElementById('mainform');
    var newDiv = document.createElement("div");
    newDiv.id = "tooldiv";
    var canv = document.createElement('canvas');
    canv.id = 'toolcanvas';
    form.appendChild(newDiv);
    newDiv.appendChild(canv);
    
    var ToolCanvas = new Canvas(canv, newDiv,new Box(0,0,window.innerWidth /2 - 10, explorerBoxInterval));
    ToolBar = new DropMenu(ToolCanvas);
    ToolBar.Display();
    
    // Add some listener
    ToolCanvas.general.onmousemove = function(){ToolBar.OnMove();};
    
}
