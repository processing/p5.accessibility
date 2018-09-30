class BackgroundEntity {
    constructor(Interceptor, x, backgroundArgs) { /* The "x" is unused due to dynamic object creation in InterceptorFunctions entityClass.  */ // eslint-disable-line
    this.backgroundArgs = backgroundArgs;
    this.populate(Interceptor);
  }
  populate(Interceptor) {
    if (this.backgroundArgs[0].name === `p5.Color`) {
      this.backgroundArgs = this.backgroundArgs[0].levels;
    }
    Interceptor.bgColor = Interceptor.getColorName(this.backgroundArgs).color + Interceptor.getColorName(this.backgroundArgs).rgb;
  }
}
BackgroundEntity.handledNames = [`background`];

BackgroundEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

BackgroundEntity.isParameter = true;

/* global Registry */
Registry.register(BackgroundEntity);