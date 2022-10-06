
/*
Code generated with Faust version 2.49.1
Compilation options: -lang wasm-ib -cn compressor_demo -es 1 -mcd 16 -single -ftz 2 
*/

function getJSONcompressor_demo() {
	return '{"name": "compressor_demo","filename": "compressor_demo.dsp","version": "2.49.1","compile_options": "-lang wasm-ib -cn compressor_demo -es 1 -mcd 16 -single -ftz 2","include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/tmp/sessions/E7A313232C056B92C1406075D6CCDC702D0FCCC2/web/wasmjs-worklet"],"size": 68,"inputs": 2,"outputs": 2,"meta": [ { "analyzers_lib_amp_follower_ar_author": "Jonatan Liljedahl, revised by Romain Michon" },{ "analyzers_lib_name": "Faust Analyzer Library" },{ "analyzers_lib_version": "0.2" },{ "basics_lib_bypass2_author": "Julius Smith" },{ "basics_lib_name": "Faust Basic Element Library" },{ "basics_lib_version": "0.8" },{ "compile_options": "-single -scal -I libraries/ -I project/ -lang wasm" },{ "compressors_lib_compression_gain_mono_author": "Julius O. Smith III" },{ "compressors_lib_compression_gain_mono_copyright": "Copyright (C) 2014-2020 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "compressors_lib_compression_gain_mono_license": "MIT-style STK-4.3 license" },{ "compressors_lib_compressor_stereo_author": "Julius O. Smith III" },{ "compressors_lib_compressor_stereo_copyright": "Copyright (C) 2014-2020 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "compressors_lib_compressor_stereo_license": "MIT-style STK-4.3 license" },{ "compressors_lib_name": "Faust Compressor Effect Library" },{ "compressors_lib_version": "0.4" },{ "demos_lib_compressor_demo_author": "Julius O. Smith III" },{ "demos_lib_compressor_demo_licence": "MIT" },{ "demos_lib_name": "Faust Demos Library" },{ "demos_lib_version": "0.1" },{ "filename": "compressor_demo.dsp" },{ "library_path0": "/libraries/stdfaust.lib" },{ "library_path1": "/libraries/demos.lib" },{ "library_path2": "/libraries/basics.lib" },{ "library_path3": "/libraries/compressors.lib" },{ "library_path4": "/libraries/maths.lib" },{ "library_path5": "/libraries/platform.lib" },{ "library_path6": "/libraries/analyzers.lib" },{ "library_path7": "/libraries/signals.lib" },{ "library_path8": "/libraries/routes.lib" },{ "maths_lib_author": "GRAME" },{ "maths_lib_copyright": "GRAME" },{ "maths_lib_license": "LGPL with exception" },{ "maths_lib_name": "Faust Math Library" },{ "maths_lib_version": "2.5" },{ "name": "compressor_demo" },{ "platform_lib_name": "Generic Platform Library" },{ "platform_lib_version": "0.2" },{ "routes_lib_name": "Faust Signal Routing Library" },{ "routes_lib_version": "0.2" },{ "signals_lib_name": "Faust Signal Routing Library" },{ "signals_lib_onePoleSwitching_author": "Jonatan Liljedahl, revised by Dario Sanfilippo" },{ "signals_lib_onePoleSwitching_licence": "STK-4.3" },{ "signals_lib_version": "0.3" },{ "version": "2.50.2" }],"ui": [ {"type": "vgroup","label": "COMPRESSOR","meta": [{ "tooltip": "Reference:         http://en.wikipedia.org/wiki/Dynamic_range_compression" }],"items": [ {"type": "hgroup","label": "0x00","meta": [{ "0": "" }],"items": [ {"type": "checkbox","label": "Bypass","shortname": "Bypass","address": "/COMPRESSOR/0x00/Bypass","index": 0,"meta": [{ "0": "" },{ "tooltip": "When this is checked, the compressor         has no effect" }]},{"type": "hbargraph","label": "Compressor Gain","shortname": "Compressor_Gain","address": "/COMPRESSOR/0x00/Compressor_Gain","index": 64,"meta": [{ "1": "" },{ "tooltip": "Current gain of     the compressor in dB" },{ "unit": "dB" }],"min": -50,"max": 10}]},{"type": "hgroup","label": "0x00","meta": [{ "1": "" }],"items": [ {"type": "hgroup","label": "Compression Control","meta": [{ "3": "" }],"items": [ {"type": "hslider","label": "Ratio","shortname": "Ratio","address": "/COMPRESSOR/0x00/Compression_Control/Ratio","index": 32,"meta": [{ "0": "" },{ "style": "knob" },{ "tooltip": "A compression Ratio of N means that for each N dB increase in input     signal level above Threshold, the output level goes up 1 dB" }],"init": 5,"min": 1,"max": 20,"step": 0.1},{"type": "hslider","label": "Threshold","shortname": "Threshold","address": "/COMPRESSOR/0x00/Compression_Control/Threshold","index": 16,"meta": [{ "1": "" },{ "style": "knob" },{ "tooltip": "When the signal level exceeds the Threshold (in dB), its level     is compressed according to the Ratio" },{ "unit": "dB" }],"init": -30,"min": -100,"max": 10,"step": 0.1}]},{"type": "hgroup","label": "Compression Response","meta": [{ "4": "" }],"items": [ {"type": "hslider","label": "Attack","shortname": "Attack","address": "/COMPRESSOR/0x00/Compression_Response/Attack","index": 12,"meta": [{ "1": "" },{ "scale": "log" },{ "style": "knob" },{ "tooltip": "Time constant in ms (1/e smoothing time) for the compression gain     to approach (exponentially) a new lower target level (the compression     `kicking in\')" },{ "unit": "ms" }],"init": 50,"min": 1,"max": 1000,"step": 0.1},{"type": "hslider","label": "Release","shortname": "Release","address": "/COMPRESSOR/0x00/Compression_Response/Release","index": 20,"meta": [{ "2": "" },{ "scale": "log" },{ "style": "knob" },{ "tooltip": "Time constant in ms (1/e smoothing time) for the compression gain     to approach (exponentially) a new higher target level (the compression     \'releasing\')" },{ "unit": "ms" }],"init": 500,"min": 1,"max": 1000,"step": 0.1}]}]},{"type": "hslider","label": "Makeup Gain","shortname": "Makeup_Gain","address": "/COMPRESSOR/Makeup_Gain","index": 44,"meta": [{ "5": "" },{ "tooltip": "The compressed-signal output level is increased by this amount     (in dB) to make up for the level lost due to compression" },{ "unit": "dB" }],"init": 40,"min": -96,"max": 96,"step": 0.1}]}]}';
}
function getBase64Codecompressor_demo() { return "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QwAAgD9DAIA7SEMAAIA/QQAoAgSyl5aVOAIIC5CAgIAAACAAIAEQCyAAEA0gABAKC76AgIAAAEEAQwAAAAA4AgBBAEMAAEhCOAIMQQBDAADwwTgCEEEAQwAA+kM4AhRBAEMAAKBAOAIgQQBDAAAgQjgCLAuQgICAAAAgACABSAR/IAEFIAALDwuQgICAAAAgACABSAR/IAAFIAELDwuMgICAAAAgACABaiACOAIACwvFq4CAAAEAQQALvit7Im5hbWUiOiAiY29tcHJlc3Nvcl9kZW1vIiwiZmlsZW5hbWUiOiAiY29tcHJlc3Nvcl9kZW1vLmRzcCIsInZlcnNpb24iOiAiMi40OS4xIiwiY29tcGlsZV9vcHRpb25zIjogIi1sYW5nIHdhc20taWIgLWNuIGNvbXByZXNzb3JfZGVtbyAtZXMgMSAtbWNkIDE2IC1zaW5nbGUgLWZ0eiAyIiwiaW5jbHVkZV9wYXRobmFtZXMiOiBbIi91c3IvbG9jYWwvc2hhcmUvZmF1c3QiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0IiwiL3Vzci9zaGFyZS9mYXVzdCIsIi4iLCIvdG1wL3Nlc3Npb25zL0U3QTMxMzIzMkMwNTZCOTJDMTQwNjA3NUQ2Q0NEQzcwMkQwRkNDQzIvd2ViL3dhc21qcy13b3JrbGV0Il0sInNpemUiOiA2OCwiaW5wdXRzIjogMiwib3V0cHV0cyI6IDIsIm1ldGEiOiBbIHsgImFuYWx5emVyc19saWJfYW1wX2ZvbGxvd2VyX2FyX2F1dGhvciI6ICJKb25hdGFuIExpbGplZGFobCwgcmV2aXNlZCBieSBSb21haW4gTWljaG9uIiB9LHsgImFuYWx5emVyc19saWJfbmFtZSI6ICJGYXVzdCBBbmFseXplciBMaWJyYXJ5IiB9LHsgImFuYWx5emVyc19saWJfdmVyc2lvbiI6ICIwLjIiIH0seyAiYmFzaWNzX2xpYl9ieXBhc3MyX2F1dGhvciI6ICJKdWxpdXMgU21pdGgiIH0seyAiYmFzaWNzX2xpYl9uYW1lIjogIkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSIgfSx7ICJiYXNpY3NfbGliX3ZlcnNpb24iOiAiMC44IiB9LHsgImNvbXBpbGVfb3B0aW9ucyI6ICItc2luZ2xlIC1zY2FsIC1JIGxpYnJhcmllcy8gLUkgcHJvamVjdC8gLWxhbmcgd2FzbSIgfSx7ICJjb21wcmVzc29yc19saWJfY29tcHJlc3Npb25fZ2Fpbl9tb25vX2F1dGhvciI6ICJKdWxpdXMgTy4gU21pdGggSUlJIiB9LHsgImNvbXByZXNzb3JzX2xpYl9jb21wcmVzc2lvbl9nYWluX21vbm9fY29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAxNC0yMDIwIGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImNvbXByZXNzb3JzX2xpYl9jb21wcmVzc2lvbl9nYWluX21vbm9fbGljZW5zZSI6ICJNSVQtc3R5bGUgU1RLLTQuMyBsaWNlbnNlIiB9LHsgImNvbXByZXNzb3JzX2xpYl9jb21wcmVzc29yX3N0ZXJlb19hdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJjb21wcmVzc29yc19saWJfY29tcHJlc3Nvcl9zdGVyZW9fY29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAxNC0yMDIwIGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImNvbXByZXNzb3JzX2xpYl9jb21wcmVzc29yX3N0ZXJlb19saWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiY29tcHJlc3NvcnNfbGliX25hbWUiOiAiRmF1c3QgQ29tcHJlc3NvciBFZmZlY3QgTGlicmFyeSIgfSx7ICJjb21wcmVzc29yc19saWJfdmVyc2lvbiI6ICIwLjQiIH0seyAiZGVtb3NfbGliX2NvbXByZXNzb3JfZGVtb19hdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJkZW1vc19saWJfY29tcHJlc3Nvcl9kZW1vX2xpY2VuY2UiOiAiTUlUIiB9LHsgImRlbW9zX2xpYl9uYW1lIjogIkZhdXN0IERlbW9zIExpYnJhcnkiIH0seyAiZGVtb3NfbGliX3ZlcnNpb24iOiAiMC4xIiB9LHsgImZpbGVuYW1lIjogImNvbXByZXNzb3JfZGVtby5kc3AiIH0seyAibGlicmFyeV9wYXRoMCI6ICIvbGlicmFyaWVzL3N0ZGZhdXN0LmxpYiIgfSx7ICJsaWJyYXJ5X3BhdGgxIjogIi9saWJyYXJpZXMvZGVtb3MubGliIiB9LHsgImxpYnJhcnlfcGF0aDIiOiAiL2xpYnJhcmllcy9iYXNpY3MubGliIiB9LHsgImxpYnJhcnlfcGF0aDMiOiAiL2xpYnJhcmllcy9jb21wcmVzc29ycy5saWIiIH0seyAibGlicmFyeV9wYXRoNCI6ICIvbGlicmFyaWVzL21hdGhzLmxpYiIgfSx7ICJsaWJyYXJ5X3BhdGg1IjogIi9saWJyYXJpZXMvcGxhdGZvcm0ubGliIiB9LHsgImxpYnJhcnlfcGF0aDYiOiAiL2xpYnJhcmllcy9hbmFseXplcnMubGliIiB9LHsgImxpYnJhcnlfcGF0aDciOiAiL2xpYnJhcmllcy9zaWduYWxzLmxpYiIgfSx7ICJsaWJyYXJ5X3BhdGg4IjogIi9saWJyYXJpZXMvcm91dGVzLmxpYiIgfSx7ICJtYXRoc19saWJfYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzX2xpYl9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHNfbGliX2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRoc19saWJfbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHNfbGliX3ZlcnNpb24iOiAiMi41IiB9LHsgIm5hbWUiOiAiY29tcHJlc3Nvcl9kZW1vIiB9LHsgInBsYXRmb3JtX2xpYl9uYW1lIjogIkdlbmVyaWMgUGxhdGZvcm0gTGlicmFyeSIgfSx7ICJwbGF0Zm9ybV9saWJfdmVyc2lvbiI6ICIwLjIiIH0seyAicm91dGVzX2xpYl9uYW1lIjogIkZhdXN0IFNpZ25hbCBSb3V0aW5nIExpYnJhcnkiIH0seyAicm91dGVzX2xpYl92ZXJzaW9uIjogIjAuMiIgfSx7ICJzaWduYWxzX2xpYl9uYW1lIjogIkZhdXN0IFNpZ25hbCBSb3V0aW5nIExpYnJhcnkiIH0seyAic2lnbmFsc19saWJfb25lUG9sZVN3aXRjaGluZ19hdXRob3IiOiAiSm9uYXRhbiBMaWxqZWRhaGwsIHJldmlzZWQgYnkgRGFyaW8gU2FuZmlsaXBwbyIgfSx7ICJzaWduYWxzX2xpYl9vbmVQb2xlU3dpdGNoaW5nX2xpY2VuY2UiOiAiU1RLLTQuMyIgfSx7ICJzaWduYWxzX2xpYl92ZXJzaW9uIjogIjAuMyIgfSx7ICJ2ZXJzaW9uIjogIjIuNTAuMiIgfV0sInVpIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAiQ09NUFJFU1NPUiIsIm1ldGEiOiBbeyAidG9vbHRpcCI6ICJSZWZlcmVuY2U6ICAgICAgICAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EeW5hbWljX3JhbmdlX2NvbXByZXNzaW9uIiB9XSwiaXRlbXMiOiBbIHsidHlwZSI6ICJoZ3JvdXAiLCJsYWJlbCI6ICIweDAwIiwibWV0YSI6IFt7ICIwIjogIiIgfV0sIml0ZW1zIjogWyB7InR5cGUiOiAiY2hlY2tib3giLCJsYWJlbCI6ICJCeXBhc3MiLCJzaG9ydG5hbWUiOiAiQnlwYXNzIiwiYWRkcmVzcyI6ICIvQ09NUFJFU1NPUi8weDAwL0J5cGFzcyIsImluZGV4IjogMCwibWV0YSI6IFt7ICIwIjogIiIgfSx7ICJ0b29sdGlwIjogIldoZW4gdGhpcyBpcyBjaGVja2VkLCB0aGUgY29tcHJlc3NvciAgICAgICAgIGhhcyBubyBlZmZlY3QiIH1dfSx7InR5cGUiOiAiaGJhcmdyYXBoIiwibGFiZWwiOiAiQ29tcHJlc3NvciBHYWluIiwic2hvcnRuYW1lIjogIkNvbXByZXNzb3JfR2FpbiIsImFkZHJlc3MiOiAiL0NPTVBSRVNTT1IvMHgwMC9Db21wcmVzc29yX0dhaW4iLCJpbmRleCI6IDY0LCJtZXRhIjogW3sgIjEiOiAiIiB9LHsgInRvb2x0aXAiOiAiQ3VycmVudCBnYWluIG9mICAgICB0aGUgY29tcHJlc3NvciBpbiBkQiIgfSx7ICJ1bml0IjogImRCIiB9XSwibWluIjogLTUwLCJtYXgiOiAxMH1dfSx7InR5cGUiOiAiaGdyb3VwIiwibGFiZWwiOiAiMHgwMCIsIm1ldGEiOiBbeyAiMSI6ICIiIH1dLCJpdGVtcyI6IFsgeyJ0eXBlIjogImhncm91cCIsImxhYmVsIjogIkNvbXByZXNzaW9uIENvbnRyb2wiLCJtZXRhIjogW3sgIjMiOiAiIiB9XSwiaXRlbXMiOiBbIHsidHlwZSI6ICJoc2xpZGVyIiwibGFiZWwiOiAiUmF0aW8iLCJzaG9ydG5hbWUiOiAiUmF0aW8iLCJhZGRyZXNzIjogIi9DT01QUkVTU09SLzB4MDAvQ29tcHJlc3Npb25fQ29udHJvbC9SYXRpbyIsImluZGV4IjogMzIsIm1ldGEiOiBbeyAiMCI6ICIiIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIkEgY29tcHJlc3Npb24gUmF0aW8gb2YgTiBtZWFucyB0aGF0IGZvciBlYWNoIE4gZEIgaW5jcmVhc2UgaW4gaW5wdXQgICAgIHNpZ25hbCBsZXZlbCBhYm92ZSBUaHJlc2hvbGQsIHRoZSBvdXRwdXQgbGV2ZWwgZ29lcyB1cCAxIGRCIiB9XSwiaW5pdCI6IDUsIm1pbiI6IDEsIm1heCI6IDIwLCJzdGVwIjogMC4xfSx7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogIlRocmVzaG9sZCIsInNob3J0bmFtZSI6ICJUaHJlc2hvbGQiLCJhZGRyZXNzIjogIi9DT01QUkVTU09SLzB4MDAvQ29tcHJlc3Npb25fQ29udHJvbC9UaHJlc2hvbGQiLCJpbmRleCI6IDE2LCJtZXRhIjogW3sgIjEiOiAiIiB9LHsgInN0eWxlIjogImtub2IiIH0seyAidG9vbHRpcCI6ICJXaGVuIHRoZSBzaWduYWwgbGV2ZWwgZXhjZWVkcyB0aGUgVGhyZXNob2xkIChpbiBkQiksIGl0cyBsZXZlbCAgICAgaXMgY29tcHJlc3NlZCBhY2NvcmRpbmcgdG8gdGhlIFJhdGlvIiB9LHsgInVuaXQiOiAiZEIiIH1dLCJpbml0IjogLTMwLCJtaW4iOiAtMTAwLCJtYXgiOiAxMCwic3RlcCI6IDAuMX1dfSx7InR5cGUiOiAiaGdyb3VwIiwibGFiZWwiOiAiQ29tcHJlc3Npb24gUmVzcG9uc2UiLCJtZXRhIjogW3sgIjQiOiAiIiB9XSwiaXRlbXMiOiBbIHsidHlwZSI6ICJoc2xpZGVyIiwibGFiZWwiOiAiQXR0YWNrIiwic2hvcnRuYW1lIjogIkF0dGFjayIsImFkZHJlc3MiOiAiL0NPTVBSRVNTT1IvMHgwMC9Db21wcmVzc2lvbl9SZXNwb25zZS9BdHRhY2siLCJpbmRleCI6IDEyLCJtZXRhIjogW3sgIjEiOiAiIiB9LHsgInNjYWxlIjogImxvZyIgfSx7ICJzdHlsZSI6ICJrbm9iIiB9LHsgInRvb2x0aXAiOiAiVGltZSBjb25zdGFudCBpbiBtcyAoMS9lIHNtb290aGluZyB0aW1lKSBmb3IgdGhlIGNvbXByZXNzaW9uIGdhaW4gICAgIHRvIGFwcHJvYWNoIChleHBvbmVudGlhbGx5KSBhIG5ldyBsb3dlciB0YXJnZXQgbGV2ZWwgKHRoZSBjb21wcmVzc2lvbiAgICAgYGtpY2tpbmcgaW4nKSIgfSx7ICJ1bml0IjogIm1zIiB9XSwiaW5pdCI6IDUwLCJtaW4iOiAxLCJtYXgiOiAxMDAwLCJzdGVwIjogMC4xfSx7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogIlJlbGVhc2UiLCJzaG9ydG5hbWUiOiAiUmVsZWFzZSIsImFkZHJlc3MiOiAiL0NPTVBSRVNTT1IvMHgwMC9Db21wcmVzc2lvbl9SZXNwb25zZS9SZWxlYXNlIiwiaW5kZXgiOiAyMCwibWV0YSI6IFt7ICIyIjogIiIgfSx7ICJzY2FsZSI6ICJsb2ciIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIlRpbWUgY29uc3RhbnQgaW4gbXMgKDEvZSBzbW9vdGhpbmcgdGltZSkgZm9yIHRoZSBjb21wcmVzc2lvbiBnYWluICAgICB0byBhcHByb2FjaCAoZXhwb25lbnRpYWxseSkgYSBuZXcgaGlnaGVyIHRhcmdldCBsZXZlbCAodGhlIGNvbXByZXNzaW9uICAgICAncmVsZWFzaW5nJykiIH0seyAidW5pdCI6ICJtcyIgfV0sImluaXQiOiA1MDAsIm1pbiI6IDEsIm1heCI6IDEwMDAsInN0ZXAiOiAwLjF9XX1dfSx7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogIk1ha2V1cCBHYWluIiwic2hvcnRuYW1lIjogIk1ha2V1cF9HYWluIiwiYWRkcmVzcyI6ICIvQ09NUFJFU1NPUi9NYWtldXBfR2FpbiIsImluZGV4IjogNDQsIm1ldGEiOiBbeyAiNSI6ICIiIH0seyAidG9vbHRpcCI6ICJUaGUgY29tcHJlc3NlZC1zaWduYWwgb3V0cHV0IGxldmVsIGlzIGluY3JlYXNlZCBieSB0aGlzIGFtb3VudCAgICAgKGluIGRCKSB0byBtYWtlIHVwIGZvciB0aGUgbGV2ZWwgbG9zdCBkdWUgdG8gY29tcHJlc3Npb24iIH0seyAidW5pdCI6ICJkQiIgfV0sImluaXQiOiA0MCwibWluIjogLTk2LCJtYXgiOiA5Niwic3RlcCI6IDAuMX1dfV19"; }

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

class compressor_demoNode extends AudioWorkletNode {

    constructor(context, baseURL, options) {
        super(context, 'compressor_demo', options);

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
                this.setParamValue(path, compressor_demoNode.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
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
            this.setParamValue(pw.path, compressor_demoNode.remap(wheel, 0, 16383, pw.min, pw.max));
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
class compressor_demo {

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

            let real_url = (this.baseURL === "") ? "compressor_demo.wasm" : (this.baseURL + "/compressor_demo.wasm");
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
                    let compressor_demoProcessorString1 = compressor_demoProcessorString.replace(re, json);
                    let real_url = window.URL.createObjectURL(new Blob([compressor_demoProcessorString1], { type: 'text/javascript' }));
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
            this.node = new compressor_demoNode(this.context, this.baseURL,
                {
                    numberOfInputs: (parseInt(json_object.inputs) > 0) ? 1 : 0,
                    numberOfOutputs: (parseInt(json_object.outputs) > 0) ? 1 : 0,
                    channelCount: Math.max(1, parseInt(json_object.inputs)),
                    outputChannelCount: [parseInt(json_object.outputs)],
                    channelCountMode: "explicit",
                    channelInterpretation: "speakers",
                    processorOptions: options
                });
            this.node.onprocessorerror = () => { console.log('An error from compressor_demo-processor was detected.'); }
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
                        var element = createcompressor_demoGUI(this.node);
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createcompressor_demoGUI(this.node);
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

let compressor_demoProcessorString = `

    'use strict';

    // Monophonic Faust DSP
    class compressor_demoProcessor extends AudioWorkletProcessor {
        
        // JSON parsing functions
        static parse_ui(ui, obj, callback)
        {
            for (var i = 0; i < ui.length; i++) {
                compressor_demoProcessor.parse_group(ui[i], obj, callback);
            }
        }
        
        static parse_group(group, obj, callback)
        {
            if (group.items) {
                compressor_demoProcessor.parse_items(group.items, obj, callback);
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
                compressor_demoProcessor.parse_items(item.items, obj, callback);
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
                compressor_demoProcessor.parse_items(item.items, obj, callback);
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
            compressor_demoProcessor.parse_ui(JSON.parse(\`JSON_STR\`).ui, params, compressor_demoProcessor.parse_item1);
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
            
            this.compressor_demo_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
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
            
            this.factory = this.compressor_demo_instance.exports;
            this.HEAP = this.compressor_demo_instance.exports.memory.buffer;
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
                compressor_demoProcessor.parse_ui(this.json_object.ui, this, compressor_demoProcessor.parse_item2);
                
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
        registerProcessor('compressor_demo', compressor_demoProcessor);
    } catch (error) {
        console.warn(error);
    }
`;


