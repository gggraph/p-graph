class Glyph extends Block
{
    SetGraphics(data)
    {
        //@ Data is an array of array of Vector2
        this.glyphData = data;
        var dim = GetGlyphDimension(this.glyphData);
        this.bodyBox.w = dim.x + 20 ;
        this.bodyBox.h = dim.y + 20 ; 
    }
    Draw()
    {
         // @ Draw Boxes
        this.DrawBody()
        
        // @ Draw IOs
        var w=0
        var maxSlot = this.inputslots.length;
        if (  this.outputslots.length > maxSlot){
            maxSlot = this.outputslots.length;
        }
        
        var segwidth = w /maxSlot ;
        if ( segwidth < 10 *1.5){
            // recompute w 
            segwidth = 10 * 1.5;
            w = maxSlot *segwidth;
        }
        var iostartpos  = this.bodyBox.x + this.bodyBox.w/segwidth; 
        this.DrawIOs(iostartpos,segwidth,this.inputslots.length, this.outputslots.length )
        
        var _g = ScreenCanvas.context;
        // Draw Glyphes
        var i;
        for (i = 0; i < this.glyphData.length; i++)
        {
            if ( this.glyphData[i].length == 0 )
                continue;
            
            _g.beginPath();
            // @ Offset with bodybox position ...
            _g.moveTo(this.glyphData[i][0].x + this.bodyBox.x + 10 , this.glyphData[i][0].y + this.bodyBox.y + 10);
            var n;
            for (n = 1; n < this.glyphData[i].length; n++)
            {
                 _g.lineTo(this.glyphData[i][n].x + this.bodyBox.x + 10, this.glyphData[i][n].y + this.bodyBox.y + 10);
            }
            _g.stroke();
            _g.closePath();
        }
        
        // @ Draw Wire
        this.DrawWires();
    }
   
    ProccessRenaming(e)
    {
        if ( e.keyCode == 46 )
        {
            this.Destroy();
            return; 
        }
       if ( e.keyCode == 13 ) // @ key enter was pressed 
        {
             this.LoadFromTypeName();
            // @ Remove this glyphes lines data from current GlyphLib Entry
            // @ And Add this glyphes Lines data to other GlyphLib 
            return;
        }
        if (  e.keyCode == 8 )
            this.typename = this.typename.substr(0,this.typename.length-1);
        else
        {
            if ( !KeyIsIllegal(e.key))
            {
                this.typename += e.key;
            }
             
        }
    }
    
}

//@ add an event listner to editorcanvas on key down ... if alt press : mousepressed start drawing... 

function GetGlyphDimension(data)
{
    //return a vector2 containing width and height... 
    var maxX = 0;
    var maxY = 0;
    var i;
    for (i = 0; i < this.glyphData.length; i++)
    {
        var n;
        for (n = 0; n < this.glyphData[i].length; n++)
        {
            if ( maxX < this.glyphData[i][n].x)
                maxX = this.glyphData[i][n].x;
            if ( maxY < this.glyphData[i][n].y)
                maxY = this.glyphData[i][n].y;
        }
    }
    return new Vector2(maxX, maxY)
}

class GlyphEntry
{
    constructor(typename, bloc)
    {
        this.typename = typename;
        this.bloc     = bloc;
    }
}

var GlyphLibrary = new Array();
