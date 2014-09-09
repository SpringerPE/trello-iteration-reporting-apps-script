function runTrelloIterationReportScript() {  
  var reportName = 'Report ' + iterationName;
  var spreadsheet = getOrCreateIterationSpreadsheet(reportName);
  
  // Update the data sheets
  var iterationDetailsSheet = getOrCreateSheet(spreadsheet, "Iteration details data");
  updateIterationDetails(iterationDetailsSheet);
    
  var dailyStatusSheet = getOrCreateSheet(spreadsheet, "Daily status data");
  updateDailyStatusSheet(dailyStatusSheet);
  
  var hashTagsSheet = getOrCreateSheet(spreadsheet, "Hash Tags data");
  updateHashTagsDetails(hashTagsSheet);
  
  // Creating the chart sheets
  var chartSheets = {}
  chartSheets["totalVsDone"] = createTotalVsDoneChartSheet(spreadsheet, iterationDetailsSheet);
  chartSheets["totalWorkBreakdown"] = createTotalWorkBreakdownChartSheet(spreadsheet, iterationDetailsSheet);
  chartSheets["completedWorkBreakdown"] = createCompletedWorkBreakdownChartSheet(spreadsheet, iterationDetailsSheet);
  chartSheets["burnUp"] = createBurnUpChartSheet(spreadsheet, dailyStatusSheet);
  chartSheets["hashTagPoints"] = createHashTagsBarChartSheet(spreadsheet, hashTagsSheet);
  
  // TODO: Order the sheets, set the "right one" active
  
  // Remove unused default sheet "Sheet1"
  var sheet1 = spreadsheet.getSheetByName("Sheet1");
  if (sheet1) spreadsheet.deleteSheet(sheet1); 
}
