<p align="center">
  <img src=git-content/tezintroloop.gif />
</p>

# P-Graph

A visual programming langage inspired by Puredata running inside browser.

Its main purpose is to be easy to extend, easy to use, easy to modify.

You can test it [here](https://bleuprofond.art/tezgr/demo/)

# Getting started

## Logic

Workspace is splitted in two main parts. Left side of the environment is an **output screen**, right side contains the **patch and code editors**.


For those already familiar with **Pd**, this will not be a major shift : all work with **blocks**. Blocks are small items inside a **patch** environment, that have **inputs, outputs and an internal memory**.

Any input can be wired to any output. Any output can be wired to any input. When a block's input receiving data, the block run its internal code that will
eventually modify the data, then output the result and the propagation continue. 

In most configuration, only the **first input trigger the block's code**, so, in most case, to propagate data, blocks ' outputs should be wired to other blocks' first input.

Any block has a specific number of memory slots (an array of data). When block receiving data from one input, it store the data within its memory:
for example, when **receiving value into second input, data is stored to second memory slot** and so on. Blocks can output value of any of its memory slots.

To get familiar with **P-Graph** system, you should load example projects and get a first look on the library documentation.

<p>
  <img src=git-content/basiclogic.gif width="200" height="320" />
   <img src=git-content/basiclogic2.gif width="200" height="320" />
  <img src=git-content/clockloop.gif width="200" height="320" />
  <img src=git-content/outinlogic.gif width="200" height="320" />
</p>

## User Interaction

Here some of the most important shortkey/tips you should know before starting a new patch

*  Press **[n]** key to create a new block at mouse position. This will greatly increase your workflow.
*  Double click on block to rename it. Once renamed, block will automatically be reload from library entries if type is found.
*  Press **[suppr]** key when renaming a block will delete the block.
*  Press **[enter]** key to show/hide code editor. 
*  Hold **[control]** key above a block to see its documentation.
*  Hold **[control]** key to interact with specific block in edit mode (default mode).

## Processing

**P-Graph can do audio and visual rendering**. 

### Audio

**It uses AudioWorkletProcessor** to process audio signals. Most arithmetic function on audio are here. Read audio documentation to get further. 

https://user-images.githubusercontent.com/62741099/193688893-0c391145-5455-455b-b7a4-5341fa7a384d.mp4

**An example of a polyphonic FM synth with 16-voices. 6 oscillators per voice. One ADSR enveloppe per oscillator**
**This patch can be loaded in file>example>sound>fm synth**

### Visual

Left side of interface is the main screen where any block's code will draw by default.
Most **HTML5 canvas graphics command** are implemented as block. For example, **[pix]** block will draw a pixel to the current screen. **[rect]** block
will stroke a rectangle, etc..

https://user-images.githubusercontent.com/62741099/194303052-c7405d6f-fd4e-4b53-9f0c-63b9fc24d754.mp4

**An example of a simple 3D viewer which render Stanford tea pot .obj using vector mathematics in a customizable render pipe line.**
**This patch can be loaded in file>example>visual>3D**

## Code editor

<p>
  <img src=git-content/testa.gif width="200" height="320" />
  <img src=git-content/testc.gif width="200" height="320" />
   <img src=git-content/testb.gif width="200" height="320" />
    <img src=git-content/testd.gif width="200" height="320" />
</p>

One of the strong part of P-Graph is its **ability to evaluate and run block's code on the fly** since it's written in javascript. Even if javascript is less efficient than C/C++ code, we can get rid of pointers and memory management. It makes the P-Graph structure a lot more readable and opened to direct modification.

A code editor is implemented that allows user to **directly change blocks behaviour** and create new type of block to **extend the system**. 
Code modification is 'interpreted' at run time and can operate even when the patch is running.

Let's read the code of the block **[+ ]**

```
--decl
inp(2)
outp(1)

--code
mem(0) += mem(1)
out0(0)

```
This block add the value it received in first input by the value it received in second input. Then propagate the result to its first output.

Code **segment** are defined using **region**. Any line behind declarator are specific to its region until another region is declared.

| region name     | event                                |
| --------------- | ------------------------------------ |
| --decl          | run at block creation                |
| --code          | run when first input receive value   |
| --ipf*          | run when a given input receive value |

*--ipf takes one argument. --ipf1 run when second input receive value. --ipf0 is overwritten by --code region.* 

There is **specific functions** that gives easier access to P-Graph system behaviour.  

| function name   | behaviour                            |
| --------------- | ------------------------------------ |
| inp             | Set number of input of the block     |
| outp            | Set number of output of the block    |
| memset          | Set number of block's memory slots   |
| mem             | Access memory slot value             |
| out*            | Output a memory slot value           |
| self            | Access block object                  |

*out takes one argument. out0 will throw value to first block's output. out2 will throw value to third block's output.*

Note that memory slot length of a block equals its input number at creation. memset can be used to extend block memory to handle more data.

Knowing that, let's read again block [+  ] code and decode it's behaviour.

```
--decl                # Start of the 'Declaration' region. It run at block creation
inp(2)                    # Set number of input to 2. Block will have 2 inputs
outp(1)                   # Set number of output to 1. Block will have 1 output

--code                # Start of the 'Code' region. It run when first input receive a value
mem(0) += mem(1)          # Add value of memory slot #0 the value of memory slot#1 
out0(0)                   # Output value of memory slot #0 to first block's output

```

Otherwise any javascript code inside region will work good if not conflicting with functions above.

For example, a block with

```
--code 
mem(0) = Math.PI
out0(0)
```

will output PI.

And a block with

```
--code 
var foo = 10
while ( foo > 0 ) {  out0(1) ; foo--; }
```
will output ten times in a row the value of its second memory slot


## Save and share

Patches can be saved in different format : **.map .lib** or **.pgr**

* **.map** contains only the patch structure data (blocks posititon and wiring informations)
* **.lib** contains only libraries that are actually loaded. Libraries contain block's codes.
* **.pgr** contains the whole project : libraries and patch structure.

Those files can be loaded on other cession. You can either **import** them or **open** them.

Opening a project file (**.pgr**) will overwrite current project, but importing it will add the new patch
to current project.

## What's new? 

**06.10.2022**

* Complete overhaul of the audio processing.
* Adding 3d geometry lib
* Inlets, outlets and virtualisation are now here. **[virtual ]** & **[ditto ]**  blocks create instances of a window.
* Lot of new code region, allowing to run code on specific event. (eg. --end run when block being destroyed)

## Extensions

| name            |                                 |
| --------------- | ------------------------------------ |
| web3            | block can interact with Tezos and Ethereum blockchain                |
| $glyph          | user can write code by drawing shapes. Use $p glyph recognition   |

