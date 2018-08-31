/* global BaseEntity */
class TextEntity extends BaseEntity {
  constructor(Interceptor, shapeObject, textArgs, canvasX, canvasY) {
    super(shapeObject, textArgs, canvasX, canvasY);
    this.type = `${String(textArgs[0]).substring(0, 20)}(${Interceptor.currentColor})`;
    this.populate(shapeObject, textArgs, canvasX, canvasY);
  }

  populate(shapeObject, textArgs, canvasX, canvasY) {
    this.location = this.getLocation(shapeObject, textArgs, canvasX, canvasY);
    this.coordLoc = this.canvasLocator(shapeObject, textArgs, canvasX, canvasY);
  }
  getAttributes() {
    const { type, location, coordinates } = this;
    return ({ type, location, coordinates });
  }
}

TextEntity.handledNames = [`text`];

TextEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

TextEntity.isParameter = false;

/* global Registry */
Registry.register(TextEntity);