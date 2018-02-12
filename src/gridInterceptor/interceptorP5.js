funcNames = allData['classitems'].map(function(x) {
  if (x['overloads']) {
    tempParam = x['overloads'][0]['params'];
  } else {
    tempParam = x['params'];
  }
  return {
    name: x['name'],
    params: tempParam,
    class: x['class'],
    module: x['module'],
    submodule: x['submodule'],
  };
});

funcNames = funcNames.filter(function(x) {
  var className = x['class'];
  return (x['name'] && x['params'] && (className === 'p5'));
});
if(document.getElementById('gridOutput-content')) {
  funcNames.forEach(function(x) {
    // var document = parent.document;
    var originalFunc = p5.prototype[x.name];
    var byID = function(id) {
      var element = document.getElementById(id);
      return element;
    };
    var details = byID('gridOutput-content-details');
    var summary = byID('gridOutput-content-summary');
    var table = byID('gridOutput-content-table');

    p5.prototype[x.name] = function() {
      orgArg = arguments;

      if (frameCount == 0) { // for setup
        table.innerHTML = '';
        details.innerHTML = '';
        summary.innerHTML = '';
        gridInterceptor.createShadowDOMElement(document);
        gridInterceptor.setupObject =
        gridInterceptor.populateObject(x, arguments, gridInterceptor.setupObject, details, false);
        gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
        gridInterceptor.populateTable(details, gridInterceptor.setupObject);
      } else if (frameCount % 20 == 0) {
        gridInterceptor.drawObject =
        gridInterceptor.populateObject(x, arguments, gridInterceptor.drawObject, details, true);
        gridInterceptor.isCleared = false;
      } else if (frameCount % 20 == 1) { // reset some of the variables
        if (!gridInterceptor.isCleared) {
          var cells = document.getElementsByClassName('gridOutput-cell-content');
          cells = [].slice.call(cells);
          cells.forEach(function(cell){
            cell.innerHTML = '';
          });
          programObjects = gridInterceptor.setupObject.objectArray.concat(gridInterceptor.drawObject.objectArray);
          gridInterceptor.populateObjectDetails(gridInterceptor.setupObject, gridInterceptor.drawObject, summary, details);
          gridInterceptor.populateTable(programObjects,document);
        }
        gridInterceptor.drawObject = gridInterceptor.clearVariables(gridInterceptor.drawObject);
      }
      return originalFunc.apply(this, arguments);
    };
  });
}
