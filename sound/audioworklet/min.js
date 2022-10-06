class AudioMinProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(){
     return [{
      name: 'defaultvalue',
      defaultValue: 0.0,
      automationRate: "a-rate"
    }];
   }
  process(inputs, outputs, parameters) 
  {
   
    let input = inputs[0];
    let other = inputs[1];
    let output = outputs[0];
    for (let channel = 0; channel < input.length; channel++)
    {
         // iterate through sample 
         for (let i = 0 ; i < input[channel].length; i++)
         {
            var defval = parameters.defaultvalue.length > 1 ? parameters.defaultvalue[i] : parameters.defaultvalue[0];
            var val = input[channel][i];
            if ( inputs[1].length != 0 )
            {
                if ( other[channel][i] < val){val = other[channel][i];}
                
            }
            else
            {
                if ( defval < val){val = defval;}     
            }
                 
            output[channel][i] = val;
         }
    }
    return true;
  }
}

registerProcessor("audio-min-processor", AudioMinProcessor);