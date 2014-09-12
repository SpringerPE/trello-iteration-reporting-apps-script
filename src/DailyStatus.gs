function updateDailyStatusSheet(sheet, lists, storypointsByListName) {

  ensureHeader(['', 'Left in iteration', 'Work in progress', 'Completed work'], sheet)

  var dayInWeek = Utilities.formatDate(new Date(), "GMT", "EEE");

  // Assumptions: 
  //  - First list on the board is the backlog
  //  - Last list on the board is the completed work
  //  - Everything between is somehow 'in progress'
  //  - 'Left in iteration' is all not finished work (= backlog + in progress)
  var leftInIteration = 0, workInProgress = 0, completedWork = 0;
  
  for (var i = 0; i < lists.length; i++) {
    if (i === 0) {
      leftInIteration += storypointsByListName[lists[i].name];
    } else if (i === lists.length - 1) {
      completedWork = storypointsByListName[lists[i].name];
    } else {
      workInProgress += storypointsByListName[lists[i].name];
      leftInIteration += storypointsByListName[lists[i].name];
    }
  }
  
  var statusDataRow = [dayInWeek,leftInIteration,workInProgress,completedWork]
  
  // Update last row if it is from the same day
  var lastRow = sheet.getLastRow()
  var lastRowDayCell = sheet.getRange(lastRow, 1);
    
  if (dayInWeek === lastRowDayCell.getValue()) {
    if (DEBUG) Logger.log("Deleting existing status row from same day.")
    sheet.deleteRow(lastRow)
  }
  
  sheet.appendRow(statusDataRow);
}
