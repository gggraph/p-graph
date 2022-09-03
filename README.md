<p align="center">
  <img src=git-content/tezintroloop.gif />
</p>

# Graphy

Graphy is a visual programming langage inspired by Puredata running inside browser.

Its main purpose is to be easy to extend, easy to use, easy to modify.

## What's new?

**03.09.2022**

* **New IO mechanism!** All blocks can trigger code from any of its inputs and not just first input.
* Improving special block code readibility. Now, each special blocks has its own class extension of Block.
* Improving visual parameters code. 
* Improving documentation. User can now set mouse on block and see tips while holding control key.

# Getting started

## Logic

Graphy workspace is divide in two main parts. Left side of the environment is an output screen, right side contains the patch and code editors.
For those already familiar with **Pd**, this will not be a major shift! 
Code works with blocks. Blocks are small item put in a **patch** environment that have inputs and outputs, memory slots and embedded chunk of code.
Any input can be wired to any output. Any output can be wired to any input. When inputs of a block receiving data, the block run its internal code,
eventually modifying the data, then output it and the propagation continue. 
In most configuration, only the first input trigger the block's code, so, in most case, to propagate data, blocks ' outputs should be wired to other blocks' first input.
talk about memory.
talk about the best is to load example project.
present all of this behind.
<p>
  <img src=git-content/basiclogic.gif width="200" height="320" />
   <img src=git-content/basiclogic2.gif width="200" height="320" />
  <img src=git-content/clockloop.gif width="200" height="320" />
  <img src=git-content/outinlogic.gif width="200" height="320" />
</p>

## User Interaction

Here some of the most important shortkey/tips you should know before starting a new patch

* Press [n] key to create a new block at mouse position. This will greatly increase your workflow.
* Double clicking on block to rename it. Once renamed, block will automatically be reload from **library** entries if type is found.
* Press [suppr] key when renaming a block will delete the block.
* Hold [control] key above a block to see its documentation.
* Hold [control] key to interact with specific block in edit mode (default mode).

There is a lot of special blocks that will let user have specific interaction with numbers, array, etc...

<p align="center">
  <img src=git-content/draw.gif width="600" height="400"/>
</p>


## Outputs

Graphy can output audio or graphics to any canvas. 

Left side of interface is the main screen where any block's code will draw by default.
Most HTML5 canvas graphics command are implemented to blocks'code. For example, [pix] block will draw a pixel to the current screen. [rect] block
will fill a rectangle, etc..

Double clicking on the main screen will open a mini portable screen which can be more convenient to work with! 

one gif of screen output

Graphy use the **Web Audio API**. Some blocks can output wave, some blocks can modify enveloppe of wave, some blocks can . See Audio documentation to 
get further.

A dummy patch of a single-oscillator synth.

one video of sound. 

## Code editor

## Save and share

# Extensions

## web3

## $glyph

