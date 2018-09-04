class FillEntity {
  constructor(Interceptor, shapeObject, fillArgs, canvasX, canvasY) {
    this.fillArgs = [...fillArgs];
    this.populate(Interceptor);
  }
  populate(Interceptor) {
    if (this.fillArgs[0].name === `p5.Color`) {
      this.fillArgs = this.fillArgs[0].levels;
    }
    Interceptor.currentColor = Interceptor.getColorName(this.fillArgs).color + Interceptor.getColorName(this.fillArgs).rgb;
  }
}
FillEntity.handledNames = [`fill`];

FillEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

FillEntity.isParameter = true;

/* global Registry */
Registry.register(FillEntity);