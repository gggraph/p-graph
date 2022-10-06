// random-noise-processor.js
class AudioClampProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(){
      return[{
          name : 'min', defaultValue: 0,
          name : 'max', defaultValue: 1,
      }]
  }
  constructor(){super();}    
  process(inputs,outputs, parameters)
  {
      let input = inputs[0];
      let output = outputs[0];
      for (let channel = 0; channel < input.length; ++channel)
      {
         // iterate through sample 
         for (let i = 0 ; i < input[channel].length; ++i)
         {
            output[channel][i] = input[channel][i] / 2 + 0.5;
         }
      }
      return true;
          
  }
}

registerProcessor("audio-clamp-processor", AudioClampProcessor);
