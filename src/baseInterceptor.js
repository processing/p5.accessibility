function baseInterceptor() {
  this.prevTotalCount = 0,
  this.totalCount = 0,
  this.currentColor = 'white',
  this.bgColor = 'white',
  this.objectArea = 0,
  this.coordinates = [],
  this.objectDescription = '',
  this.canvasDetails = {
    width: 0,
    height: 0
  },
  this.setupObject = {
    objectArray: [],
    objectCount: 0,
    objectTypeCount: {}
  },
  this.drawObject = {
    objectArray: [],
    objectCount: 0,
    objectTypeCount: {}
  },
  this.isCleared = false;
}

baseInterceptor.prototype.getColorName = function(arguments) {
  if (arguments.length == 4) {
    console.log(arguments);
    var trans = Math.round(100-((arguments[3]*100)/255));
    // assuming that we are doing RGBA - convert RGB values to a name
    var colorName = rgbColorName(arguments[0], arguments[1], arguments[2]);
    var rgb = '(' + arguments[0] + ', ' + arguments[1] + ', ' + arguments[2] + ')';
    return ({
      'color': colorName + ' with '+ trans + '% tranparency',
      'rgb': rgb
    });
  } else if (arguments.length >= 3) {
    // assuming that we are doing RGB - convert RGB values to a name
    var colorName = rgbColorName(arguments[0], arguments[1], arguments[2]);
    var rgb = '(' + arguments[0] + ', ' + arguments[1] + ', ' + arguments[2] + ')';
    return ({
      'color': colorName,
      'rgb': rgb
    });
  }else if (arguments.length == 2 && !(typeof(arguments[0])).localeCompare('number')&&!(typeof(arguments[1])).localeCompare('number')) {
    var trans = Math.round(100-((arguments[1]*100)/255));
     // assuming that we are doing RGB - this would be a grayscale number
    if (arguments[0] < 10) {
      var rgb = '(0, 0, 0)';
      return ({
        'color': 'black with '+ trans + '% tranparency',
        'rgb': rgb
      });
    } else if (arguments[0] > 240) {
      var rgb = '(255, 255, 255)';
      return ({
        'color': 'white with '+ trans + '% tranparency',
        'rgb': rgb
      });
    } else {
      var rgb = '(' + arguments[0] + ', ' + arguments[0] + ', ' + arguments[0] + ')';
      return ({
        'color': 'grey with '+ trans + '% tranparency',
        'rgb': rgb
      });
    }
  } else if (arguments.length == 1) {
    if (!(typeof(arguments[0])).localeCompare('number')) {
      // assuming that we are doing RGB - this would be a grayscale number
      if (arguments[0] < 10) {
        var rgb = '(0, 0, 0)';
        return ({
          'color': 'black',
          'rgb': rgb
        });
      } else if (arguments[0] > 240) {
        var rgb = '(255, 255, 255)';
        return ({
          'color': 'white',
          'rgb': rgb
        });
      } else {
        var rgb = '(' + arguments[0] + ', ' + arguments[0] + ', ' + arguments[0] + ')';
        return ({
          'color': 'grey',
          'rgb': rgb
        });
      }
    } else if (!(typeof(arguments[0])).localeCompare('string')) {
      if (!arguments[0].charAt(0).localeCompare('#')) {
        // if user has entered a hex color
        var colorName = hexColorName(arguments[0].slice(1));
        var r = parseInt(arguments[0].charAt(1) + arguments[0].charAt(2), 16);
        var g = parseInt(arguments[0].charAt(3) + arguments[0].charAt(4), 16);
        var b = parseInt(arguments[0].charAt(5) + arguments[0].charAt(6), 16);
        var rgb = '(' + r + ', ' + g + ', ' + b + ')';
        return ({
          'color': colorName,
          'rgb': rgb
        });
      } else {
        return ({
          'color': arguments[0],
          'rgb': ''
        });
      }
    }
  }
}
