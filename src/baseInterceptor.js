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

baseInterceptor.prototype.getColorName = function(colArgs) {
  if (colArgs.length === 4) {
    return (getRGBAname(colArgs));
  } else if (colArgs.length === 3) {
    return (getRGBname(colArgs));
  } else if (colArgs.length === 2) {
    const trans = Math.round(100 - ((colArgs[1] * 100) / 255));
    // assuming that we are doing RGB - this would be a grayscale number
    if (colArgs[0] < 10) {
      const rgb = '(0, 0, 0)';
      if (trans === 0) {
        return ({
          'color': 'black',
          rgb
        });
      } else {
        return ({
          'color': 'black with ' + trans + '% tranparency',
          rgb
        });
      }
    } else if (colArgs[0] > 240) {
      const rgb = '(255, 255, 255)';
      if (trans === 0) {
        return ({
          'color': 'white',
          rgb
        });
      } else {
        return ({
          'color': 'white with ' + trans + '% tranparency',
          rgb
        });
      }
    } else {
      const rgb = '(' + Math.round(colArgs[0]) + ', ' + Math.round(colArgs[0]) + ', ' + Math.round(colArgs[0]) + ')';
      if (trans === 0) {
        return ({
          'color': 'gray',
          rgb
        });
      } else {
        return ({
          'color': 'gray with ' + trans + '% tranparency',
          rgb
        });
      }
    }
  } else if (colArgs.length === 1) {
    if (!(typeof(colArgs[0])).localeCompare('number')) {
      // assuming that we are doing RGB - this would be a grayscale number
      if (colArgs[0] < 10) {
        const rgb = '(0, 0, 0)';
        return ({
          'color': 'black',
          rgb
        });
      } else if (colArgs[0] > 240) {
        const rgb = '(255, 255, 255)';
        return ({
          'color': 'white',
          rgb
        });
      } else {
        const rgb = '(' + colArgs[0] + ', ' + colArgs[0] + ', ' + colArgs[0] + ')';
        return ({
          'color': 'grey',
          rgb
        });
      }
    } else if (!(typeof(colArgs[0])).localeCompare('string')) {
      if (!colArgs[0].charAt(0).localeCompare('#')) {
        return (getHexname(colArgs));
      } else if (colArgs[0].match(/rgba/)) {
        return (RGBAString(colArgs));
      } else if (colArgs[0].match(/rgb/)) {
        return (RGBString(colArgs));
      } else if(htmlColors.findIndex(el => el.name === colArgs[0].toUpperCase())){
        for (let i = htmlColors.length - 1; i >= 0; i--) {
          if (htmlColors[i][0] === colArgs[0].toUpperCase()){
            return(getHexname([htmlColors[i][1]]));
            break;
          }
        }
      }else{
        return ({
          'color': 'white',
          'rgb' : '255, 255, 255',
        });
      }
    }
  } else {
    return ({
      'color': colArgs[0],
      'rgb': ''
    });
  }
}

const htmlColors = [
  ['ALICEBLUE', '#F0F8FF'],['ANTIQUEWHITE', '#FAEBD7'],['AQUA', '#00FFFF'],['AQUAMARINE', '#7FFFD4'],['AZURE', '#F0FFFF'],
  ['BEIGE', '#F5F5DC'],['BISQUE', '#FFE4C4'],['BLACK', '#000000'],['BLANCHEDALMOND', '#FFEBCD'],['BLUE', '#0000FF'],
  ['BLUEVIOLET', '#8A2BE2'],['BROWN', '#A52A2A'],['BURLYWOOD', '#DEB887'],['CADETBLUE', '#5F9EA0'],['CHARTREUSE', '#7FFF00'],
  ['CHOCOLATE', '#D2691E'],['CORAL', '#FF7F50'],['CORNFLOWERBLUE', '#6495ED'],['CORNSILK', '#FFF8DC'],['CRIMSON', '#DC143C'],
  ['CYAN', '#00FFFF'],['DARKBLUE', '#00008B'],['DARKCYAN', '#008B8B'],['DARKGOLDENROD', '#B8860B'],['DARKGRAY', '#A9A9A9'],
  ['DARKGREY', '#A9A9A9'],['DARKGREEN', '#006400'],['DARKKHAKI', '#BDB76B'],['DARKMAGENTA', '#8B008B'],['DARKOLIVEGREEN', '#556B2F'],
  ['DARKORANGE', '#FF8C00'],['DARKORCHID', '#9932CC'],['DARKRED', '#8B0000'],['DARKSALMON', '#E9967A'],['DARKSEAGREEN', '#8FBC8F'],
  ['DARKSLATEBLUE', '#483D8B'],['DARKSLATEGRAY', '#2F4F4F'],['DARKSLATEGREY', '#2F4F4F'],['DARKTURQUOISE', '#00CED1'],['DARKVIOLET', '#9400D3'],
  ['DEEPPINK', '#FF1493'],['DEEPSKYBLUE', '#00BFFF'],['DIMGRAY', '#696969'],['DIMGREY', '#696969'],['DODGERBLUE', '#1E90FF'],
  ['FIREBRICK', '#B22222'],['FLORALWHITE', '#FFFAF0'],['FORESTGREEN', '#228B22'],['FUCHSIA', '#FF00FF'],['GAINSBORO', '#DCDCDC'],
  ['GHOSTWHITE', '#F8F8FF'],['GOLD', '#FFD700'],['GOLDENROD', '#DAA520'],['GRAY', '#808080'],['GREY', '#808080'],['GREEN', '#008000'],
  ['GREENYELLOW', '#ADFF2F'],['HONEYDEW', '#F0FFF0'],['HOTPINK', '#FF69B4'],['INDIANRED', '#CD5C5C'],['INDIGO', '#4B0082'],
  ['IVORY', '#FFFFF0'],['KHAKI', '#F0E68C'],['LAVENDER', '#E6E6FA'],['LAVENDERBLUSH', '#FFF0F5'],['LAWNGREEN', '#7CFC00'],
  ['LEMONCHIFFON', '#FFFACD'],['LIGHTBLUE', '#ADD8E6'],['LIGHTCORAL', '#F08080'],['LIGHTCYAN', '#E0FFFF'],['LIGHTGOLDENRODYELLOW', '#FAFAD2'],
  ['LIGHTGRAY', '#D3D3D3'],['LIGHTGREY', '#D3D3D3'],['LIGHTGREEN', '#90EE90'],['LIGHTPINK', '#FFB6C1'],['LIGHTSALMON', '#FFA07A'],['LIGHTSEAGREEN', '#20B2AA'],
  ['LIGHTSKYBLUE', '#87CEFA'],['LIGHTSLATEGRAY', '#778899'],['LIGHTSLATEGREY', '#778899'],['LIGHTSTEELBLUE', '#B0C4DE'],['LIGHTYELLOW', '#FFFFE0'],
  ['LIME', '#00FF00'],['LIMEGREEN', '#32CD32'],['LINEN', '#FAF0E6'],['MAGENTA', '#FF00FF'],['MAROON', '#800000'],['MEDIUMAQUAMARINE', '#66CDAA'],
  ['MEDIUMBLUE', '#0000CD'],['MEDIUMORCHID', '#BA55D3'],['MEDIUMPURPLE', '#9370DB'],['MEDIUMSEAGREEN', '#3CB371'],['MEDIUMSLATEBLUE', '#7B68EE'],
  ['MEDIUMSPRINGGREEN', '#00FA9A'],['MEDIUMTURQUOISE', '#48D1CC'],['MEDIUMVIOLETRED', '#C71585'],['MIDNIGHTBLUE', '#191970'],
  ['MINTCREAM', '#F5FFFA'],['MISTYROSE', '#FFE4E1'],['MOCCASIN', '#FFE4B5'],['NAVAJOWHITE', '#FFDEAD'],['NAVY', '#000080'],
  ['OLDLACE', '#FDF5E6'],['OLIVE', '#808000'],['OLIVEDRAB', '#6B8E23'],['ORANGE', '#FFA500'],['ORANGERED', '#FF4500'],['ORCHID', '#DA70D6'],
  ['PALEGOLDENROD', '#EEE8AA'],['PALEGREEN', '#98FB98'],['PALETURQUOISE', '#AFEEEE'],['PALEVIOLETRED', '#DB7093'],['PAPAYAWHIP', '#FFEFD5'],
  ['PEACHPUFF', '#FFDAB9'],['PERU', '#CD853F'],['PINK', '#FFC0CB'],['PLUM', '#DDA0DD'],['POWDERBLUE', '#B0E0E6'],['PURPLE', '#800080'],
  ['REBECCAPURPLE', '#663399'],['RED', '#FF0000'],['ROSYBROWN', '#BC8F8F'],['ROYALBLUE', '#4169E1'],['SADDLEBROWN', '#8B4513'],
  ['SALMON', '#FA8072'],['SANDYBROWN', '#F4A460'],['SEAGREEN', '#2E8B57'],['SEASHELL', '#FFF5EE'],['SIENNA', '#A0522D'],['SILVER', '#C0C0C0'],
  ['SKYBLUE', '#87CEEB'],['SLATEBLUE', '#6A5ACD'],['SLATEGRAY', '#708090'],['SLATEGREY', '#708090'],['SNOW', '#FFFAFA'],['SPRINGGREEN', '#00FF7F'],
  ['STEELBLUE', '#4682B4'],['TAN', '#D2B48C'],['TEAL', '#008080'],['THISTLE', '#D8BFD8'],['TOMATO', '#FF6347'],['TURQUOISE', '#40E0D0'],['VIOLET', '#EE82EE'],
  ['WHEAT', '#F5DEB3'],['WHITE', '#FFFFFF'],['WHITESMOKE', '#F5F5F5'],['YELLOW', '#FFFF00'],['YELLOWGREEN', '#9ACD32'] 
];

function getRGBAname(colArgs) {
  const trans = Math.round(100 - ((colArgs[3] * 100)));
  /* global rgbColorName */
  const colorName = rgbColorName(colArgs[0], colArgs[1], colArgs[2]);
  const rgb = '(' + Math.round(colArgs[0]) + ', ' + Math.round(colArgs[1]) + ', ' + Math.round(colArgs[2]) + ')';
  if (trans > 0) {
    return ({
      'color': colorName + ' with ' + trans + '% tranparency',
      rgb
    });
  } else {
    return ({
      'color': colorName,
      rgb
    });
  }
}

function getRGBname(colArgs) {
  const colorName = rgbColorName(colArgs[0], colArgs[1], colArgs[2]);
  const rgb = '(' + Math.round(colArgs[0]) + ', ' + Math.round(colArgs[1]) + ', ' + Math.round(colArgs[2]) + ')';
  return ({
    'color': colorName,
    rgb
  });
}

function getHexname(colArgs) {
  let hex = colArgs[0].slice(1);
  if ((colArgs[0].match(/\w/g)).length === 3) { // 3digithex
    const h3x = hex.match(/\w/g)
    hex = [h3x[0], h3x[0], h3x[1], h3x[1], h3x[2], h3x[2]].join('');
  }
  /* global hexColorName */
  const colorName = hexColorName(hex);
  const r = parseInt(hex[1] + hex[2], 16);
  const g = parseInt(hex[3] + hex[4], 16);
  const b = parseInt(hex[5] + hex[6], 16);
  const rgb = '(' + r + ', ' + g + ', ' + b + ')';
  return ({
    'color': colorName,
    rgb
  });
}

function RGBAString(colArgs) {
  if (colArgs[0].match(/%/)) {
    if (((colArgs[0].match(/%/g)).length) === 4) {
      // when colArgs[0] is 'rgba(10%,100%,30%,0.5%)'
      console.log(colArgs[0]);
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, '')).split(',');
      values = [values[0], values[1], values[3], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));

    } else if (((colArgs[0].match(/%/g)).length) === 3 && ((colArgs[0].match(/,/g)).length) === 2) {
      // when colArgs[0] is 'rgba(10%,100%,30%)'
      console.log(colArgs[0]);
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\)\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, '')).split(',');
      values = [values[0], values[1], values[2], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));
    } else if (((colArgs[0].match(/%/g)).length) === 3) {
      // when colArgs[0] is 'rgba(10%,100%,30%,0.5)'
      // This line creates an array with the values in order the following order ['R','G','B','A']. The RegEx looks for three values with percentages and one value without percentage.   
      const values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/%|\(|\)/g, '')).split(',');
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      values[3] = parseFloat(values[3]);
      return (getRGBAname(values));
    } else {
      const values = [255, 255, 255, 0];
      return (getRGBAname(values));
    }
  } else {
    if (((colArgs[0].match(/,/g)).length) === 2) {
      // when colArgs[0] is 'rgba(10,100,30)'
      console.log(colArgs[0]);
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\)\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, '')).split(',');
      values = [values[0], values[1], values[2], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));
    } else {
      // when colArgs[0] is 'rgba(10,100,30,0.5)'
      // This line creates an array with the values in order the following order ['R','G','B','A']. Values must be less than 255.
      let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, '')).split(',');
      values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2]), parseFloat(values[3])];
      return (getRGBAname(values));
    }
  }
}

function RGBString(colArgs) {
  if (colArgs[0].match(/%/)) {
    if (((colArgs[0].match(/%/g)).length) === 3) {
      // when colArgs[0] is 'rgb(10%,100%,30%)'
      // This line creates an array with the values in order the following order ['R','G','B']. The RegEx looks for three values with percentages.   
      const values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\s*?\))/g))[0]).replace(/%|\(|\)/g, '')).split(',');
      for (let i = values.length - 1; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBname(values));
    } else {
      const values = [255, 255, 255];
      return (getRGBname(values));
    }
  } else {
    // when colArgs[0] is 'rgb(10,100,30)'
    // This line creates an array with the values in order the following order ['R','G','B']. Values must be less than 255.  
    let values = (((colArgs[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, '')).split(',');
    values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2])];
    return (getRGBname(values));
  }
}