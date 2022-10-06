
// Access Midi data 

let midi = null;  // global MIDIAccess object

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess;  
    
    // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midi)
   sendMiddleC(midi,"output-1");
}
function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

// Lister les INPUTS/OUTPUTS...
function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    console.log(`Input port [type:'${input.type}']` +
      ` id:'${input.id}'` +
      ` manufacturer:'${input.manufacturer}'` +
      ` name:'${input.name}'` +
      ` version:'${input.version}'`);
  }

  for (const entry of midiAccess.outputs) {
    const output = entry[1];
    console.log(`Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`);
  }
}
function SendKeyOn(keynote, vel, portID )
{
  if ( midi == null )
       return;
  var noteOnMessage = [0x90, keynote, vel]; 
  var output = midi.outputs.get("output-"+portID);
  output.send(noteOnMessage);
    
}
function SendKeyOff(keynote, portID )
{
  if ( midi == null )
       return;
  var noteOnMessage = [0x80, keynote, 0x40]; 
  var output = midi.outputs.get("output-"+portID);
  output.send(noteOnMessage);
    
}
function SendMidiMessage(message, portID)
{
    if ( midi == null )
        return;
    var arr = message.split(' ');
    var msgb = new Array()
    for ( var i = 0 ; i < arr.length ; i++ )
    {
        msgb.push(Number(arr[i]))
        console.log(Number(arr[i]))
    }
        
    var output = midi.outputs.get("output-"+portID)
    output.send(msgb);  
}
function sendMiddleC(midiAccess, portID) {
  const noteOnMessage = [0x90, 0x60, 0x7f];    // note on, middle C, full velocity
  const output = midiAccess.outputs.get(portID);
  output.send(noteOnMessage); // sends the message.
}

