function createTextStructure() {
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
createTextStructure();
