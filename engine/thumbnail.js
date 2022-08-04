class ThumbnailExplorer
{
    constructor(canvas)
    {
        // @ Thumbnails of explorer
        this.Thumbnails = new Array(); 
        this.Canvas = canvas;  // Canvas of explorer
        
        //@ Add an explorer
        //document.getElementById('tex').addEventListener("mousedown", this.MouseEvent);
        this.Canvas.general.addEventListener("mousedown", this.MouseEvent);
        this.Draw();
    }
    
    AddThumbnail(data)
    {
        // @ Try Add this thumbnail
        var sIndex = this.GetSimilarThumbnailIndex(data);
        if (sIndex> -1)
        {
            this.SetThumbnailPriority(sIndex);
            return;
        }
        this.Thumbnails.push(data); 
        this.SetThumbnailPriority(this.Thumbnails.length-1);
        this.Draw();
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
        array_move(this.Thumbnails, index, 0);
        this.Draw();
    }
    GetTitleAtThumbnailIndex(index)
    {
        return "";
    }
    
    Draw()
    {
            
        this.Blank();
        var g = this.Canvas.context;
        if ( this.Thumbnails.length == 0 ){ return ; }
        var i; 
        var x = 0;
       g.strokeStyle = 'rgb(255,255,255)';
        // @ a rework here 
        for ( i = 0 ; i < this.Thumbnails.length; i++ )
        {
             var thumbwidth = this.Canvas.box.w / this.Thumbnails.length;
        // apply a max if not retyping 
        if ( thumbwidth > this.Canvas.box.w / 10 )
        {
            thumbwidth = this.Canvas.box.w / 10 ; 
        }
            // Compute length of text 
            var title = this.GetTitleAtThumbnailIndex(i);
            var wc = g.measureText(title).width; 
            while ( wc > (this.Canvas.box.w / 10 * 0.75) && (currentTyping != -2 || this != windowThumbnails) )
            {
                title = title.substr(0,title.length-1) // can pause problem ... 
                wc = g.measureText(title).width; 
            } 
            
            // @ Draw box 
             g.fillStyle = 'rgb(0,0,255)';
            
            //  Apply Pink Color if i == 0 && currentTyping != -2 && this == windowThumbnails
            if (i == 0 && ( this != windowThumbnails || currentTyping != -2) )
            {
                g.fillStyle = 'rgb(255,50,211)';
              
            }
            
            // @ Set width as text measurement if currentTyping == -2 && this == windowThumbnails
            if ( currentTyping == -2 && this == windowThumbnails && i ==0 && wc > thumbwidth)
                thumbwidth = wc;
            
            // Fill & stroke
            g.fillRect(x,1,thumbwidth, this.Canvas.box.h-1);
            g.strokeRect(x,1,thumbwidth, this.Canvas.box.h-1);
            // Draw Text
            g.fillStyle = 'rgb(255,255,255)';
            var fontsize = Math.round(0.57*this.Canvas.box.h); 
            var hoffset = Math.round(0.7*this.Canvas.box.h);
            g.font = fontsize+"px Autopia";
            
            if ( currentTyping == -2 && this == windowThumbnails && i == 0)
            {
                 g.fillText(title,0,hoffset );
                
            }
            else 
            {
                  g.fillText(title,x + (thumbwidth/2) - (wc/2),hoffset ); // center it ...
            }
 
            x+= thumbwidth; 
        }
      
    }
}



