function updateIterationDetails(sheet,storypointsByListName, labels, lists, cardsByLists) {

  sheet.clear()

  var listNames = [];
  for (var i = 0; i < lists.length; i++) {
    listNames[i] = lists[i].name
  }

  // Create Header
  var header = ["Types"].concat(listNames).concat(["Total in iteration"]); 
  ensureHeader(header, sheet);

  // Add rows for each label
  for (var property in labels) {
    if (labels[property]) {
      var newLabelRow = [labels[property]];
      var totalPointsByLabel = 0;
      for (var i = 0; i < lists.length; i++) {
        var cellPoints = calcStorypointsForLabelColor(cardsByLists[lists[i].id],property);
        totalPointsByLabel += cellPoints;
        newLabelRow[i+1] = cellPoints;
      }

      sheet.appendRow(newLabelRow.concat(totalPointsByLabel));
    }
  }
  
  // Add row with the total points for each list and the whole board
  var totalRow = ["Total points"];
  var totalPoints = 0;
  
  for (var i = 0; i < lists.length; i++) {
    var cellPoints = storypointsByListName[lists[i].name];
    totalPoints += cellPoints;
    totalRow[i+1] = cellPoints;
  }
  
  sheet.appendRow(totalRow.concat(totalPoints));
}
