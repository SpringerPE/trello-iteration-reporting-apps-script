function updateIterationDetails(sheet) {
  
  sheet.clear()
  
  // Get all needed data 
  // TODO: Refactor to avoid unneeded, multiple Trello requests
  var lists = getOpenListsFromTrello();
  var listNames = getListNames();
  var labels = getLabelsFromTrello();
  var storypointsByListName = getStorypointsByListName(lists);

  // Create Header
  var header = ["Types"].concat(listNames).concat(["Total in iteration"]); 
  ensureHeader(header, sheet);
  
  // Add rows for each label
  for (var property in labels) {
    if (labels[property]) {
      var newLabelRow = [labels[property]];
      var totalPointsByLabel = 0;
      for (var i = 0; i < lists.length; i++) {
        var cellPoints = calcStorypointsForLabelColor(getCardsFromList(lists[i]),property);
        totalPointsByLabel += cellPoints;
        newLabelRow[i+1] = cellPoints;
      }
      
      sheet.appendRow(newLabelRow.concat(totalPointsByLabel));
    }
  }
  
  // Add row with the total points for each list and the whole board
  var totalRow = ["Total points"];
  var totalPoints = 0;
  
  for (var i = 0; i < listNames.length; i++) {
    var cellPoints = storypointsByListName[listNames[i]];
    totalPoints += cellPoints;
    totalRow[i+1] = cellPoints;
  }
  
  sheet.appendRow(totalRow.concat(totalPoints));
}