class BaseEntity {
  constructor(Interceptor, object) {
    this.type = `${Interceptor.currentColor} ${object.name}`;
    this.location = ``;
    this.coordinates = ``;
  }

  getAttributes() {
    const {
      type,
      location,
      coordinates
    } = this;
    return ({
      type,
      location,
      coordinates
    });
  }
  getLocation(object, locArgs, canvasX, canvasY) {
    let xCoord, yCoord;
    locArgs = [...locArgs];
    const that = this;
    that.coordinates = ``;
    for (let i = 0; i < locArgs.length; ++i) {
      const a = locArgs[i];
      const description = object.params[i].description;
      if (description.indexOf(`x-coordinate`) !== -1) {
        xCoord = a;
        that.coordinates += Math.round(a) + `x,`;
      } else if (description.indexOf(`y-coordinate`) !== -1) {
        yCoord = a;
        that.coordinates += Math.round(a) + `y`;
      }
    }

    if (xCoord < 0.4 * canvasX) {
      if (yCoord < 0.4 * canvasY) {
        return `top left`;
      } else if (yCoord > 0.6 * canvasY) {
        return `bottom left`;
      } else {
        return `mid left`;
      }
    } else if (xCoord > 0.6 * canvasX) {
      if (yCoord < 0.4 * canvasY) {
        return `top right`;
      } else if (yCoord > 0.6 * canvasY) {
        return `bottom right`;
      } else {
        return `mid right`;
      }
    } else {
      if (yCoord < 0.4 * canvasY) {
        return `top middle`;
      } else if (yCoord > 0.6 * canvasY) {
        return `bottom middle`;
      } else {
        return `middle`;
      }
    }
  }
  /* return which part of the canvas an object os present */
  canvasLocator(object, canvasArgs, canvasX, canvasY) {
    let xCoord, yCoord;
    const noRows = 10;
    const noCols = 10;
    let locX, locY;
    canvasArgs = [...canvasArgs];
    for (let i = 0; i < canvasArgs.length; ++i) {
      const a = canvasArgs[i];
      const description = object.params[i].description;
      if (description.indexOf(`x-coordinate`) !== -1) {
        xCoord = a;
      } else if (description.indexOf(`y-coordinate`) !== -1) {
        yCoord = a;
      }
    }

    locX = Math.floor((xCoord / canvasX) * noRows);
    locY = Math.floor((yCoord / canvasY) * noCols);
    if (locX === noRows) {
      locX -= 1;
    }
    if (locY === noCols) {
      locY -= 1;
    }
    return ({
      locX,
      locY
    });
  }
}

BaseEntity.isParameter = false;