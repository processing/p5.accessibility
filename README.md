# p5-accessibility

### Overview

p5-accessibility.js makes the p5 canvas more accessible to people that are blind and visually impaired.

The canvas is an inherently inaccessible element in the web. This library tries to reconstruct the content of the p5 canvas in words and sound accessible to screen readers.

The library creates 3 outputs:

1) **Plain Text Output** - Describes the visual content present in the canvas in list form. Each element can be selected to get more details

2) **Table Text Output** - The visual content in the canvas is laid out in the form of a table based on the spatial location of each element- the elements can be selected to get more details.

3) **Sound Output** - This mode explains the movement of the objects present in the canvas. Top to Down movement is represented by a decrease in frequency and left to right through panning.

### Usage

Link to the library at the end of your html file [https://cdn.rawgit.com/processing/p5.accessibility/v0.1.0/dist/p5-accessibility.js](https://cdn.rawgit.com/processing/p5.accessibility/v0.1.0/dist/p5-accessibility.js)

To get the **plain text output**, include the following in your HTML file, and place it where you want the output to be available:
`<section id="textOutput-content"></section>`

To get the **table text output**, include the following in your HTML file, and place it where you want the output to be available:
`<section id="tableOutput-content"></section>`

To get the **sound output**, include the following in your HTML file, and place it where you want the output to be available:
`<section id="soundOutput-content"></section>`

To make the **plain text and table text outputs** visible include the following in your HTML file: 
```
<style>
      #textOutput-content, #tableOutput-content{
        position: static !important;
        left: 10px !important;
        top: auto !important;
        width: auto !important;
        height: auto !important;
        overflow: visible !important;
      }
 </style>
 ```


### To use on local/contribute

* Clone or download this repo
* `cd` into the repo
* run `npm install` to 
* run `grunt curl` to get the latest versions of the CDN libraries
* make changes to the source code in the `src` folder
* run `grunt` in the root folder, this will update the library in `/dist/p5-accessibility.js`
* keep in mind that the examples here reference the CDN library and not the `/dist/p5-accessibility.js` that you might generate. If you want to test your changes with the existing examples, change the index.html files in the examples to point to your local `/dist/p5-accessibility.js`


### References

* [grunt-curl](https://github.com/twolfson/grunt-curl)
