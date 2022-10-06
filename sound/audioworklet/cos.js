class AudioCosProcessor extends AudioWorkletProcessor {
  constructor(){super();}    
  process(inputs,outputs, parameters)
  {
      let input = inputs[0];
      let output = outputs[0];
      for (let channel = 0; channel < input.length; channel++)
      {
         // iterate through sample 
         for (let i = 0 ; i < input[channel].length; i++)
         {
            output[channel][i] = Math.cos(2 * Math.PI * input[channel][i])  ;
         }
      }
      return true;
          
  }
}

registerProcessor("audio-cos-processor", AudioCosProcessor);