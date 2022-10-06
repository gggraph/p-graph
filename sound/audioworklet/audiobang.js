// random-noise-processor.js
class AudioBangProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(){
      return[{
          name : 'exciter', defaultValue: 0,
      }]
  }
  constructor(){super(); this.triggeredLast = false;}    
  process(inputs,outputs, parameters)
  {
      let input = inputs[0];
      var f = false;
      for (let channel = 0; channel < input.length; ++channel)
      {
         // iterate through sample 
         for (let i = 0 ; i < input[channel].length; ++i)
         {
             if (input[channel][i] >= 0 && !f) 
             {
                 if ( !this.triggeredLast )
                 {
                    this.port.postMessage(0); // send msg to node
                    this.triggeredLast = true;
                 }
                 f= true;
             }
         }
      }
      if ( !f && this.triggeredLast)
      {
          //this.port.postMessage(0);
          this.triggeredLast = false;
      }
          
  }
}

registerProcessor("audio-bang-processor", AudioBangProcessor);

