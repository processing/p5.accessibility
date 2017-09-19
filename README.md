# p5-interceptor

### Overview

This is a library to make the p5 canvas accessible.

The canvas is an inherently inaccessible element in the web. This library tries to reconstruct what is on the canvas in p5 in words and sound so that it is accessible to the screen reader.

It helps create 3 kinds of output

1) **Plain Text Output** - This describes the visual content present in the canvas in list form. Each element can be selected so as to get more details

2) **Table Text Output** - Here the visual content in the canvas is laid out in the form of a table based on where each element is - the elements can be selected so as to get more details.

3) **Sound Output** - This mode explains the movement of the objects present in the canvas. Top to Down movement is represented by a decrease in frequency and left to right by panning the stereo output.

### Usage

Link to the library in the end of the html file [https://cdn.rawgit.com/MathuraMG/p5-accessibility/f4e75f25/dist/p5-accessibility.js](https://cdn.rawgit.com/MathuraMG/p5-accessibility/f4e75f25/dist/p5-accessibility.js)

To get the **plain text output**, include the following in your HTML file, where you want the output to be available.
`<section id="textOutput-content"></section>`

To get the **table text output**, include the following in your HTML file, where you want the output to be available.
`<section id="gridOutput-content"></section>`

To get the **sound output**, include the following in your HTML file, where you want the output to be available.
`<section id="soundOutput-content"></section>`


### To use on local/contribute

* Clone or download this repo
* make changes to the source code in the `src` folder
* run `grunt` in the root folder, this will update the library in `/dist/p5-accessibility.js`
