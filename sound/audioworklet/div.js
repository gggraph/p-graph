class AudioDivProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(){
     return [{
      name: 'defaultvalue',
      defaultValue: 1,
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
            var d = parameters.defaultvalue.length > 1 ? parameters.defaultvalue[i] : parameters.defaultvalue[0]
            if ( inputs[1].length != 0 )
            {
                d = other[channel][i];
            }
            output[channel][i] = input[channel][i] / d;
         }
    }
    return true;
  }
}

registerProcessor("audio-div-processor", AudioDivProcessor);
