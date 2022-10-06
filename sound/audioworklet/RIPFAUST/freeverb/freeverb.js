
/*
Code generated with Faust version 2.49.1
Compilation options: -lang wasm-ib -cn freeverb -es 1 -mcd 16 -single -ftz 2 
*/

function getJSONfreeverb() {
	return '{"name": "freeverb","filename": "freeverb.dsp","version": "2.49.1","compile_options": "-lang wasm-ib -cn freeverb -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/8004B963A997F610D7C5425434F2FE26C565EC96/web/wasmjs-worklet"],"size": 586148,"inputs": 2,"outputs": 2,"meta": [ { "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "delays_lib_name": "Faust Delay Library" },{ "delays_lib_version": "0.1" },{ "demos_lib_freeverb_demo_author": " Romain Michon" },{ "demos_lib_freeverb_demo_licence": "LGPL" },{ "demos_lib_name": "Faust Demos Library" },{ "demos_lib_version": "0.1" },{ "filename": "freeverb.dsp" },{ "filters_lib_allpass_comb_author": "Julius O. Smith III" },{ "filters_lib_allpass_comb_copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters_lib_allpass_comb_license": "MIT-style STK-4.3 license" },{ "filters_lib_lowpass0_highpass1": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters_lib_name": "Faust Filters Library" },{ "filters_lib_version": "0.3" },{ "library_path0": "/libraries/stdfaust.lib" },{ "library_path1": "/libraries/demos.lib" },{ "library_path2": "/libraries/reverbs.lib" },{ "library_path3": "/libraries/maths.lib" },{ "library_path4": "/libraries/platform.lib" },{ "library_path5": "/libraries/filters.lib" },{ "library_path6": "/libraries/delays.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.5" },{ "name": "freeverb" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "0.2" },{ "reverbs_lib_mono_freeverb_author": "Romain Michon" },{ "reverbs_lib_name": "Faust Reverb Library" },{ "reverbs_lib_stereo_freeverb_author": "Romain Michon" },{ "reverbs_lib_version": "0.2" },{ "version": "2.50.2" }],"ui": [ {"type": "hgroup","label": "Freeverb","items": [ {"type": "vgroup","label": "0x00","meta": [{ "0": "" }],"items": [ {"type": "vslider","label": "Damp","shortname": "Damp","address": "/Freeverb/0x00/Damp","index": 4,"meta": [{ "0": "" },{ "style": "knob" },{ "tooltip": "Somehow control the         density of the reverb." }],"init": 0.5,"min": 0,"max": 1,"step": 0.025},{"type": "vslider","label": "RoomSize","shortname": "RoomSize","address": "/Freeverb/0x00/RoomSize","index": 24,"meta": [{ "1": "" },{ "style": "knob" },{ "tooltip": "The room size         between 0 and 1 with 1 for the largest room." }],"init": 0.5,"min": 0,"max": 1,"step": 0.025},{"type": "vslider","label": "Stereo Spread","shortname": "Stereo_Spread","address": "/Freeverb/0x00/Stereo_Spread","index": 323844,"meta": [{ "2": "" },{ "style": "knob" },{ "tooltip": "Spatial         spread between 0 and 1 with 1 for maximum spread." }],"init": 0.5,"min": 0,"max": 1,"step": 0.01}]},{"type": "vslider","label": "Wet","shortname": "Wet","address": "/Freeverb/Wet","index": 0,"meta": [{ "1": "" },{ "tooltip": "The amount of reverb applied to the signal         between 0 and 1 with 1 for the maximum amount of reverb." }],"init": 0.3333,"min": 0,"max": 1,"step": 0.025}]}]}';
}
function getBase64Codefreeverb() { return "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c19saWJfZnJlZXZlcmJfZGVtb19saWNlbmNlIjogIkxHUEwiIH0seyAiZGVtb3NfbGliX25hbWUiOiAiRmF1c3QgRGVtb3MgTGlicmFyeSIgfSx7ICJkZW1vc19saWJfdmVyc2lvbiI6ICIwLjEiIH0seyAiZmlsZW5hbWUiOiAiZnJlZXZlcmIuZHNwIiB9LHsgImZpbHRlcnNfbGliX2FsbHBhc3NfY29tYl9hdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzX2xpYl9hbGxwYXNzX2NvbWJfY29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnNfbGliX2FsbHBhc3NfY29tYl9saWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVyc19saWJfbG93cGFzczBfaGlnaHBhc3MxIjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnNfbGliX25hbWUiOiAiRmF1c3QgRmlsdGVycyBMaWJyYXJ5IiB9LHsgImZpbHRlcnNfbGliX3ZlcnNpb24iOiAiMC4zIiB9LHsgImxpYnJhcnlfcGF0aDAiOiAiL2xpYnJhcmllcy9zdGRmYXVzdC5saWIiIH0seyAibGlicmFyeV9wYXRoMSI6ICIvbGlicmFyaWVzL2RlbW9zLmxpYiIgfSx7ICJsaWJyYXJ5X3BhdGgyIjogIi9saWJyYXJpZXMvcmV2ZXJicy5saWIiIH0seyAibGlicmFyeV9wYXRoMyI6ICIvbGlicmFyaWVzL21hdGhzLmxpYiIgfSx7ICJsaWJyYXJ5X3BhdGg0IjogIi9saWJyYXJpZXMvcGxhdGZvcm0ubGliIiB9LHsgImxpYnJhcnlfcGF0aDUiOiAiL2xpYnJhcmllcy9maWx0ZXJzLmxpYiIgfSx7ICJsaWJyYXJ5X3BhdGg2IjogIi9saWJyYXJpZXMvZGVsYXlzLmxpYiIgfSx7ICJtYXRoc19saWJfYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzX2xpYl9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHNfbGliX2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRoc19saWJfbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHNfbGliX3ZlcnNpb24iOiAiMi41IiB9LHsgIm5hbWUiOiAiZnJlZXZlcmIiIH0seyAicGxhdGZvcm1fbGliX25hbWUiOiAiR2VuZXJpYyBQbGF0Zm9ybSBMaWJyYXJ5IiB9LHsgInBsYXRmb3JtX2xpYl92ZXJzaW9uIjogIjAuMiIgfSx7ICJyZXZlcmJzX2xpYl9tb25vX2ZyZWV2ZXJiX2F1dGhvciI6ICJSb21haW4gTWljaG9uIiB9LHsgInJldmVyYnNfbGliX25hbWUiOiAiRmF1c3QgUmV2ZXJiIExpYnJhcnkiIH0seyAicmV2ZXJic19saWJfc3RlcmVvX2ZyZWV2ZXJiX2F1dGhvciI6ICJSb21haW4gTWljaG9uIiB9LHsgInJldmVyYnNfbGliX3ZlcnNpb24iOiAiMC4yIiB9LHsgInZlcnNpb24iOiAiMi41MC4yIiB9XSwidWkiOiBbIHsidHlwZSI6ICJoZ3JvdXAiLCJsYWJlbCI6ICJGcmVldmVyYiIsIml0ZW1zIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAiMHgwMCIsIm1ldGEiOiBbeyAiMCI6ICIiIH1dLCJpdGVtcyI6IFsgeyJ0eXBlIjogInZzbGlkZXIiLCJsYWJlbCI6ICJEYW1wIiwic2hvcnRuYW1lIjogIkRhbXAiLCJhZGRyZXNzIjogIi9GcmVldmVyYi8weDAwL0RhbXAiLCJpbmRleCI6IDQsIm1ldGEiOiBbeyAiMCI6ICIiIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIlNvbWVob3cgY29udHJvbCB0aGUgICAgICAgICBkZW5zaXR5IG9mIHRoZSByZXZlcmIuIiB9XSwiaW5pdCI6IDAuNSwibWluIjogMCwibWF4IjogMSwic3RlcCI6IDAuMDI1fSx7InR5cGUiOiAidnNsaWRlciIsImxhYmVsIjogIlJvb21TaXplIiwic2hvcnRuYW1lIjogIlJvb21TaXplIiwiYWRkcmVzcyI6ICIvRnJlZXZlcmIvMHgwMC9Sb29tU2l6ZSIsImluZGV4IjogMjQsIm1ldGEiOiBbeyAiMSI6ICIiIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIlRoZSByb29tIHNpemUgICAgICAgICBiZXR3ZWVuIDAgYW5kIDEgd2l0aCAxIGZvciB0aGUgbGFyZ2VzdCByb29tLiIgfV0sImluaXQiOiAwLjUsIm1pbiI6IDAsIm1heCI6IDEsInN0ZXAiOiAwLjAyNX0seyJ0eXBlIjogInZzbGlkZXIiLCJsYWJlbCI6ICJTdGVyZW8gU3ByZWFkIiwic2hvcnRuYW1lIjogIlN0ZXJlb19TcHJlYWQiLCJhZGRyZXNzIjogIi9GcmVldmVyYi8weDAwL1N0ZXJlb19TcHJlYWQiLCJpbmRleCI6IDMyMzg0NCwibWV0YSI6IFt7ICIyIjogIiIgfSx7ICJzdHlsZSI6ICJrbm9iIiB9LHsgInRvb2x0aXAiOiAiU3BhdGlhbCAgICAgICAgIHNwcmVhZCBiZXR3ZWVuIDAgYW5kIDEgd2l0aCAxIGZvciBtYXhpbXVtIHNwcmVhZC4iIH1dLCJpbml0IjogMC41LCJtaW4iOiAwLCJtYXgiOiAxLCJzdGVwIjogMC4wMX1dfSx7InR5cGUiOiAidnNsaWRlciIsImxhYmVsIjogIldldCIsInNob3J0bmFtZSI6ICJXZXQiLCJhZGRyZXNzIjogIi9GcmVldmVyYi9XZXQiLCJpbmRleCI6IDAsIm1ldGEiOiBbeyAiMSI6ICIiIH0seyAidG9vbHRpcCI6ICJUaGUgYW1vdW50IG9mIHJldmVyYiBhcHBsaWVkIHRvIHRoZSBzaWduYWwgICAgICAgICBiZXR3ZWVuIDAgYW5kIDEgd2l0aCAxIGZvciB0aGUgbWF4aW11bSBhbW91bnQgb2YgcmV2ZXJiLiIgfV0sImluaXQiOiAwLjMzMzMsIm1pbiI6IDAsIm1heCI6IDEsInN0ZXAiOiAwLjAyNX1dfV19"; }

/************************************************************************
 FAUST Architecture File
 Copyright (C) 2003-2019 GRAME, Centre National de Creation Musicale
 ---------------------------------------------------------------------
 This Architecture section is free software; you can redistribute it
 and/or modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 3 of
 the License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program; If not, see <http://www.gnu.org/licenses/>.
 
 EXCEPTION : As a special exception, you may create a larger work
 that contains this FAUST architecture section and distribute
 that work under terms of your choice, so long as this FAUST
 architecture section is not modified.
 
 ************************************************************************
 ************************************************************************/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
    alert("AudioWorklet is not supported in this browser !")
}

class freeverbNode extends AudioWorkletNode {

    constructor(context, baseURL, options) {
        super(context, 'freeverb', options);

        this.baseURL = baseURL;
        this.json = options.processorOptions.json;
        this.json_object = JSON.parse(this.json);

        // JSON parsing functions
        this.parse_ui = function (ui, obj) {
            for (var i = 0; i < ui.length; i++) {
                this.parse_group(ui[i], obj);
            }
        }

        this.parse_group = function (group, obj) {
            if (group.items) {
                this.parse_items(group.items, obj);
            }
        }

        this.parse_items = function (items, obj) {
            for (var i = 0; i < items.length; i++) {
                this.parse_item(items[i], obj);
            }
        }

        this.parse_item = function (item, obj) {
            if (item.type === "vgroup"
                || item.type === "hgroup"
                || item.type === "tgroup") {
                this.parse_items(item.items, obj);
            } else if (item.type === "hbargraph"
                || item.type === "vbargraph") {
                // Keep bargraph adresses
                obj.outputs_items.push(item.address);
            } else if (item.type === "vslider"
                || item.type === "hslider"
                || item.type === "button"
                || item.type === "checkbox"
                || item.type === "nentry") {
                // Keep inputs adresses
                obj.inputs_items.push(item.address);
                obj.descriptor.push(item);
                // Decode MIDI
                if (item.meta !== undefined) {
                    for (var i = 0; i < item.meta.length; i++) {
                        if (item.meta[i].midi !== undefined) {
                            if (item.meta[i].midi.trim() === "pitchwheel") {
                                obj.fPitchwheelLabel.push({
                                    path: item.address,
                                    min: parseFloat(item.min),
                                    max: parseFloat(item.max)
                                });
                            } else if (item.meta[i].midi.trim().split(" ")[0] === "ctrl") {
                                obj.fCtrlLabel[parseInt(item.meta[i].midi.trim().split(" ")[1])]
                                    .push({
                                        path: item.address,
                                        min: parseFloat(item.min),
                                        max: parseFloat(item.max)
                                    });
                            }
                        }
                    }
                }
                // Define setXXX/getXXX, replacing '/c' with 'C' everywhere in the string
                var set_name = "set" + item.address;
                var get_name = "get" + item.address;
                set_name = set_name.replace(/\/./g, (x) => { return x.substr(1, 1).toUpperCase(); });
                get_name = get_name.replace(/\/./g, (x) => { return x.substr(1, 1).toUpperCase(); });
                obj[set_name] = (val) => { obj.setParamValue(item.address, val); };
                obj[get_name] = () => { return obj.getParamValue(item.address); };
                //console.log(set_name);
                //console.log(get_name);
            }
        }

        this.output_handler = null;

        // input/output items
        this.inputs_items = [];
        this.outputs_items = [];
        this.descriptor = [];

        // MIDI
        this.fPitchwheelLabel = [];
        this.fCtrlLabel = new Array(128);
        for (var i = 0; i < this.fCtrlLabel.length; i++) { this.fCtrlLabel[i] = []; }

        // Parse UI
        this.parse_ui(this.json_object.ui, this);

        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);
        try {
            if (this.parameters) this.parameters.forEach(p => p.automationRate = "k-rate");
        } catch (e) { }
    }

    // To be called by the message port with messages coming from the processor
    handleMessage(event) {
        var msg = event.data;
        if (this.output_handler) {
            this.output_handler(msg.path, msg.value);
        }
    }

    // Public API

    /**
     * Destroy the node, deallocate resources.
     */
    destroy() {
        this.port.postMessage({ type: "destroy" });
        this.port.close();
    }

    /**
     *  Returns a full JSON description of the DSP.
     */
    getJSON() {
        return this.json;
    }

    // For WAP
    async getMetadata() {
        return new Promise(resolve => {
            let real_url = (this.baseURL === "") ? "main.json" : (this.baseURL + "/main.json");
            fetch(real_url).then(responseJSON => {
                return responseJSON.json();
            }).then(json => {
                resolve(json);
            })
        });
    }

    /**
     *  Set the control value at a given path.
     *
     * @param path - a path to the control
     * @param val - the value to be set
     */
    setParamValue(path, val) {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    // For WAP
    setParam(path, val) {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    /**
     *  Get the control value at a given path.
     *
     * @return the current control value
     */
    getParamValue(path) {
        return this.parameters.get(path).value;
    }

    // For WAP
    getParam(path) {
        return this.parameters.get(path).value;
    }

    /**
     * Setup a control output handler with a function of type (path, value)
     * to be used on each generated output value. This handler will be called
     * each audio cycle at the end of the 'compute' method.
     *
     * @param handler - a function of type function(path, value)
     */
    setOutputParamHandler(handler) {
        this.output_handler = handler;
    }

    /**
     * Get the current output handler.
     */
    getOutputParamHandler() {
        return this.output_handler;
    }

    getNumInputs() {
        return parseInt(this.json_object.inputs);
    }

    getNumOutputs() {
        return parseInt(this.json_object.outputs);
    }

    // For WAP
    inputChannelCount() {
        return parseInt(this.json_object.inputs);
    }

    outputChannelCount() {
        return parseInt(this.json_object.outputs);
    }

    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getParams() {
        return this.inputs_items;
    }

    // For WAP
    getDescriptor() {
        var desc = {};
        for (const item in this.descriptor) {
            if (this.descriptor.hasOwnProperty(item)) {
                if (this.descriptor[item].label != "bypass") {
                    desc = Object.assign({ [this.descriptor[item].label]: { minValue: this.descriptor[item].min, maxValue: this.descriptor[item].max, defaultValue: this.descriptor[item].init } }, desc);
                }
            }
        }
        return desc;
    }

    /**
     * Control change
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param ctrl - the MIDI controller number (0..127)
     * @param value - the MIDI controller value (0..127)
     */
    ctrlChange(channel, ctrl, value) {
        if (this.fCtrlLabel[ctrl] !== []) {
            for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
                var path = this.fCtrlLabel[ctrl][i].path;
                this.setParamValue(path, freeverbNode.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
                if (this.output_handler) {
                    this.output_handler(path, this.getParamValue(path));
                }
            }
        }
    }

    /**
     * PitchWeel
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param value - the MIDI controller value (0..16383)
     */
    pitchWheel(channel, wheel) {
        for (var i = 0; i < this.fPitchwheelLabel.length; i++) {
            var pw = this.fPitchwheelLabel[i];
            this.setParamValue(pw.path, freeverbNode.remap(wheel, 0, 16383, pw.min, pw.max));
            if (this.output_handler) {
                this.output_handler(pw.path, this.getParamValue(pw.path));
            }
        }
    }

    /**
     * Generic MIDI message handler.
     */
    midiMessage(data) {
        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf;
        var data1 = data[1];
        var data2 = data[2];

        if (channel === 9) {
            return;
        } else if (cmd === 11) {
            this.ctrlChange(channel, data1, data2);
        } else if (cmd === 14) {
            this.pitchWheel(channel, (data2 * 128.0 + data1));
        }
    }

    // For WAP
    onMidi(data) {
        midiMessage(data);
    }

    /**
     * @returns {Object} describes the path for each available param and its current value
     */
    async getState() {
        var params = new Object();
        for (let i = 0; i < this.getParams().length; i++) {
            Object.assign(params, { [this.getParams()[i]]: `${this.getParam(this.getParams()[i])}` });
        }
        return new Promise(resolve => { resolve(params) });
    }

    /**
     * Sets each params with the value indicated in the state object
     * @param {Object} state 
     */
    async setState(state) {
        return new Promise(resolve => {
            for (const param in state) {
                if (state.hasOwnProperty(param)) this.setParam(param, state[param]);
            }
            try {
                this.gui.setAttribute('state', JSON.stringify(state));
            } catch (error) {
                console.warn("Plugin without gui or GUI not defined", error);
            }
            resolve(state);
        })
    }

    /**
     * A different call closer to the preset management
     * @param {Object} patch to assign as a preset to the node
     */
    setPatch(patch) {
        this.setState(this.presets[patch])
    }

    static remap(v, mn0, mx0, mn1, mx1) {
        return (1.0 * (v - mn0) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
    }

}

// Factory class
class freeverb {

    static fWorkletProcessors;

    /**
     * Factory constructor.
     *
     * @param context - the audio context
     * @param baseURL - the baseURL of the plugin folder
     */
    constructor(context, baseURL = "") {
        console.log("baseLatency " + context.baseLatency);
        console.log("outputLatency " + context.outputLatency);
        console.log("sampleRate " + context.sampleRate);

        this.context = context;
        this.baseURL = baseURL;
        this.pathTable = [];

        this.fWorkletProcessors = this.fWorkletProcessors || [];
    }

    heap2Str(buf) {
        let str = "";
        let i = 0;
        while (buf[i] !== 0) {
            str += String.fromCharCode(buf[i++]);
        }
        return str;
    }

    /**
     * Load additionnal resources to prepare the custom AudioWorkletNode. Returns a promise to be used with the created node.
     */
    async load() {
        try {
            const importObject = {
                env: {
                    memoryBase: 0,
                    tableBase: 0,
                    _abs: Math.abs,

                    // Float version
                    _acosf: Math.acos,
                    _asinf: Math.asin,
                    _atanf: Math.atan,
                    _atan2f: Math.atan2,
                    _ceilf: Math.ceil,
                    _cosf: Math.cos,
                    _expf: Math.exp,
                    _floorf: Math.floor,
                    _fmodf: (x, y) => x % y,
                    _logf: Math.log,
                    _log10f: Math.log10,
                    _max_f: Math.max,
                    _min_f: Math.min,
                    _remainderf: (x, y) => x - Math.round(x / y) * y,
                    _powf: Math.pow,
                    _roundf: Math.fround,
                    _sinf: Math.sin,
                    _sqrtf: Math.sqrt,
                    _tanf: Math.tan,
                    _acoshf: Math.acosh,
                    _asinhf: Math.asinh,
                    _atanhf: Math.atanh,
                    _coshf: Math.cosh,
                    _sinhf: Math.sinh,
                    _tanhf: Math.tanh,
                    _isnanf: Number.isNaN,
                    _isinff: function (x) { return !isFinite(x); },
                    _copysignf: function (x, y) { return Math.sign(x) === Math.sign(y) ? x : -x; },

                    // Double version
                    _acos: Math.acos,
                    _asin: Math.asin,
                    _atan: Math.atan,
                    _atan2: Math.atan2,
                    _ceil: Math.ceil,
                    _cos: Math.cos,
                    _exp: Math.exp,
                    _floor: Math.floor,
                    _fmod: (x, y) => x % y,
                    _log: Math.log,
                    _log10: Math.log10,
                    _max_: Math.max,
                    _min_: Math.min,
                    _remainder: (x, y) => x - Math.round(x / y) * y,
                    _pow: Math.pow,
                    _round: Math.fround,
                    _sin: Math.sin,
                    _sqrt: Math.sqrt,
                    _tan: Math.tan,
                    _acosh: Math.acosh,
                    _asinh: Math.asinh,
                    _atanh: Math.atanh,
                    _cosh: Math.cosh,
                    _sinh: Math.sinh,
                    _tanh: Math.tanh,
                    _isnan: Number.isNaN,
                    _isinf: function (x) { return !isFinite(x); },
                    _copysign: function (x, y) { return Math.sign(x) === Math.sign(y) ? x : -x; },

                    table: new WebAssembly.Table({ initial: 0, element: "anyfunc" })
                }
            };

            let real_url = (this.baseURL === "") ? "freeverb.wasm" : (this.baseURL + "/freeverb.wasm");
            const dspFile = await fetch(real_url);
            const dspBuffer = await dspFile.arrayBuffer();
            const dspModule = await WebAssembly.compile(dspBuffer);
            const dspInstance = await WebAssembly.instantiate(dspModule, importObject);

            let HEAPU8 = new Uint8Array(dspInstance.exports.memory.buffer);
            let json = this.heap2Str(HEAPU8);
            let json_object = JSON.parse(json);
            let options = { wasm_module: dspModule, json: json };

            if (this.fWorkletProcessors.indexOf(name) === -1) {
                try {
                    let re = /JSON_STR/g;
                    let freeverbProcessorString1 = freeverbProcessorString.replace(re, json);
                    let real_url = window.URL.createObjectURL(new Blob([freeverbProcessorString1], { type: 'text/javascript' }));
                    await this.context.audioWorklet.addModule(real_url);
                    // Keep the DSP name
                    console.log("Keep the DSP name");
                    this.fWorkletProcessors.push(name);
                } catch (e) {
                    console.error(e);
                    console.error("Faust " + this.name + " cannot be loaded or compiled");
                    return null;
                }
            }
            this.node = new freeverbNode(this.context, this.baseURL,
                {
                    numberOfInputs: (parseInt(json_object.inputs) > 0) ? 1 : 0,
                    numberOfOutputs: (parseInt(json_object.outputs) > 0) ? 1 : 0,
                    channelCount: Math.max(1, parseInt(json_object.inputs)),
                    outputChannelCount: [parseInt(json_object.outputs)],
                    channelCountMode: "explicit",
                    channelInterpretation: "speakers",
                    processorOptions: options
                });
            this.node.onprocessorerror = () => { console.log('An error from freeverb-processor was detected.'); }
            return (this.node);
        } catch (e) {
            console.error(e);
            console.error("Faust " + this.name + " cannot be loaded or compiled");
            return null;
        }
    }

    async loadGui() {
        return new Promise((resolve, reject) => {
            try {
                // DO THIS ONLY ONCE. If another instance has already been added, do not add the html file again
                let real_url = (this.baseURL === "") ? "main.html" : (this.baseURL + "/main.html");
                if (!this.linkExists(real_url)) {
                    // LINK DOES NOT EXIST, let's add it to the document
                    var link = document.createElement('link');
                    link.rel = 'import';
                    link.href = real_url;
                    document.head.appendChild(link);
                    link.onload = (e) => {
                        // the file has been loaded, instanciate GUI
                        // and get back the HTML elem
                        // HERE WE COULD REMOVE THE HARD CODED NAME
                        var element = createfreeverbGUI(this.node);
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createfreeverbGUI(this.node);
                    resolve(element);
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    };

    linkExists(url) {
        return document.querySelectorAll(`link[href="${url}"]`).length > 0;
    }
}

// Template string for AudioWorkletProcessor

let freeverbProcessorString = `

    'use strict';

    // Monophonic Faust DSP
    class freeverbProcessor extends AudioWorkletProcessor {
        
        // JSON parsing functions
        static parse_ui(ui, obj, callback)
        {
            for (var i = 0; i < ui.length; i++) {
                freeverbProcessor.parse_group(ui[i], obj, callback);
            }
        }
        
        static parse_group(group, obj, callback)
        {
            if (group.items) {
                freeverbProcessor.parse_items(group.items, obj, callback);
            }
        }
        
        static parse_items(items, obj, callback)
        {
            for (var i = 0; i < items.length; i++) {
                callback(items[i], obj, callback);
            }
        }
        
        static parse_item1(item, obj, callback)
        {
            if (item.type === "vgroup"
                || item.type === "hgroup"
                || item.type === "tgroup") {
                freeverbProcessor.parse_items(item.items, obj, callback);
            } else if (item.type === "hbargraph"
                       || item.type === "vbargraph") {
                // Nothing
            } else if (item.type === "vslider"
                       || item.type === "hslider"
                       || item.type === "button"
                       || item.type === "checkbox"
                       || item.type === "nentry") {
                obj.push({ name: item.address,
                         defaultValue: item.init,
                         minValue: item.min,
                         maxValue: item.max });
            }
        }
        
        static parse_item2(item, obj, callback)
        {
            if (item.type === "vgroup"
                || item.type === "hgroup"
                || item.type === "tgroup") {
                freeverbProcessor.parse_items(item.items, obj, callback);
            } else if (item.type === "hbargraph"
                       || item.type === "vbargraph") {
                // Keep bargraph adresses
                obj.outputs_items.push(item.address);
                obj.pathTable[item.address] = parseInt(item.index);
            } else if (item.type === "vslider"
                       || item.type === "hslider"
                       || item.type === "button"
                       || item.type === "checkbox"
                       || item.type === "nentry") {
                // Keep inputs adresses
                obj.inputs_items.push(item.address);
                obj.pathTable[item.address] = parseInt(item.index);
            }
        }
     
        static get parameterDescriptors() 
        {
            // Analyse JSON to generate AudioParam parameters
            var params = [];
            freeverbProcessor.parse_ui(JSON.parse(\`JSON_STR\`).ui, params, freeverbProcessor.parse_item1);
            return params;
        }
       
        constructor(options)
        {
            super(options);
            this.running = true;
            
            const importObject = {
                    env: {
                        memoryBase: 0,
                        tableBase: 0,

                        // Integer version
                        _abs: Math.abs,

                        // Float version
                        _acosf: Math.acos,
                        _asinf: Math.asin,
                        _atanf: Math.atan,
                        _atan2f: Math.atan2,
                        _ceilf: Math.ceil,
                        _cosf: Math.cos,
                        _expf: Math.exp,
                        _floorf: Math.floor,
                        _fmodf: function(x, y) { return x % y; },
                        _logf: Math.log,
                        _log10f: Math.log10,
                        _max_f: Math.max,
                        _min_f: Math.min,
                        _remainderf: function(x, y) { return x - Math.round(x/y) * y; },
                        _powf: Math.pow,
                        _roundf: Math.fround,
                        _sinf: Math.sin,
                        _sqrtf: Math.sqrt,
                        _tanf: Math.tan,
                        _acoshf: Math.acosh,
                        _asinhf: Math.asinh,
                        _atanhf: Math.atanh,
                        _coshf: Math.cosh,
                        _sinhf: Math.sinh,
                        _tanhf: Math.tanh,

                        // Double version
                        _acos: Math.acos,
                        _asin: Math.asin,
                        _atan: Math.atan,
                        _atan2: Math.atan2,
                        _ceil: Math.ceil,
                        _cos: Math.cos,
                        _exp: Math.exp,
                        _floor: Math.floor,
                        _fmod: function(x, y) { return x % y; },
                        _log: Math.log,
                        _log10: Math.log10,
                        _max_: Math.max,
                        _min_: Math.min,
                        _remainder:function(x, y) { return x - Math.round(x/y) * y; },
                        _pow: Math.pow,
                        _round: Math.fround,
                        _sin: Math.sin,
                        _sqrt: Math.sqrt,
                        _tan: Math.tan,
                        _acosh: Math.acosh,
                        _asinh: Math.asinh,
                        _atanh: Math.atanh,
                        _cosh: Math.cosh,
                        _sinh: Math.sinh,
                        _tanh: Math.tanh,

                        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
                    }
            };
            
            this.freeverb_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
            this.json_object = JSON.parse(options.processorOptions.json);
         
            this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
            
            this.ins = null;
            this.outs = null;

            this.dspInChannnels = [];
            this.dspOutChannnels = [];

            this.numIn = parseInt(this.json_object.inputs);
            this.numOut = parseInt(this.json_object.outputs);

            // Memory allocator
            this.ptr_size = 4;
            this.sample_size = 4;
            this.integer_size = 4;
            
            this.factory = this.freeverb_instance.exports;
            this.HEAP = this.freeverb_instance.exports.memory.buffer;
            this.HEAP32 = new Int32Array(this.HEAP);
            this.HEAPF32 = new Float32Array(this.HEAP);

            // Warning: keeps a ref on HEAP in Chrome and prevent proper GC
            //console.log(this.HEAP);
            //console.log(this.HEAP32);
            //console.log(this.HEAPF32);

            // bargraph
            this.outputs_timer = 5;
            this.outputs_items = [];

            // input items
            this.inputs_items = [];
        
            // Start of HEAP index

            // DSP is placed first with index 0. Audio buffer start at the end of DSP.
            this.audio_heap_ptr = parseInt(this.json_object.size);

            // Setup pointers offset
            this.audio_heap_ptr_inputs = this.audio_heap_ptr;
            this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

            // Setup buffer offset
            this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
            this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * NUM_FRAMES * this.sample_size);
            
            // Start of DSP memory : DSP is placed first with index 0
            this.dsp = 0;

            this.pathTable = [];
         
            // Send output values to the AudioNode
            this.update_outputs = function ()
            {
                if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                    this.outputs_timer = 5;
                    for (var i = 0; i < this.outputs_items.length; i++) {
                        this.output_handler(this.outputs_items[i], this.HEAPF32[this.pathTable[this.outputs_items[i]] >> 2]);
                    }
                }
            }
            
            this.initAux = function ()
            {
                var i;
                
                if (this.numIn > 0) {
                    this.ins = this.audio_heap_ptr_inputs;
                    for (i = 0; i < this.numIn; i++) {
                        this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((NUM_FRAMES * this.sample_size) * i);
                    }
                    
                    // Prepare Ins buffer tables
                    var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                    for (i = 0; i < this.numIn; i++) {
                        this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                    }
                }
                
                if (this.numOut > 0) {
                    this.outs = this.audio_heap_ptr_outputs;
                    for (i = 0; i < this.numOut; i++) {
                        this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((NUM_FRAMES * this.sample_size) * i);
                    }
                    
                    // Prepare Out buffer tables
                    var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                    for (i = 0; i < this.numOut; i++) {
                        this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                    }
                }
                
                // Parse UI
                freeverbProcessor.parse_ui(this.json_object.ui, this, freeverbProcessor.parse_item2);
                
                // Init DSP
                this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
            }

            this.setParamValue = function (path, val)
            {
                this.HEAPF32[this.pathTable[path] >> 2] = val;
            }

            this.getParamValue = function (path)
            {
                return this.HEAPF32[this.pathTable[path] >> 2];
            }

            // Init resulting DSP
            this.initAux();
        }
        
        process(inputs, outputs, parameters) 
        {
            var input = inputs[0];
            var output = outputs[0];
            
            // Check inputs
            if (this.numIn > 0 && (!input || !input[0] || input[0].length === 0)) {
                //console.log("Process input error");
                return true;
            }
            // Check outputs
            if (this.numOut > 0 && (!output || !output[0] || output[0].length === 0)) {
                //console.log("Process output error");
                return true;
            }
            
            // Copy inputs
            if (input !== undefined) {
                for (var chan = 0; chan < Math.min(this.numIn, input.length); ++chan) {
                    var dspInput = this.dspInChannnels[chan];
                    dspInput.set(input[chan]);
                }
            }
            
            /*
            TODO: sample accurate control change is not yet handled
            When no automation occurs, params[i][1] has a length of 1,
            otherwise params[i][1] has a length of NUM_FRAMES with possible control change each sample
            */
            
            // Update controls
            for (const path in parameters) {
                const paramArray = parameters[path];
                this.setParamValue(path, paramArray[0]);
            }
        
          	// Compute
            try {
                this.factory.compute(this.dsp, NUM_FRAMES, this.ins, this.outs);
            } catch(e) {
                console.log("ERROR in compute (" + e + ")");
            }
            
            // Update bargraph
            this.update_outputs();
            
            // Copy outputs
            if (output !== undefined) {
                for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                    var dspOutput = this.dspOutChannnels[chan];
                    output[chan].set(dspOutput);
                }
            }
            
            return this.running;
    	}
        
        handleMessage(event)
        {
            var msg = event.data;
            switch (msg.type) {
                case "destroy": this.running = false; break;
            }
        }
    }

    // Globals
    const NUM_FRAMES = 128;
    try {
        registerProcessor('freeverb', freeverbProcessor);
    } catch (error) {
        console.warn(error);
    }
`;

