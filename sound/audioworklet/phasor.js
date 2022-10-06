class PhasorProcessor extends AudioWorkletProcessor {
   static get parameterDescriptors(){
     return [{
      name: 'frequency',
      defaultValue: 0.0,
      automationRate: "a-rate"
    }];
   }
  constructor(){super();this.c = 0;}    
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    for (let i = 0 ; i < output[0].length; i++)
    {
        var freq = parameters.frequency.length > 1 ? parameters.frequency[i] : parameters.frequency[0]
        output[0][i] = this.c;
        this.c += freq/sampleRate;
        if (this.c >= 1)
            this.c = 0;
    }
    return true;
  }
}

registerProcessor("phasor-processor", PhasorProcessor);