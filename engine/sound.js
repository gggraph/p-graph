// CONTEXT AND MASTER VOLUME 
var AudioContext = window.AudioContext ||
    window.webkitAudioContext;
const context = new AudioContext();
const masterVolume = context.createGain();

// Connect and setup general volume
masterVolume.connect(context.destination);
masterVolume.gain.value = 0.2;

// Create effect delay
// Delay Creation
const delay = context.createDelay();
const feedback = context.createGain();
const delayAmountGain = context.createGain();
delayAmountGain.connect(delay)
delay.connect(feedback)
feedback.connect(delay)
delay.connect(masterVolume)
// Values of delay : good between 0.3 and 0.5
delay.delayTime.value = 0;
delayAmountGain.gain.value = 0;
feedback.gain.value = 0;


// @ Type of Waves : sine square triangle sawtooth
class Wave
{
    constructor(waveform, frequency, length = 1)
    {
        // waveform
        this.waveform = waveform;
        // enveloppe
        this.attackTime = 0.3;
        this.sustainLevel = 0.8;
        this.releaseTime = 0.3;
        // Note 
        this.frequency = frequency;
        this.noteLength = length;
        // vibrato
        this.vibratoSpeed = 10;
        this.vibratoAmount = 0;
        
    }
    SetEnvelope(attack, sustain, release)
    {
        this.attackTime = attack;
        this.sustainLevel = sustain;
        this.releaseTime = release;
    }
    SetVibrato(amount,speed)
    {
        this.vibratoAmount = amount;
        this.vibratoSpeed = speed;
    }
}
function SetVolume(value)
{
     masterVolume.gain.value = value;
}
function SetDelay(amount, time, fdback)
{
    delayAmountGain.value = amount;
    delay.delayTime.value = time;
    feedback.gain.value = fdback;
}

function PlayWave(wave)
{
    const osc = context.createOscillator();
    const noteGain = context.createGain();
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.gain.linearRampToValueAtTime(wave.sustainLevel, context.currentTime + wave.noteLength * wave.attackTime);
    noteGain.gain.setValueAtTime(wave.sustainLevel, context.currentTime + wave.noteLength - wave.noteLength * wave.releaseTime);
    noteGain.gain.linearRampToValueAtTime(0, context.currentTime + wave.noteLength);

    lfoGain = context.createGain();
    lfoGain.gain.setValueAtTime(wave.vibratoAmount, 0);
    lfoGain.connect(osc.frequency)

    lfo = context.createOscillator();
    lfo.frequency.setValueAtTime(wave.vibratoSpeed, 0);
    lfo.start(0);
    lfo.stop(context.currentTime + wave.noteLength);
    lfo.connect(lfoGain); 

    osc.type = wave.waveform;
    osc.frequency.setValueAtTime(wave.frequency, 0);
    osc.start(0);
    osc.stop(context.currentTime + wave.noteLength);
    osc.connect(noteGain);

    noteGain.connect(masterVolume);
    noteGain.connect(delay);
}

