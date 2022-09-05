var prompt; 

class Prompter
{
    constructor()
    {
        this.Text = "";
        this.Canvas = CreateCanvas(0,0,0,0);
        this.Canvas.general.addEventListener("keydown", this.KBEvent, false);
        this.Canvas.general.onmousedown = function(){SetFocusOnPrompt(); console.log("On prompt")};
        this.Draw();
        this.DefaultText = new Array();
        this.EventText = new Array();
        this.SetUpDefaultText();
        this.xdelta = this.Canvas.box.w;
        this.defaultIndex =0; 
        this.eventtimer = 0;
        this.ineventmode = false;
        
        setInterval(this.DrawText, 10 );
        setInterval(this.DrawEvent, 500 );
       
    }
    SetUpDefaultText()
    {
        this.DefaultText.push("welcome to TEZO GRAPH ver 0.000001 ");
        this.DefaultText.push("press [n] to create a new block         ");
        this.DefaultText.push("double click on block to rename it ");
        this.DefaultText.push("press [suppr] while renaming delete the block");
        this.DefaultText.push("this is not puredata. this is tezograph");
        this.DefaultText.push("                                        ");
        this.DefaultText.push("looking for new idea ? press [$]        ");
        this.DefaultText.push("you can pass block value to another window with a [out %%] block");
        this.DefaultText.push("save often.        drink water often... its hot outside");
        this.DefaultText.push("[ctrl]+click on special block let you interact with it");
        this.DefaultText.push("if you are stuck. library documentation is a good read");
        this.DefaultText.push("[loadblock ] bang when project start. Use it as your code main entry");
        this.DefaultText.push("[fill ] [pix ] [sqr ] let you draw on the output screen");
        this.DefaultText.push("[sin~ ] [sqr~ ] [saw~ ] are oscillator blocks. it produced sound");
        this.DefaultText.push("wanna start a community? save your code as .lib and share it on the web");

        
        
    }
    AddEventText(text)
    {
        if ( this.EventText.length>0)
        {
            if ( this.EventText[this.EventText.length-1] == text)return;
        }
        this.EventText.push(text);prompt.ineventmode=true;
    }
    Draw()
    {
        this.BlankWindow();
        var g = this.Canvas.context;
        g.strokeRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
    }
    BlankWindow()
    {
        var g = this.Canvas.context;
        g.fillStyle = VisualParameters.PrompterFillColor
        g.fillRect(1,1,this.Canvas.box.w-1, this.Canvas.box.h-1);
        g.fillStyle = VisualParameters.PrompterStrokeColor
    }
    DrawEvent()
    {
        if ( !prompt.ineventmode)
            return;
        var g = prompt.Canvas.context;
        g.fillStyle = VisualParameters.PrompterHighlightColor
        g.lineWidth = 3;
        g.fillRect(1,1,prompt.Canvas.box.w-1, prompt.Canvas.box.h-1);
        g.fillStyle = VisualParameters.PrompterStrokeColor
        
        var chaintext = prompt.EventText[0];
        var dimfromcanv = prompt.Canvas.box.h/2 + VisualParameters.PrompterFontSize/2;
        // Blinking effect
        if ( prompt.eventtimer % 2 == 0 )
        {
            g.fillStyle = VisualParameters.PrompterStrokeColor
            //'rgb(255,50,211)';//'rgb(0,0,255)';
            g.font = VisualParameters.PrompterFont;
            g.fillText(chaintext, dimfromcanv , dimfromcanv);
        }
        prompt.eventtimer++;
        if ( prompt.eventtimer > 5 )
        {
            prompt.eventtimer =0 ;
            prompt.EventText.splice(0,1);
            if ( prompt.EventText.length == 0 )
                 prompt.ineventmode = false;
        }
    }
    DrawText()
    {
        if ( prompt.ineventmode)
            return;
        prompt.BlankWindow();
        // One message at a time 
        var chaintext = "";
        chaintext = prompt.DefaultText[prompt.defaultIndex];
        var g = prompt.Canvas.context;
        //'rgb(255,50,211)';//'rgb(0,0,255)';
         var dimfromcanv = prompt.Canvas.box.h/2 + VisualParameters.PrompterFontSize/2;
        g.font = VisualParameters.PrompterFont;
        g.fillText(chaintext, prompt.xdelta , dimfromcanv);
        
        prompt.xdelta --;
        if (prompt.xdelta < 20*(-chaintext.length))
        {
            prompt.xdelta = prompt.Canvas.box.w;
            // @ Switch in default mode 
            prompt.defaultIndex++;
            if ( prompt.defaultIndex >= prompt.DefaultText.length)
                prompt.defaultIndex = 0;
        }
        
    }
}

