
// A DropMapItem
class MapItem
{
    constructor(title, devMap, eventfunction)
    {
        this.Title = title;
        this.Map   = devMap; 
        this.Event = eventfunction;  
    }
}
class DropDown
{
    constructor(name, map=[], CanvasList)
    {
        this.Title = name;
        this.OriginBox = new Box();
        this.Map = map;
        this.Navigation = [];
        this.CanvasList = new Array();
        this.CreateSupport();
    }
    CreateSupport()
    {
        // Get number of canvas needed 
        this.iterator = 0;
        this.ComputeSupportLength(this.Map, 0);
        console.log("Creating " +this.iterator+ " supports" );
        for (var i = 0 ; i < this.iterator; i++ )
        {
            var c = CreateCanvas(0,0,0,0);
            c.focusPosition = 1000;
            this.CanvasList.push(c);
        }
    }
    
    // Recursive stuff
    ComputeSupportLength(map, navcursor)
    {
        for ( var i = 0 ; i < map.length ; i ++ )
        {
            if (map[i].Map != null)
                this.ComputeSupportLength(map[i].Map);
            
            this.iterator++;
        }    
    }
    Clear()
    {
        this.ClearCanvas();
        this.Navigation = [];
    }
    ClearCanvas()
    {
        for ( var i = 0 ; i < this.CanvasList.length; i++)
        {
            this.CanvasList[i].box = new Box(0,0,0,0);
            this.CanvasList[i].SetPositionAndDimension();
        }
    }
    ClearCanvasFrom(index)
    {
        for ( var i = index ; i < this.CanvasList.length; i++)
        {
            this.CanvasList[i].box = new Box(0,0,0,0);
            this.CanvasList[i].SetPositionAndDimension();
        }
    }
    Run()
    {
        this.iterator = 0;
        if ( this.Map.length == 0)
            return;
            
        this.RunMap(this.Map, 0, new Vector2(this.OriginBox.x, this.OriginBox.y+this.OriginBox.h));
    }
    
    
    RunMap(map, navcursor, originpos)
    {
        // set dimension of canvas
        this.iterator++;
        var p = this.iterator;
        if ( this.CanvasList.length <= this.iterator )
            return;
        this.CanvasList[p].box = new Box(originpos.x, originpos.y, VisualParameters.DropDownWidth, VisualParameters.DropDownHeight *map.length );
        this.CanvasList[p].SetPositionAndDimension();
        var g = this.CanvasList[this.iterator].context;
        var ypos = 0;
        
        for ( var i = 0 ; i < map.length ; i ++ )
        {
            var fillColor = VisualParameters.DropDownFillColor;
            var fontColor = VisualParameters.DropDownStrokeColor;
              if (IsMouseInsideBox(new Box(0,ypos,VisualParameters.DropDownWidth,VisualParameters.DropDownHeight), this.CanvasList[p]))
            {
                if ( mousepressed)
                {
                    this.Navigation = new Array();
                    if  (map[i].Event != null )
                        eval(map[i].Event)
                    ToolBar.SetSelection(-1);
                    return;
                }
                 fillColor = VisualParameters.DropDownHighlightColor;
                 fontColor = VisualParameters.DropDownFillColor;
                
                if ( this.Navigation.length == navcursor)
                {
                    this.Navigation.push(i);
                    return;
                }
                if ( this.Navigation.length-1 == navcursor)
                {
                    this.ClearCanvasFrom(p+1);
                    this.Navigation[this.Navigation.length-1] = i;
    
                }
                if ( navcursor < this.Navigation.length - 1 )
                {
                   // remove 
                    this.ClearCanvasFrom(p+1);
                    //this.ClearCanvas();
                    var dist = this.Navigation.length - navcursor;
                    this.Navigation.splice(navcursor, dist);
                   
                }
            }
            
            if ( this.Navigation.length > navcursor )
            {
                if (map[i].Map != null && this.Navigation[navcursor] == i )
                {
                    // Develop
                    this.RunMap(map[i].Map, navcursor+1, new Vector2(originpos.x + VisualParameters.DropDownWidth, originpos.y + ypos));
                    fillColor = VisualParameters.DropDownHighlightColor;
                    fontColor = VisualParameters.DropDownFillColor;
                }
            }
            
            // fill bar
            g.fillStyle = fillColor;
            g.fillRect(0, ypos, VisualParameters.DropDownWidth,VisualParameters.DropDownHeight);
            // fill text
            g.fillStyle = fontColor;
            g.font = VisualParameters.DropDownFont;
            g.fillText(map[i].Title, 10, ypos + VisualParameters.DropDownHeight/2 + VisualParameters.DropDownFontSize/4); // ?
            
            ypos += VisualParameters.DropDownHeight;
        }
        // stroke whole here at origin x, ypos, dropwidth, dropheight
        
        g.strokeStyle = VisualParameters.DropDownStrokeColor;
        g.lineWidth = 3;
        g.strokeRect(0, 0, this.CanvasList[p].box.w, this.CanvasList[p].box.h);
    }
}

// A map is an array of items each item has 
// A menu that generate DropDown item when mouse over 
class DropDownMenu
{
    constructor(drops)
    {
        // Selector Canvas
        this.Canvas = CreateCanvas(0,0,0,0);
        this.DropDowns = drops;
        this.Selection = -1;
        this.HighlightIndex = -1;
        this.Canvas.general.eventObject = this;
        this.Canvas.general.addEventListener("mousemove", this.OnMouseMove, false);
        this.Canvas.general.addEventListener("mousedown", this.OnMouseDown, false);
        
    }
    SetDImension(box)
    {
        this.Canvas.box = box
        this.Canvas.SetPositionAndDimension();
        this.Run();
    }
    Blank()
    {
        var g = this.Canvas.context;
        g.fillStyle = 'rgb(255,255,255)';
        g.fillRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
    }
    
    Run()
    {
        this.Display();
        if ( this.Selection > -1 && this.Selection < this.DropDowns.length)
            this.DropDowns[this.Selection].Run();
    }
    Display()
    {
        this.Blank();
        var g = this.Canvas.context;
        if ( this.DropDowns.length == 0 ){ return ; }
        var i; 
        var x = 0;
        var thumbwidth = this.Canvas.box.w / this.DropDowns.length;
        // apply a max ... 
        if ( thumbwidth > this.Canvas.box.w / 15 )
        {
            thumbwidth = this.Canvas.box.w / 15 ; 
        }
        if ( thumbwidth<60)
            thumbwidth= 60;
        g.fillStyle = 'rgb(0,0,255)';
        g.strokeStyle = 'rgb(255,255,255)';
        for ( i = 0 ; i < this.DropDowns.length; i++ )
        {
            g.fillStyle = 'rgb(0,0,0)';
            if (  this.HighlightIndex  == i )
                g.fillStyle = 'rgb(0,0,255)';
            g.fillRect(x,1,thumbwidth, this.Canvas.box.h-1);
            g.strokeRect(x,1,thumbwidth, this.Canvas.box.h-1);
            
            this.DropDowns[i].OriginBox = new Box(x,1,thumbwidth, this.Canvas.box.h-1);
            // also draw the title i guess ... 
            var title = this.DropDowns[i].Title;
            var wc = g.measureText(title).width; 
            while ( wc > (thumbwidth * 0.75))
            {
                title = title.substr(0,title.length-1)
                wc = g.measureText(title).width; 
            } 
            
            g.fillStyle = 'rgb(255,255,255)';
            var fontsize = Math.round(0.615 * this.Canvas.box.h);
            g.font = fontsize+"px Autopia";
            g.fillText(title,x + 10,
                       Math.round(0.77 * this.Canvas.box.h) ); // center it ... 
            x+= thumbwidth; 
        }
    }
    SetSelection(index)
    {
        if ( this.Selection > -1 )
        {
            this.DropDowns[this.Selection].Clear();
        }
        this.Selection = index;
    }
  
    OnMouseDown()
    {
        this.eventObject.HighlightIndex = -1;
        var i;
        for (var i = 0; i < this.eventObject.DropDowns.length; i++)
        {
            if ( IsMouseInsideBox(this.eventObject.DropDowns[i].OriginBox, this.eventObject.Canvas))
            {
                if ( i != this.eventObject.Selection)
                {
                    this.eventObject.SetSelection(i);
                    return;
                }
                this.eventObject.HighlightIndex = i;
                    
            }
        }
    }
    OnMouseMove()
    {
        this.eventObject.HighlightIndex = -1;
        var i;
        for (var i = 0; i < this.eventObject.DropDowns.length; i++)
        {
            if ( IsMouseInsideBox(this.eventObject.DropDowns[i].OriginBox, this.eventObject.Canvas))
            {
                if ( i != this.eventObject.Selection)
                {
                    if ( this.eventObject.Selection >= 0 ) 
                    {
                         this.eventObject.SetSelection(i);
                         return;
                    }
                }
                this.eventObject.HighlightIndex = i;
                    
            }
        }
    }
}
var ToolBar;


