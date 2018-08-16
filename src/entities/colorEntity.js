function ColorEntity(Interceptor,object,passedArguments, canvasX, canvasY) {
  const self = this;
  console.log(`***********`);
  console.log(passedArguments);
  console.log(`***********`);
  
  this.populate = function(Interceptor) {
    console.log(passedArguments[0]);
    switch (passedArguments[0]) {
    case `rgb`:
      Interceptor.colorMode.mode = 0;
      break;
    case `hsb`:
      Interceptor.colorMode.mode = 1;
      break;
    case `hsl`:
      Interceptor.colorMode.mode = 2;
      break;
    default:
      Interceptor.colorMode.mode = -1;
    }
    if(passedArguments.length == 2) {
      Interceptor.colorMode.max1 = passedArguments[1];
      Interceptor.colorMode.max2 = passedArguments[1];
      Interceptor.colorMode.max3 = passedArguments[1];
      Interceptor.colorMode.maxA = passedArguments[1];
    } else if(passedArguments.length == 5) {
      Interceptor.colorMode.max1 = passedArguments[1];
      Interceptor.colorMode.max2 = passedArguments[2];
      Interceptor.colorMode.max3 = passedArguments[3];
      Interceptor.colorMode.maxA = passedArguments[4];
    }

    console.log(Interceptor.colorMode)
  }

  this.populate(Interceptor);
}
ColorEntity.handledNames = [
  `colorMode`
]

ColorEntity.handles = function(name) {
  return (this.handledNames.indexOf(name) >= 0);
}

ColorEntity.isParameter = true;

Registry.register(ColorEntity);
