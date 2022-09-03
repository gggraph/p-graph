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
<p>
  <img src=git-content/basiclogic.gif width="200" height="320" />
   <img src=git-content/basiclogic2.gif width="200" height="320" />
</p>

## Outputs

## Code editor

## Save and share

# Extensions

## web3

## $glyph

