function baseInterceptor() {
  this.colorMode = {
    mode: 0, // RGB -> 0 | HSB -> 1 | HSL -> 2
    max1: 255,
    max2: 255,
    max3: 255,
    maxA: 255,
  };
  this.prevTotalCount = 0,
  this.totalCount = 0,
  this.currentColor = `white`,
  this.bgColor = `white`,
  this.objectArea = 0,
  this.coordinates = [],
  this.objectDescription = ``,
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

baseInterceptor.prototype.getColorName = function(colorArgs) {
  if (colorArgs.length === 4) {
    return (getRGBAname(colorArgs));
  } else if (colorArgs.length === 3) {
    return (getRGBname(colorArgs));
  } else if (colorArgs.length === 2) {
    const trans = Math.round(100 - ((colorArgs[1] * 100) / 255));
    // assuming that we are doing RGB - this would be a grayscale number
    if (colorArgs[0] < 10) {
      const rgb = `(0, 0, 0)`;
      if (trans === 0) {
        return ({
          'color': `black`,
          rgb
        });
      }
      else {
        return ({
          'color': `black with ` + trans + `% tranparency`,
          rgb
        });
      }
    } else if (colorArgs[0] > 240) {
      const rgb = `(255, 255, 255)`;
      if (trans === 0) {
        return ({
          'color': `white`,
          rgb
        });
      }
      else {
        return ({
          'color': `white with ` + trans + `% tranparency`,
          rgb
        });
      }
    } else {
      const rgb = `(` + Math.round(colorArgs[0]) + `, ` + Math.round(colorArgs[0]) + `, ` + Math.round(colorArgs[0]) + `)`;
      if (trans === 0) {
        return ({
          'color': `gray`,
          rgb
        });
      }
      else {
        return ({
          'color': `gray with ` + trans + `% tranparency`,
          rgb
        });
      }
    }
  } else if (colorArgs.length === 1) {
    if (!(typeof(colorArgs[0])).localeCompare(`number`)) {
      // assuming that we are doing RGB - this would be a grayscale number
      if (colorArgs[0] < 10) {
        const rgb = `(0, 0, 0)`;
        return ({
          'color': `black`,
          rgb
        });
      } else if (colorArgs[0] > 240) {
        const rgb = `(255, 255, 255)`;
        return ({
          'color': `white`,
          rgb
        });
      } else {
        const rgb = `(` + colorArgs[0] + `, ` + colorArgs[0] + `, ` + colorArgs[0] + `)`;
        return ({
          'color': `grey`,
          rgb
        });
      }
    } else if (!(typeof(colorArgs[0])).localeCompare(`string`)) {
      if (!colorArgs[0].charAt(0).localeCompare(`#`)) {
        return (getHexname(arguments));
      } else if (colorArgs[0].match(/rgba/)) {
        return (RGBAString(arguments));
      } else if (colorArgs[0].match(/rgb/)) {
        return (RGBString(arguments));
      }
    }
  } else {
    return ({
      'color': colorArgs[0],
      'rgb': ``
    });
  }
}

function getRGBAname(rgbaArgs) {
  const trans = Math.round(100 - ((rgbaArgs[3] * 100)));
  /* global rgbColorName */
  const colorName = rgbColorName(rgbaArgs[0], rgbaArgs[1], rgbaArgs[2]);
  const rgb = `(` + Math.round(rgbaArgs[0]) + `, ` + Math.round(rgbaArgs[1]) + `, ` + Math.round(rgbaArgs[2]) + `)`;
  if (trans > 0) {
    return ({
      'color': colorName + ` with ` + trans + `% tranparency`,
      rgb
    });
  } else {
    return ({
      'color': colorName,
      rgb
    });
  }
}

function getRGBname(rgbArgs) {
  const colorName = rgbColorName(rgbArgs[0], rgbArgs[1], rgbArgs[2]);
  const rgb = `(` + Math.round(rgbArgs[0]) + `, ` + Math.round(rgbArgs[1]) + `, ` + Math.round(rgbArgs[2]) + `)`;
  return ({
    'color': colorName,
    rgb
  });
}

function getHexname(arguments) {
  let hex = arguments[0].slice(1);
  if ((arguments[0].match(/\w/g)).length === 3) { // 3digithex
    const h3x = hex.match(/\w/g)
    hex = [h3x[0], h3x[0], h3x[1], h3x[1], h3x[2], h3x[2]].join(``);
  }
  /* global hexColorName */
  const colorName = hexColorName(hex);
  const r = parseInt(hex[1] + hex[2], 16);
  const g = parseInt(hex[3] + hex[4], 16);
  const b = parseInt(hex[5] + hex[6], 16);
  const rgb = `(` + r + `, ` + g + `, ` + b + `)`;
  return ({
    'color': colorName,
    rgb
  });
}

function RGBAString(arguments) {
  if (arguments[0].match(/%/)) {
    if (((arguments[0].match(/%/g)).length) === 4) {
      // when arguments[0] is 'rgba(10%,100%,30%,0.5%)'
      console.log(arguments[0]);
      let values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      values = [values[0], values[1], values[3], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));

    } else if (((arguments[0].match(/%/g)).length) === 3 && ((arguments[0].match(/,/g)).length) === 2) {
      // when arguments[0] is 'rgba(10%,100%,30%)'
      console.log(arguments[0]);
      let values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\)\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
      values = [values[0], values[1], values[2], 0];
      for (let i = values.length - 2; i >= 0; i--) {
        if (parseInt(values[i]) < 100) {
          values[i] = Math.round(parseInt(values[i]) * 2.55);
        } else {
          values[i] = 255;
        }
      }
      return (getRGBAname(values));
    } else if (((arguments[0].match(/%/g)).length) === 3) {
      // when arguments[0] is 'rgba(10%,100%,30%,0.5)'
      // This line creates an array with the values in order the following order ["R","G","B","A"]. The RegEx looks for three values with percentages and one value without percentage.
      const values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
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
    if (((arguments[0].match(/,/g)).length) === 2) {
      // when arguments[0] is 'rgba(10,100,30)'
      console.log(arguments[0]);
      let values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\)\s*?\s*?)/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
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
      // when arguments[0] is 'rgba(10,100,30,0.5)'
      // This line creates an array with the values in order the following order ["R","G","B","A"]. Values must be less than 255.
      let values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, ``)).split(`,`);
      values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2]), parseFloat(values[3])];
      return (getRGBAname(values));
    }
  }
}

function RGBString(arguments) {
  if (arguments[0].match(/%/)) {
    if (((arguments[0].match(/%/g)).length) === 3) {
      // when arguments[0] is 'rgb(10%,100%,30%)'
      // This line creates an array with the values in order the following order ["R","G","B"]. The RegEx looks for three values with percentages.
      const values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?%\s*?\))/g))[0]).replace(/%|\(|\)/g, ``)).split(`,`);
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
    // when arguments[0] is 'rgb(10,100,30)'
    // This line creates an array with the values in order the following order ["R","G","B"]. Values must be less than 255.
    let values = (((arguments[0].match(/(\(\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?,\s*?((000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(000(?:\.+\d*)|0?\d{1,2}(?:\.+\d*)|1\d\d(?:\.+\d*)|2[0-4]\d(?:\.+\d*)|25[0-5](?:\.+\d*)))\s*?\))/g))[0]).replace(/(\(|\))/g, ``)).split(`,`);
    values = [parseInt(values[0]), parseInt(values[1]), parseInt(values[2])];
    return (getRGBname(values));
  }
}
