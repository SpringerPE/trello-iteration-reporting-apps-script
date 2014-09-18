function runTrelloIterationReportScript() {
  var reportName = 'Report ' + iterationName;
  var spreadsheet = getOrCreateIterationSpreadsheet(reportName);
  var lists = retrieveOpenListsFromTrello();
  var labels = retrieveLabelsFromTrello();
  var cardsByLists = retrieveCardsByListsFromTrello(lists);
  var allCards = retrieveAllCardsFromTrello();
  var storypointsByListName = getStorypointsByListName(lists,cardsByLists);
  
  // Update the data sheets
  var iterationDetailsSheet = getOrCreateSheet(spreadsheet, "Iteration details data");
  updateIterationDetails(iterationDetailsSheet,storypointsByListName, labels, lists, cardsByLists);

  var dailyStatusSheet = getOrCreateSheet(spreadsheet, "Daily status data");
  updateDailyStatusSheet(dailyStatusSheet, lists, storypointsByListName);

  var hashTagsSheet = getOrCreateSheet(spreadsheet, "Hash Tags data");
  updateHashTagsDetails(hashTagsSheet, allCards);
  
  // Creating the chart sheets
  var chartSheets = {}
  chartSheets["totalVsDone"] = createTotalVsDoneChartSheet(spreadsheet, iterationDetailsSheet);
  chartSheets["totalWorkBreakdown"] = createTotalWorkBreakdownChartSheet(spreadsheet, iterationDetailsSheet, labels);
  chartSheets["completedWorkBreakdown"] = createCompletedWorkBreakdownChartSheet(spreadsheet, iterationDetailsSheet, labels);
  chartSheets["burnUp"] = createBurnUpChartSheet(spreadsheet, dailyStatusSheet);
  chartSheets["hashTagPoints"] = createHashTagsBarChartSheet(spreadsheet, hashTagsSheet);
  
  // Order the sheets
  var sheetNamesOrder = ["Burn Up - Burn Down",
                         "Total vs. Done", 
                         "Total work breakdown", 
                         "Completed work breakdown", 
                         "Hash Tags Story Points", 
                         "Iteration details data", 
                         "Daily status data", 
                         "Hash Tags data"]
  
  sheetNamesOrder.forEach(function(sheet) {
    var tab = spreadsheet.getSheetByName(sheet);
    spreadsheet.setActiveSheet(tab);
    var orderNumber = sheetNamesOrder.indexOf(sheet) + 1;
    spreadsheet.moveActiveSheet(orderNumber);
  })
  
  // Remove unused default sheet "Sheet1"
  var sheet1 = spreadsheet.getSheetByName("Sheet1");
  if (sheet1) spreadsheet.deleteSheet(sheet1); 
}
