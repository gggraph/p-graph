class Onglets
{
   
    constructor()
    {
        this.Thumbnails = new Array(); 
        this.Canvas = CreateCanvas(0,0,0,0);
        
        this.Canvas.general.eventObject = this;
        this.Canvas.general.addEventListener("mousedown", this.MouseEvent);
        this.Canvas.general.addEventListener("mousemove", function(e){this.eventObject.Draw()});
        this.Canvas.general.addEventListener("mouseleave", function(e){this.eventObject.Draw()});
        this.Draw();
    }
    
    SetDimension(box)
    {
        this.Canvas.box = box;
        this.Canvas.SetPositionAndDimension();
        this.Draw();
    }
    
    AddThumbnail(data)
    {
        // @ Try Add this thumbnail
        var sIndex = this.GetSimilarThumbnailIndex(data);
        if (sIndex> -1)
        {
            this.Thumbnails[sIndex] = data;
            this.SetThumbnailPriority(sIndex);
            return false;
        }
        this.Thumbnails.push(data); 
        this.SetThumbnailPriority(this.Thumbnails.length-1);
        this.Draw();
        return true;
    }
    CloseThumbnail(data)
    {
        var index = this.GetThumbnailIndex(data);
        if ( index == -1 )return;
        this.Thumbnails.splice(index,1);
        this.SetThumbnailPriority(0);
    }
    // Blank the Canvas
    Blank()
    {
        var g = this.Canvas.context;
        g.fillStyle = 'rgb(255,255,255)';
        g.fillRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
        
        //g.fillStyle = 'rgb(0,0,0)';
    }

    GetThumbnailIndex(data)
    {
        return this.Thumbnails.indexOf(data);
    }
    
    // @ this one is specific
    GetSimilarThumbnailIndex(data){return -1;}
    
    CleanDuplicata(){// @ Clear all thumbnails that are duplicated 
        
    }
    
    SetThumbnailPriority(index)
    {
        if ( this.Thumbnails.length == 0 )
            return;
        array_move(this.Thumbnails, index, 0);
        this.Draw();
    }
    GetTitleAtThumbnailIndex(index)
    {
        return "";
    }
    
    Draw()
    {
        // Blank
        this.Blank();
        // Do nothing if no onglet
        if ( this.Thumbnails.length == 0 ){ return ; }
        
        var g = this.Canvas.context;
        
        // Compute onglet width 
        var thumbwidth = this.Canvas.box.w / this.Thumbnails.length;
        // Cap Onglet width if needed
        if ( thumbwidth > this.Canvas.box.w / 10 )
        {
            thumbwidth = this.Canvas.box.w / 10 ; 
        }
        if ( thumbwidth<40)
            thumbwidth= 40;
        var x = 0;
        // Draw onglet and text
        for ( var i = 0 ; i < this.Thumbnails.length; i++ )
        {
             var title = this.GetTitleAtThumbnailIndex(i);
             var wc = g.measureText(title).width; 
             
             // Lowered text while onglet is lower that 75% of onglet width...
            while ( wc > (this.Canvas.box.w / 10 * 0.75))
            {
                title = title.substr(0,title.length-1) 
                wc = g.measureText(title).width; 
            } 
            
            // @ Draw box 
             g.fillStyle = VisualParameters.OngletsFillColor;
            // if hightlight (i=0) use hightlight color
            if ( IsMouseInsideBox(new Box(x,1,thumbwidth, this.Canvas.box.h-1), this.Canvas))
                 g.fillStyle = VisualParameters.OngletsPassLightColor;
            if ( i==0)
                g.fillStyle = VisualParameters.OngletsHighLightColor;
            
             g.fillRect(x,1,thumbwidth, this.Canvas.box.h-1);
            
             // @ Draw Text
             g.fillStyle = VisualParameters.OngletsStrokeColor;
             g.font = VisualParameters.OngletsFont;
             g.fillText(title,x + (thumbwidth/2) - (wc/2), (this.Canvas.box.h-1)/2 + VisualParameters.OngletsFontSize/4 );
            
             x+= thumbwidth; 
        }
        
    }
}