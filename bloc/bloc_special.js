// @ Code for drawing/interacting special blocs 

/*
    TODO : 
    -<tab & disp object 
*/

function TryDrawSpecial(bloc)
{
    // Try Draw slider
   switch ( bloc.typename)
   {
       case "switch" : DrawSwitch(bloc); return true;
       case "number": DrawNumbBox(bloc);return true; 
       case "bang": DrawBang(bloc);return true; 
       case "slider": DrawSlider(bloc);return true; 
       case "knob": DrawKnob(bloc);return true;  
       case "tab": DrawTab(bloc);return true;  
       case "graph": DrawGraph(bloc);return true;  
   }
   return false;
    
}
function TryInteractSpecial(bloc)
{
    // Try Draw slider
   switch ( bloc.typename)
   {
       case "switch" : return InteractSwitch(bloc); 
       case "number":return InteractNumBox(bloc); 
       case "bang":   return InteractBang(bloc);
       case "slider": return InteractSlider(bloc);
       case "knob": return InteractKnob(bloc);
       case "tab": return InteractTab(bloc);
       case "graph": return InteractGraph(bloc);
   }
   return false;
    
}

function DrawTab(bloc)
{
    var _g = bloc.displayCanvas.context;
    // @ too display box object 
    var w = 100;
    var h = 100;
    
    // @ Draw display (little square pix )

    // Fill 
    _g.fillStyle = 'rgb(255,255,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    // Draw pix values 
    var pixsize = w/bloc.memory[3].length;
    // set pixel color
    _g.fillStyle = 'rgb(0,0,255)';
    var i;
    for (i = 0 ; i <bloc.memory[3].length; i++ )
    {
        // draw pix as color
        var p = bloc.memory[3][i];
        _g.fillRect(bloc.bodyBox.x+(i*pixsize),bloc.bodyBox.y+p,pixsize,pixsize);
    }
   
    // Draw IO
    var segwidth = w / 3 ; // width divide by maxslot which is 3  
    var iostartpos  = bloc.bodyBox.x +w/segwidth ; 
    var px = iostartpos;
    for ( i = 0 ; i < bloc.inputslots.length; i++ )
    {
        _g.fillStyle = 'rgb(0,0,0)';
        bloc.inputsboxes[i].x = px; 
        bloc.inputsboxes[i].y = bloc.bodyBox.y - bloc.inputsboxes[i].h;
        if (IsMouseInsideBox(bloc.inputsboxes[i],bloc.displayCanvas) ){
            _g.fillStyle = 'rgb(255,0,0)';
        }
        _g.fillRect(px , bloc.inputsboxes[i].y, bloc.inputsboxes[i].w,bloc.inputsboxes[i].h);
        px += segwidth;
    }
    px = iostartpos;
    for ( i = 0 ; i < bloc.outputslots.length; i++ )
    {
        _g.fillStyle = 'rgb(0,0,0)';
           
        bloc.outputsboxes[i].x = px; 
        bloc.outputsboxes[i].y = bloc.bodyBox.y + bloc.bodyBox.h;
        if (IsMouseInsideBox(bloc.outputsboxes[i],bloc.displayCanvas) ){
            _g.fillStyle = 'rgb(255,0,0)';
        }
        _g.fillRect(px , bloc.outputsboxes[i].y, bloc.outputsboxes[i].w,bloc.outputsboxes[i].h);
         px += segwidth;
    }
    
    // Outline
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
    _g.strokeRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    _g.lineWidth = 1;
    
    bloc.DrawWires();
    //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
    
}

function InteractTab(bloc)
{
    if ( IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
       var val = mouseY - bloc.displayCanvas.box.y - bloc.bodyBox.y;
       var index = Math.round((mouseX - bloc.displayCanvas.box.x - bloc.bodyBox.x) / 100 * 50);
       bloc.memory[3][index] = val; return true;
    }
    return false;
}
function DrawGraph(bloc)
{
    var _g = bloc.displayCanvas.context;
    // @ too display box object 
    var w = 100;
    var h = 100;
    
    // @ Draw display (little square pix )
    // Fill 
    _g.fillStyle = 'rgb(255,255,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    // Draw pix values 
    var pixsize = w/bloc.memory[5].length;
    // set pixel color
    _g.fillStyle = 'rgb(0,0,255)';
    var i;
    for (i = 0 ; i <bloc.memory[5].length; i++ )
    {
        // draw pix as color
        var n;
        for (n = 0; n < bloc.memory[5][i].length; n++)
        {
            if ( bloc.memory[5][i][n] > 0 )
            {
                _g.fillRect(bloc.bodyBox.x+(i*pixsize),bloc.bodyBox.y+(n*pixsize),pixsize,pixsize);
            }
        }
        
    }
   
    // Draw IO
    var segwidth = w / 5 ; // width divide by maxslot which is 3  
    var iostartpos  = bloc.bodyBox.x +w/segwidth ; 
    var px = iostartpos;
    for ( i = 0 ; i < bloc.inputslots.length; i++ )
    {
        _g.fillStyle = 'rgb(0,0,0)';
        bloc.inputsboxes[i].x = px; 
        bloc.inputsboxes[i].y = bloc.bodyBox.y - bloc.inputsboxes[i].h;
        if (IsMouseInsideBox(bloc.inputsboxes[i],bloc.displayCanvas) ){
            _g.fillStyle = 'rgb(255,0,0)';
        }
        _g.fillRect(px , bloc.inputsboxes[i].y, bloc.inputsboxes[i].w,bloc.inputsboxes[i].h);
        px += segwidth;
    }
    px = iostartpos;
    for ( i = 0 ; i < bloc.outputslots.length; i++ )
    {
        _g.fillStyle = 'rgb(0,0,0)';
           
        bloc.outputsboxes[i].x = px; 
        bloc.outputsboxes[i].y = bloc.bodyBox.y + bloc.bodyBox.h;
        if (IsMouseInsideBox(bloc.outputsboxes[i],bloc.displayCanvas) ){
            _g.fillStyle = 'rgb(255,0,0)';
        }
        _g.fillRect(px , bloc.outputsboxes[i].y, bloc.outputsboxes[i].w,bloc.outputsboxes[i].h);
         px += segwidth;
    }
    
    // Outline
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
    _g.strokeRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    _g.lineWidth = 1;
    
    bloc.DrawWires();
    //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
    
}

function InteractGraph(bloc)
{
    if ( IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
       var x = Math.round((mouseX - bloc.displayCanvas.box.x - bloc.bodyBox.x) / 100 * 50);
       var y = Math.round((mouseY - bloc.displayCanvas.box.y - bloc.bodyBox.y) / 100 * 50);
       bloc.memory[5][x][y] = 1;
        return true;
    }
    bloc.DefaultInteract();
    return false;
}
function DrawNumbBox(bloc)
{
    var _g = bloc.displayCanvas.context;
    // Compute Width and Port distance
    var w = bloc.memory[0].toString().length * 12;
    if ( w < 25 )
    {
         w = 40 ;
    }
    var h = 25;
    // @ Draw Box
    // Plain color
    _g.fillStyle = 'rgb(255,255,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    
       // Outline
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
     _g.strokeRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
     _g.lineWidth = 1;
    
        // @ Draw IO Boxes
        //@ Draw OUT
    _g.fillStyle = 'rgb(0,0,0)';
    bloc.outputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.outputsboxes[0].y = bloc.bodyBox.y + bloc.bodyBox.h;
    if (IsMouseInsideBox(bloc.outputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.outputsboxes[0].x , bloc.outputsboxes[0].y, bloc.outputsboxes[0].w,bloc.outputsboxes[0].h);
    _g.fillStyle = 'rgb(0,0,0)';
    
    //@ Draw IN
    bloc.inputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.inputsboxes[0].y = bloc.bodyBox.y - bloc.inputsboxes[0].h;
    if (IsMouseInsideBox(bloc.inputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.inputsboxes[0].x , bloc.inputsboxes[0].y, bloc.inputsboxes[0].w,bloc.inputsboxes[0].h);
    // @ Print text
    _g.fillStyle = 'rgb(0,0,0)';
    _g.font = "16px Autopia";
    _g.fillText(bloc.memory[0].toString(),bloc.bodyBox.x + 5,bloc.bodyBox.y+16 );
    // @ Draw Wires
    bloc.DrawWires();
    //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
        
}

function InteractNumBox(bloc)
{
   
    if ( IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
        bloc.waspressed = true;
    }
    if ( bloc.waspressed == true && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode) )
    {
         // Get MouseY distance from bodyboxY
        var val = (mouseY - bloc.displayCanvas.box.y) - bloc.bodyBox.y; 
        val = Math.floor(val/2);
        bloc.memory[0] = bloc.tempmemvalue - val;
        // Get Mouse relative to 
        bloc.OIO();
        return true;
    }
    // @ Save a temp memory 
    bloc.waspressed = false;
    bloc.tempmemvalue = bloc.memory[0];
    return false;
}

function DrawSwitch(bloc)
{
    if ( bloc.outputsboxes.length == 0 || bloc.inputsboxes.length == 0)
        return;
    var _g = bloc.displayCanvas.context;
    var w = 20; // can be in param
    var h = 20; // can be in param
    
    // @ Draw Box
    // Plain color
    _g.fillStyle = 'rgb(255,255,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    
    
    //@ Draw OUT
    _g.fillStyle = 'rgb(0,0,0)';
    bloc.outputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.outputsboxes[0].y = bloc.bodyBox.y + bloc.bodyBox.h;
    if (IsMouseInsideBox(bloc.outputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.outputsboxes[0].x , bloc.outputsboxes[0].y, bloc.outputsboxes[0].w,bloc.outputsboxes[0].h);
    _g.fillStyle = 'rgb(0,0,0)';
    
    //@ Draw IN
    bloc.inputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.inputsboxes[0].y = bloc.bodyBox.y - bloc.inputsboxes[0].h;
    if (IsMouseInsideBox(bloc.inputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.inputsboxes[0].x , bloc.inputsboxes[0].y, bloc.inputsboxes[0].w,bloc.inputsboxes[0].h);
    
    //@ Draw Cross 
    if ( bloc.memory[1] > 0)
    {
        _g.strokeStyle = "rgba(0,0,0)"; 
        _g.lineWidth = 1;
        
        // First line 
        _g.beginPath();
        _g.moveTo(bloc.bodyBox.x, bloc.bodyBox.y);
        _g.lineTo(bloc.bodyBox.x+bloc.bodyBox.w, bloc.bodyBox.y+bloc.bodyBox.h);
        _g.closePath();
        _g.stroke();
        // First line 
        _g.beginPath();
        _g.moveTo(bloc.bodyBox.x, bloc.bodyBox.y+bloc.bodyBox.h);
        _g.lineTo(bloc.bodyBox.x+bloc.bodyBox.w, bloc.bodyBox.y);
        _g.closePath();
        _g.stroke();
    }
    
     // Outline
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
     _g.strokeRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
     _g.lineWidth = 1;
    //@ Draw wires
    bloc.DrawWires();
     //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
}
function InteractSwitch(bloc)
{
   
    if ( bloc.waspressed == 'undefined')
    {
        bloc.waspressed = false;
    }
    if ( !bloc.waspressed && IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
        bloc.waspressed = true;
        if ( bloc.memory[1] > 0 )
            bloc.memory[1] = 0;
        else
            bloc.memory[1] = 1;
        
        return true;
    }
    if ( bloc.waspressed && !bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode) )
    {
        bloc.waspressed = false; return true;
     
    }

    return false;
}
function DrawBang(bloc)
{
    if ( bloc.outputsboxes.length == 0 || bloc.inputsboxes.length == 0)
        return;
    var _g = bloc.displayCanvas.context;
    var w = 20; // can be in param
    var h = 20; // can be in param
    
    // @ Draw Box
    // Plain color
    _g.fillStyle = 'rgb(255,255,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    
    
    //@ Draw OUT
    _g.fillStyle = 'rgb(0,0,0)';
    bloc.outputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.outputsboxes[0].y = bloc.bodyBox.y + bloc.bodyBox.h;
    if (IsMouseInsideBox(bloc.outputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.outputsboxes[0].x , bloc.outputsboxes[0].y, bloc.outputsboxes[0].w,bloc.outputsboxes[0].h);
    _g.fillStyle = 'rgb(0,0,0)';
    
    //@ Draw IN
    bloc.inputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.inputsboxes[0].y = bloc.bodyBox.y - bloc.inputsboxes[0].h;
    if (IsMouseInsideBox(bloc.inputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.inputsboxes[0].x , bloc.inputsboxes[0].y, bloc.inputsboxes[0].w,bloc.inputsboxes[0].h);
    
    //@ Draw circle
    var centerX = bloc.bodyBox.x + bloc.bodyBox.w / 2;
    var centerY = bloc.bodyBox.y + bloc.bodyBox.h / 2;
    _g.beginPath();
    _g.arc(centerX, centerY, w/2, 0, 2* Math.PI, false);
    _g.fillStyle =  'rgb(255,255,255)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && ctrlPressed)
    {
        _g.fillStyle =  'rgb(0,0,255)';
    }
    _g.fill();
    _g.lineWidth = 1;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
    _g.stroke();
    _g.closePath();
    
     // Outline
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
     _g.strokeRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
     _g.lineWidth = 1;
    //@ Draw wires
    bloc.DrawWires();
     //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
}

function InteractBang(bloc)
{
    if ( bloc.waspressed == 'undefined')
    {
        bloc.waspressed = false;
    }
    if ( !bloc.waspressed && IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
        bloc.OIO();
        bloc.waspressed = true;
        console.log("bang!");
        return true;
    }
    if ( bloc.waspressed && !bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode) )
    {
        bloc.waspressed = false; return true;
     
    }
    return false;
}

function DrawSlider(bloc)
{
    if ( bloc.outputsboxes.length == 0 || bloc.inputsboxes.length == 0)
        return;
    var _g = bloc.displayCanvas.context;
    var w = 20; // can be in param
    var h = 100; // can be in param
    // @ Draw Box
    // Plain color
    _g.fillStyle = 'rgb(255,255,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
    
    
    //@ Draw OUT
    _g.fillStyle = 'rgb(0,0,0)';
    bloc.outputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.outputsboxes[0].y = bloc.bodyBox.y + bloc.bodyBox.h;
    if (IsMouseInsideBox(bloc.outputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.outputsboxes[0].x , bloc.outputsboxes[0].y, bloc.outputsboxes[0].w,bloc.outputsboxes[0].h);
    _g.fillStyle = 'rgb(0,0,0)';
    
    //@ Draw IN
    bloc.inputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.inputsboxes[0].y = bloc.bodyBox.y - bloc.inputsboxes[0].h;
    if (IsMouseInsideBox(bloc.inputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.inputsboxes[0].x , bloc.inputsboxes[0].y, bloc.inputsboxes[0].w,bloc.inputsboxes[0].h);
    
    //@ Draw Slider
    var min = 0; 
    var max = 200;
    var sliderpos = bloc.memory[0] / max;
    _g.fillStyle = 'rgb(0,0,255)';
    _g.fillRect(bloc.bodyBox.x,bloc.bodyBox.y+sliderpos*h,w,h/16);
    
    // Outline
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
     _g.strokeRect(bloc.bodyBox.x,bloc.bodyBox.y,w,h);
     _g.lineWidth = 1;
    //@ Draw wires
    bloc.DrawWires();
     //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
}
function InteractSlider(bloc)
{
    if ( IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
        // Redraw slider at pos. Then recompute Mem(0)
        var _g = bloc.displayCanvas.context;
        var w = 20; // can be in param
        var h = 100; // can be in param
        var min = 0; // can be in param
        var max = 200;// can be in param
        var sliderpos = bloc.memory[0] / max;
        _g.fillStyle = 'rgb(0,0,255)';
        _g.fillRect(bloc.bodyBox.x,mouseY-bloc.displayCanvas.box.y,w,h/16);
        // @ Set Mem value
        bloc.memory[0] = (mouseY-bloc.displayCanvas.box.y - bloc.bodyBox.y) * max /  h;
        // bang ! 
        bloc.OIO();
        return true;
    }
    return false;
}
function DrawKnob(bloc)
{
     if ( bloc.outputsboxes.length == 0 || bloc.inputsboxes.length == 0)
        return;
    var _g = bloc.displayCanvas.context;
    var w = 60; // can be in param. This is in fact radius
    var h = 60; // can be in param
    // @ Draw Box
    
    var centerX = bloc.bodyBox.x + bloc.bodyBox.w / 2;
    var centerY = bloc.bodyBox.y + bloc.bodyBox.h / 2;
    _g.beginPath();
    _g.arc(centerX, centerY, w/2, 0, 2* Math.PI, false);
    _g.fillStyle =  'rgb(255,255,255)';
    _g.fill();
    _g.lineWidth = 3;
    _g.strokeStyle = 'rgb(0,0,0)';
    if (IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) || bloc.CurrentlyInteract() )
    {
        _g.strokeStyle = 'rgb(0,0,255)';
    }
    _g.stroke();
    _g.closePath();
     
    //@ Draw OUT
    _g.fillStyle = 'rgb(0,0,0)';
    bloc.outputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.outputsboxes[0].y = bloc.bodyBox.y + bloc.bodyBox.h;
    if (IsMouseInsideBox(bloc.outputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.outputsboxes[0].x , bloc.outputsboxes[0].y, bloc.outputsboxes[0].w,bloc.outputsboxes[0].h);
    _g.fillStyle = 'rgb(0,0,0)';
    
    //@ Draw IN
    bloc.inputsboxes[0].x = bloc.bodyBox.x + bloc.bodyBox.w/2; 
    bloc.inputsboxes[0].y = bloc.bodyBox.y - bloc.inputsboxes[0].h;
    if (IsMouseInsideBox(bloc.inputsboxes[0],bloc.displayCanvas) ){
        _g.fillStyle = 'rgb(255,0,0)';
    }
    _g.fillRect( bloc.inputsboxes[0].x , bloc.inputsboxes[0].y, bloc.inputsboxes[0].w,bloc.inputsboxes[0].h);
    
    // @ Draw cursor
     var min = 0; 
     var max = 200;
    
     // @ get angle this one works ! 
     var angle = (bloc.memory[0] / max) * 360; 
     angle += 90; 
     _g.strokeStyle = "rgba(0,0,0)"; 
     _g.lineWidth = 5;
     _g.beginPath();
     _g.moveTo( centerX ,centerY);
      var aX = centerX + (w/2 * Math.cos(degrees_to_radians(angle)));  
      var aY = centerY + (w/2 * Math.sin(degrees_to_radians(angle)));
     _g.lineTo(aX,aY);
     _g.closePath();
     _g.stroke();
    
    
    //@ Draw wires
    bloc.DrawWires();
       
   
     //@ Update W & H
    bloc.bodyBox.w = w;
    bloc.bodyBox.h = h;
}

function InteractKnob(bloc)
{
    if ( IsMouseInsideBox(bloc.bodyBox,bloc.displayCanvas) && bloc.displayCanvas.mousepressed && (ctrlPressed||inPlayMode))
    {
        // Redraw slider at pos. Then recompute Mem(0)
        var _g = bloc.displayCanvas.context;
        var w = 60;
        var min = 0; 
        var max = 200;
        var centerX = bloc.bodyBox.x + bloc.bodyBox.w / 2;
        var centerY = bloc.bodyBox.y + bloc.bodyBox.h / 2;
        var angle = getAngle(mouseX-bloc.displayCanvas.box.x, mouseY-bloc.displayCanvas.box.y, centerX,centerY );
        angle = 360 - (angle);
        
        var adjustedAngle = angle- 90;
        if ( adjustedAngle <= 0 )
            adjustedAngle = 270 + (90+adjustedAngle);
        
        // @ set memory 0 to 
        bloc.memory[0] = (adjustedAngle / 360) * max;
        
        
       _g.strokeStyle = "rgba(0,0,0)"; 
       _g.lineWidth = 5;
       _g.beginPath();
       _g.moveTo( centerX ,centerY);
       var aX = centerX + (w/2 * Math.cos(degrees_to_radians(angle)));  
       var aY = centerY + (w/2 * Math.sin(degrees_to_radians(angle)));
       _g.lineTo(aX,aY);
       _g.closePath();
       _g.stroke();
        
        // Call IOI
        bloc.OIO();
            
        return true;
    }
    return false;
}


