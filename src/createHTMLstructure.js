function createTextStructure() {
  $('#textOutput-content').append(
    $('<h1/>')
      .html("Text Output")
  );
  $('#textOutput-content').append(
    $('<p/>')
      .attr("id", "textOutput-content-summary")
      .attr("tabIndex", "0")
      .attr("aria-label","text output summary")
      .attr("role","main")
  );
  $('#textOutput-content').append(
    $('<table/>')
      .attr("id", "textOutput-content-table")
      .attr("summary","text output details")
  );
  $('#textOutput-content').append(
    $('<p/>')
      .attr("id", "textOutput-content-details")
      .attr("tabIndex", "0")
      .attr("aria-label","text output details")
      .attr("role","main")
  );
}

function createTableStructure() {
  $('#gridOutput-content').append(
    $('<h1/>')
      .html("Grid Output")
  );
  $('#gridOutput-content').append(
    $('<p/>')
      .attr("id", "gridOutput-content-summary")
      .attr("tabIndex", "0")
      .attr("aria-label","table output summary")
      .attr("role","main")
  );
  $('#gridOutput-content').append(
    $('<table/>')
      .attr("id", "gridOutput-content-table")
      .attr("summary","table output details")
  );
  $('#gridOutput-content').append(
    $('<div/>')
      .attr("id", "gridOutput-content-details")
      .attr("tabIndex", "0")
      .attr("aria-label","table output details")
      .attr("role","main")
  );
}

createTextStructure();
createTableStructure();
