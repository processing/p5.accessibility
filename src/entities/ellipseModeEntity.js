function EllipseModeEntity(Interceptor, shapeObject, modeArgs) // eslint-disable-line no-unused-vars
{
  this.populate = function(Interceptor) {
    Interceptor.currentEllipseMode = modeArgs[0];
  }
  this.populate(Interceptor);
}
EllipseModeEntity.handledNames = [
  `ellipseMode`
]

EllipseModeEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

EllipseModeEntity.isParameter = true;

/* global Registry */
Registry.register(EllipseModeEntity);
