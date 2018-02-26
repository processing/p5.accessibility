function getElementById(id) {
  return document.getElementById(id);
}

function createElement(tag) {
  return document.createElement(tag);
}

function createTextStructure() {

  let textOutput = getElementById('textOutput-content');
  let heading = createElement('h1');
  let contentSummary = createElement('p');
  let contentTable = createElement('table');
  let contentDetails = createElement('p');

  textOutput.style.position = 'absolute';
  textOutput.style.left = '-1000px';
  textOutput.style.top = 'auto';
  textOutput.style.width = '1px';
  textOutput.style.height = '1px';
  textOutput.style.overflow = 'hidden';

  textOutput.appendChild(heading);
  textOutput.appendChild(contentSummary);
  textOutput.appendChild(contentTable);
  textOutput.appendChild(contentDetails);

  heading.innerHTML = 'Text Output';

  contentSummary.setAttribute('id', 'textOutput-content-summary');
  contentSummary.setAttribute('tabIndex', '0');
  contentSummary.setAttribute('aria-label','text output summary')
  contentSummary.setAttribute('role','main');

  contentTable.setAttribute('id', 'textOutput-content-table');
  contentTable.setAttribute('summary','text output details');

  contentDetails.setAttribute('id', 'textOutput-content-details');
  contentDetails.setAttribute('tabIndex', '0');
  contentDetails.setAttribute('aria-label','text output details');
  contentDetails.setAttribute('role','main');

}

function createTableStructure() {

  let textOutput = getElementById('gridOutput-content');
  let heading = createElement('h1');
  let contentSummary = createElement('p');
  let contentTable = createElement('table');
  let contentDetails = createElement('div');

  textOutput.style.position = 'absolute';
  textOutput.style.left = '-1000px';
  textOutput.style.top = 'auto';
  textOutput.style.width = '1px';
  textOutput.style.height = '1px';
  textOutput.style.overflow = 'hidden';

  textOutput.appendChild(heading);
  textOutput.appendChild(contentSummary);
  textOutput.appendChild(contentTable);
  textOutput.appendChild(contentDetails);

  heading.innerHTML = 'Grid Output';

  contentSummary.setAttribute('id', 'gridOutput-content-summary');
  contentSummary.setAttribute('tabIndex', '0');
  contentSummary.setAttribute('aria-label','text output summary')
  contentSummary.setAttribute('role','main');

  contentTable.setAttribute('id', 'gridOutput-content-table');
  contentTable.setAttribute('summary','grid output details');

  contentDetails.setAttribute('id', 'gridOutput-content-details');
  contentDetails.setAttribute('tabIndex', '0');
  contentDetails.setAttribute('aria-label','table output details');
  contentDetails.setAttribute('role','main');

}

if(getElementById('textOutput-content')){
  createTextStructure();
}

if(getElementById('gridOutput-content')){
  createTableStructure();
}
