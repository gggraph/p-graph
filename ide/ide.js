
class IDE
{
    constructor()
    {
        // @ Set up canvas
        this.Canvas = CreateCanvas(0,0,0,0);
        
        // @ Set up thumbnail 
        this.CodeExplorer = new IdeExplorer();
        // @ Set up textboxes
        this.CodeEditor = new TextBox(this.Canvas, new Box(this.Canvas.box.x,this.Canvas.box.y,this.Canvas.box.w, this.Canvas.box.h));
        setInterval(function () {ide.CodeEditor.DrawCursor()}, 700);
        
        // @ Set Up Empty Bloc
        this.Block = null;
        
        //@ Other informations
        this.hide = false;
        //@ Also called here
        this.Canvas.general.addEventListener("mousedown", function(e){SetFocusOnIDE()}, false);
        this.Canvas.general.addEventListener("keydown", function(e){ide.TryCompile()}, false);
    }
    
    TryCompile()
    {
        //@ only compile if text changed and line cursor changed
        if ( !this.CodeEditor.TextHasChanged || !this.CodeEditor.HasChangedLine)
            return;
        
        if ( this.Block != null )
            RefreshNativeScriptFromBlock(this.Block);
        
        console.log("Updating Code...");
        this.CodeEditor.TextHasChanged = false 
        this.CodeEditor.HasChangedLine = false
   
    }
    // Box Dimension for thumbnails. Box dimension for Code Editor
    SetExplorerDimension(box)
    {
        this.CodeExplorer.SetDimension(box);
    }
    SetEditorDimension(box)
    {
        var washide = this.hide;
         if ( this.hide)
            this.UnHide()
        
        this.Canvas.box = box;
        this.Canvas.SetPositionAndDimension();
        this.CodeEditor.BodyBox = new Box(0,0,this.Canvas.box.w, this.Canvas.box.h);
        this.CodeEditor.Draw();
        
         if ( washide)
            this.Hide();
    }
    
    Hide()
    {
        
        this.tempBox = new Box(this.Canvas.box.x,this.Canvas.box.y,this.Canvas.box.w,this.Canvas.box.h );
        this.Canvas.box = new Box(this.Canvas.box.x, this.Canvas.box.y, 0,0);
        this.Canvas.SetPositionAndDimension();
        Editor.SetPatchDimension(new Box(Editor.Canvas.box.x,Editor.Canvas.box.y,Editor.Canvas.box.w, Editor.Canvas.box.h+ this.tempBox.h));
        this.CodeExplorer.Canvas.box.y = this.CodeExplorer.Canvas.box.y + this.tempBox.h;
        this.CodeExplorer.Canvas.SetPositionAndDimension();
        this.CodeExplorer.Draw();
        
        this.hide = true;
        
    }
    UnHide()
    {
        this.Canvas.box = new Box(this.tempBox.x, this.tempBox.y, this.tempBox.w,this.tempBox.h);
        this.Canvas.SetPositionAndDimension();
        this.CodeEditor.Draw();
        Editor.SetPatchDimension(new Box(Editor.Canvas.box.x,Editor.Canvas.box.y,Editor.Canvas.box.w, Editor.Canvas.box.h- this.tempBox.h));
        this.CodeExplorer.Canvas.box.y = this.CodeExplorer.Canvas.box.y - this.tempBox.h;
        this.CodeExplorer.Canvas.SetPositionAndDimension();
        this.CodeExplorer.Draw();
        this.hide = false;
    }
    TryLoadBlock(bloc)
    {
        if (bloc == null )
            return;
        // Add bloc to thumbnail
        this.CodeExplorer.AddThumbnail(bloc)
        
        // Load Block code
        this.Block = this.CodeExplorer.Thumbnails[0];
        // add bloc code to ide
        this.CodeEditor.Text = this.CodeExplorer.Thumbnails[0].NativeScript;
        this.CodeEditor.Draw();
        this.CodeEditor.SetCursor(0,0);
        
          
    }
    TryCloseBlock(bloc)
    {
        // Remove thumbnail
        this.CodeExplorer.CloseThumbnail(bloc);
        
        if ( this.CodeExplorer.Thumbnails.length == 0)
        {
            // Empty code editor
            this.CodeEditor.Text = [""];
            this.CodeEditor.Draw();
            this.CodeEditor.SetCursor(0,0);
            return;
        }
        
        // Load Block code
        this.Block = this.CodeExplorer.Thumbnails[0];
        // add bloc code to ide
        this.CodeEditor.Text = this.CodeExplorer.Thumbnails[0].NativeScript;
        this.CodeEditor.Draw();
        this.CodeEditor.SetCursor(0,0);
        
    }
    LoadAllBlocks()
    {
        for (var i = 0; i < Blocks.length; i++)
            this.TryLoadBlock(Blocks[i]);
    }
    CloseAllTabs()
    {
        for (var i = 0; i < this.CodeExplorer.Thumbnails.length; i++)
            this.TryCloseBlock( this.CodeExplorer.Thumbnails[i] );
    }
    
  
    
}


class IdeExplorer extends Onglets
{

    GetTitleAtThumbnailIndex(index)
    {
        return this.Thumbnails[index].typename;
    }
    GetSimilarThumbnailIndex(data)
    {
        var i;
        for (i=0;i<this.Thumbnails.length;i++)
        {
            if (this.Thumbnails[i].typename == data.typename)
                return i;
        }
        return -1;
    }
    MouseEvent(e)
    {
        var i; 
        var x = 0;
        var thumbwidth = this.eventObject.Canvas.box.w / this.eventObject.Thumbnails.length;
        // apply a max ... 
        if ( thumbwidth > this.eventObject.Canvas.box.w / 10 )
        {
            thumbwidth = this.eventObject.Canvas.box.w / 10 ; 
        }
        for ( i = 0; i < this.eventObject.Thumbnails.length; i++ )
        {
            if ( IsVectorInsideBox(new Vector2(mouseX - this.eventObject.Canvas.box.x, mouseY - this.eventObject.Canvas.box.y), new Box(x,0,thumbwidth,this.eventObject.Canvas.box.h-1)))
            {
                // Do something here when clicking ...
                ide.TryLoadBlock(this.eventObject.Thumbnails[i]);
                if ( ide.hide)
                    ide.UnHide()
                return;
            }
             x+= thumbwidth; 
        }
    }
    
}

// @ Constant variable pointing to Editor
var ide; 
