// Here we will just define variables...
var AudioContext = window.AudioContext ||
    window.webkitAudioContext;
// Load audio context named audioContext
const audioContext = new AudioContext();
// Create a general volume
const masterVolume = audioContext.createGain();
masterVolume.connect(audioContext.destination);
// set volume to middle.
masterVolume.gain.value = 0.5;

// Get a general microphone

var microphone = null;

async function OnNodeConnect(otherblock, _to)
{
   if ( otherblock.caprm == null ){otherblock.caprm = new Array()}
   otherblock.caprm.push(_to);
   while ( _to == null || otherblock.audioNode == null) { 
       await wait(1000);} 
   
   //console.log("audio connecting audionode of "+otherblock.audioNode+ " to " + _to  )
   otherblock.audioNode.connect(_to);
   
}
async function OnNodeConnectSpecific(otherblock, _to,outputIndex=0, inputIndex=0)
{
   if ( otherblock.caprm == null ){otherblock.caprm = new Array()}
   otherblock.caprm.push(_to);
   while ( _to == null || otherblock.audioNode == null) { 
       await wait(1000);} 
   otherblock.audioNode.connect(_to,outputIndex,inputIndex);
   
}
async function OnNodeDisconnect(otherblock, _to)
{
   if ( otherblock.caprm != null )
   {
       var idx= otherblock.caprm.indexOf(_to);
       if ( idx> -1){otherblock.caprm.splice(idx,1)}
       
   }
   while ( _to == null || otherblock.audioNode == null) {await wait(1000);} 
   otherblock.audioNode.disconnect(_to);
  
   
}
async function OnNodeDisconnectSpecific(otherblock, _to,outputIndex=0, inputIndex=0)
{
   if ( otherblock.caprm != null )
   {
       var idx= otherblock.caprm.indexOf(_to);
       if ( idx> -1){otherblock.caprm.splice(idx,1)}
       
   }
   while ( _to == null || otherblock.audioNode == null) {await wait(1000);} 
   otherblock.audioNode.disconnect(_to,outputIndex,inputIndex);
  
   
}
// @ Oscillo are block object ...
var Oscillosopes = new Array();

function AddOscilloToDraw(bloc)
{
    Oscillosopes.push(bloc)
}
// @ A dummy function to draw oscillos
function DrawOscillos()
{
    for ( var o = Oscillosopes.length -1 ; o >= 0; o--)
    {
        
        if ( Oscillosopes[o] == null )
        {
            // splice & continue...
            Oscillosopes.splice(o,1);
            continue;
        }
        if ( !Blocks.includes(Oscillosopes[o]))
        {
             Oscillosopes.splice(o,1);
            continue;
        }
        if ( !Oscillosopes[o].On )
            continue;
        var sliceWidth = Oscillosopes[o].memory[1] * 1.0 / Oscillosopes[o].bufferLength;
        Oscillosopes[o].analyser.getByteTimeDomainData(Oscillosopes[o].dataArray);
        
        OutputCanvas.FillSquare(0,0,Oscillosopes[o].memory[1],'rgb(0,0,0)')
        OutputCanvas.context.lineWidth = Oscillosopes[o].memory[2];
        OutputCanvas.context.strokeStyle = 'rgb(0,255,0)'
        OutputCanvas.context.beginPath();
        
        let x = 0;
        for (let i = 0; i < Oscillosopes[o].bufferLength; i++) {
            const v = Oscillosopes[o].dataArray[i] / 128.0;
            const y = v * (Oscillosopes[o].memory[1] / 2);
            if (i === 0) {
            OutputCanvas.context.moveTo(x, y);
            } else {
            OutputCanvas.context.lineTo(x, y);
            }
            x += sliceWidth;
        }
        
        OutputCanvas.context.lineTo( Oscillosopes[o].memory[1],  Oscillosopes[o].memory[1] / 2);
        OutputCanvas.context.stroke();
    }
 
}

setInterval(DrawOscillos, 10);

