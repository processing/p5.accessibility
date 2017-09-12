# p5-interceptor

### Overview

This is an interceptor module to make the p5 canvas accessible. 

The canvas is an inherently inaccessible element in the web. This module tries to reconstruct what is on the canvas in p5 in words and sound so that it is accessible to the screen reader.

It helps create 3 kinds of output

1) **Plain Text Output** - This describes the visual content present in the canvas in list form. Each element can be selected so as to get more details

2) **Table Text Output** - Here the visual content in the canvas is laid out in the form of a table based on where each element is - the elements can be selected so as to get more details.

3) **Sound Output** - This mode explains the movement of the objects present in the canvas. Top to Down movement is represented by a decrease in frequency and left to right by panning the stereo output.

### Code structure

The code can be widely split into interceptors (modules that intercept the code and create entities) and entities(classes that decide how each function that is intercepted should be treated)

The interceptors now have the following class structure

    * BaseInterceptor
        * TextInterceptor
        * GridInterceptor
    
and the entities ( p5 functions ) have the following class structure

    * BaseEntity
        * BackgroundEntity
        * FillEntity
        * TextEntity
        * ShapeEntity
        
  (additional entities will be added here)



