class DocumentationDisplay
{
    constructor(canvas)
    {
        this.Canvas = canvas;
        this.Opened = false;
    }
    
    Open(file="")
    {
        if ( this.Opened)
            return;
        if (Library.length == 0 )
        {
            prompt.AddEventText("no library entry found")
            return;  
        }
        this.Opened = true;
        
        var ypos = 0;
        this.Canvas.Blank();
        
        for (var i = 0 ; i < Library.length; i++ )
        {
            if ( Library[i].File != file)
                continue;
            ypos += 30;
            var newblock = new Block(Library[i].typename, "doc", this.Canvas);
            newblock.id += i;
            Blocks.push(newblock);
            var id = newblock.id
            newblock.LoadFromTypeName(false,false);
            var b = GetBlockByID(id);
            if ( b != null)
                b.SetPosition(30,ypos);
            
            var doctext = GetDocOfNativeScript(Library[i].NativeScript);
            ypos+=20*doctext.length;
            ypos += 40;
        }

        var barheight = this.Canvas.box.h / Library.length;
        this.barBox = new Box(this.Canvas.box.w-30, 0, 30, barheight);
        
        this.RealHeight = ypos;
        this.RelativeHeight =  ypos - this.Canvas.box.h;
        
        if ( this.RelativeHeight < 0 )
            this.RelativeHeight = 0;     
    }
    OpenClose(file="")
    {
        if (this.Opened)
            this.Close();
        else
            this.Open(file);
    }
    Run()
    {
        
        var i ; 
        var _g = this.Canvas.context;
        this.Canvas.Fill("rgb(255,255,255)");
        var blocnum = 0;
        // set y pos to barbox.y / docRelativeHeight * 100
        var prctpos = (this.barBox.y / this.RelativeHeight)* (this.RelativeHeight/this.Canvas.box.h);
        var ypos = 0 - (prctpos*this.RelativeHeight);

        for ( i = 0 ; i < Blocks.length; i++)
        {
            if ( Blocks[i].Window == "doc")
            {
                var beginy = ypos;
                ypos += 30;
                if ( this.barGrabbed )
                {
                    Blocks[i].SetPosition(30,ypos);
                }
                Blocks[i].Draw();
                Blocks[i].Interact();
                var doctext = GetDocOfNativeScript(Blocks[i].NativeScript);
                var n;
                for ( n = 0 ; n < doctext.length; n++)
                {
                    _g.fillStyle = 'rgb(0,0,0)';
                    _g.font = "bold 16px Courier";
                    _g.fillText(doctext[n],100, ypos);
                    ypos += 20;
                }
                ypos += 40;
                // @ Stroke a rect from last savedpos
                _g.lineWidth = 3;
                _g.strokeStyle = 'rgb(0,0,0)';
                _g.strokeRect( 5, beginy, this.Canvas.box.w - 10, ypos - beginy);
                blocnum++;
            }
        }
        // @ Display Blue Bar
        if ( blocnum == 0 )
            return;
        

        
        _g.lineWidth = 3;
        _g.fillStyle = 'rgb(0,0,0)';
        _g.fillRect( this.Canvas.box.w-30, 0, 30, this.Canvas.box.h);
        _g.fillStyle = 'rgb(0,0,255)';

        var barheight = this.Canvas.box.h / Library.length - this.Canvas.box.h; // ?
        var h = this.barBox.h;
        if ( h < 40 )
            h = 40;
        _g.fillRect(this.barBox.x, this.barBox.y, this.barBox.w, h);
        
        if ( !UserIsGrabbing )
        {
            if ( mousepressed && IsMouseInsideBox(new Box(this.barBox.x, this.barBox.y, this.barBox.w, h), this.Canvas))
            {
                this.barGrabbed = true;
                this.grabOrigin = new Vector2(mouseX-this.barBox.x, mouseY - this.barBox.y);
                UserIsGrabbing = true;
            } 
            console.log("lib called")
            return;
        }
         
        if ( this.barGrabbed)
        {
            if ( !mousepressed)
            {
                 this.barGrabbed = false;
                 UserIsGrabbing = false;
                 return;
            }
            this.barBox.y = mouseY-this.grabOrigin.y;
            if ( this.barBox.y<0)
                this.barBox.y =0;
            if ( this.barBox.y >  this.Canvas.box.y-barheight)
                this.barBox.y = this.Canvas.box.y-barheight

        }

    }
    ComputeYScrollingRatio()
    {
        var barheight = this.Canvas.box.h / Library.length; 
        this.barBox = new Box(this.Canvas.box.w-30, 0, 30, barheight);
        this.RelativeHeight =  this.RealHeight-this.Canvas.box.h; 
        if ( this.RelativeHeight < 0 )
            this.RelativeHeight = 0;
    }
    Close()
    {
        if ( !this.Opened )
            return;
        
        this.Opened = false;
        this.Canvas.Fill("rgb(0,0,0)");
        for (var i = Blocks.length -1 ; i >= 0; i-- )
        {
            if ( Blocks[i].Window == "doc" ) 
            {
                Blocks[i].Destroy();
            }
        }
    }
    
}

var Documentation;

