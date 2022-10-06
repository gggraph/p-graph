class AudioSigProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(){
     return [{
      name: 'offset',
      defaultValue: 0.5,
      minValue: 0.0,
      maxValue: 1000.0,
      automationRate: "a-rate"
    }];
  }
  process(inputs, outputs, parameters) {
    var offsets =  parameters.offset;
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const offset = offsets.length > 1 ? offsets[i] : offsets[0]
        channel[i] =offset;
      }
    });
    return true;
  }
}

registerProcessor("audio-sig-processor", AudioSigProcessor);