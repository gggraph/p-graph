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

## Outputs

**P-Graph can output graphics to any canvas**. 

Left side of interface is the main screen where any block's code will draw by default.
Most **HTML5 canvas graphics command** are implemented to blocks'code. For example, **[pix]** block will draw a pixel to the current screen. **[rect]** block
will fill a rectangle, etc..

Double clicking on the main screen will open a mini portable screen which can be more convenient to work with! 

**It uses the Web Audio API**. Read audio documentation to get further. See [a dummy patch of a single-oscillator synth](https://raw.githubusercontent.com/gggraph/p-graph/main/git-content/synthseq.mp4)

https://user-images.githubusercontent.com/62741099/193688893-0c391145-5455-455b-b7a4-5341fa7a384d.mp4

**An example of a polyphonic FM synth with 16-voices. 6 oscillators per voice. One ADSR enveloppe per oscillator**
**This patch can be loaded in example>sound>dx7**


https://user-images.githubusercontent.com/62741099/194303052-c7405d6f-fd4e-4b53-9f0c-63b9fc24d754.mp4

**An example of a simple 3D viewer which render Stanford tea pot using vector mathematics in a customizable render pipe line.**
**This patch can be loaded in example>visual>3D**

## Code editor
<p>
  <img src=git-content/helloworld.gif width="400" height="600"/>
</p>  

A code editor is implemented that allows user to **directly change blocks behaviour** and write new type of block to **extend the system**. 
Code modification is 'interpreted' at run time and can operate even when the patch is running.

```

# a comment
--decl
inp(2)
outp(3)
memset(5)

--code
mem(0) = 'hello world'
mem(2) = mem(0) + Math.PI
out0(0)

--ipf2
mem(1) = 'called from non-standard input!'
out1(1)

```
This block code above has any **langage-specific words you should learn** to understand how the system works. This code will output 'Hello world' when 
first input is triggered. Let's see why.

Code **segment** are define using **region**. Any line behind declarator are specific to its region until another region is declared.

| region name     | event                                |
| --------------- | ------------------------------------ |
| --decl          | run at block creation                |
| --code          | run when first input receive value   |
| --ipf4          | run when fifth input receive value   |
| --ipf1          | run when second input receive value  |

**Note that any number can follow --ipf region while there is enough inputs to the block** 

| function name   | behaviour                            |
| --------------- | ------------------------------------ |
| inp             | Set number of input of the block     |
| outp            | Set number of output of the block    |
| memset*         | Set number of block's memory slots   |
| mem             | Access memory slot value             |
| out0            | Output memory slot value at first input
| out1          | Output memory slot value at second input


**Note that memory slot length of a block equals its input number at creation. memset can be used to extend block memory to handle more data**

**Note that argument of out instruction is a memory slot index**

Otherwise any javascript code inside region will work good if not conflicting with functions above.

## Save and share

User can save its patch or any block's code modification done easily in a readable format. 

Patch can be saved as .map file ( this file does not contains block code ) or the whole project (code and patch structure) as .tezgr file

Code can be saved separately as .lib file. 

Those file can be shared and loaded to other cession. You can either load those file to overwrite current files used or import to add patch structure
to an existing one or expand block possibility for .lib file. Comparing to **Pd**, .map file are similar to .pd file.

## What's new?

**03.09.2022**

* **New IO mechanism** All blocks can trigger code from any of its inputs and not just first input.
* Improving special block code readibility. Now, each special blocks has its own class extension of Block.
* Improving visual parameters code. 
* Improving documentation. User can now set mouse on block and see tips while holding control key.


## Extensions

| name            |                                 |
| --------------- | ------------------------------------ |
| web3            | block can interact with Tezos and Ethereum blockchain                |
| $glyph          | user can write code by drawing shapes. Use $p glyph recognition   |

