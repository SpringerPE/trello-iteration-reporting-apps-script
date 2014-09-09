function createBurnUpChartSheet(spreadsheet, dataSheet) {
  
  var chartSheetName = 'Burn Up - Burn Down';
  
  var chartSheet = deleteAndCreateSheet(spreadsheet, chartSheetName);
  
  var chartType = Charts.ChartType.LINE
  
  var lastRow = dataSheet.getLastRow();

  var ranges = new Array();
  // First range: Day in week
  ranges.push(getRangeByOffsets(dataSheet, 1, lastRow));
  // Second range: Completed Work
  ranges.push(getRangeByOffsets(dataSheet, 4, lastRow));
  // Third range: Left in Iteration
  ranges.push(getRangeByOffsets(dataSheet, 2, lastRow));
  // Fourth range: Work in Progress
  ranges.push(getRangeByOffsets(dataSheet, 3, lastRow));
  
  var chart = createChart(chartSheet, chartSheetName, ranges, chartType);

  chartSheet.insertChart(chart);
  
  return chartSheet;
}

function createTotalVsDoneChartSheet(spreadsheet, dataSheet) {
  
  var chartSheetName = 'Total vs. Done';
  
  var chartSheet = deleteAndCreateSheet(spreadsheet, chartSheetName);
  
  var chartType = Charts.ChartType.COLUMN
  
  var lastRow = dataSheet.getLastRow();
  var lastColumn = dataSheet.getLastColumn();

  var ranges = new Array();
  // First range contains the labels
  ranges.push(getRangeByOffsets(dataSheet, 1, lastRow - 1));
  // Second range contains the total points
  ranges.push(getRangeByOffsets(dataSheet, lastColumn, lastRow - 1));
  // Third range contains the total points
  ranges.push(getRangeByOffsets(dataSheet, lastColumn - 1, lastRow - 1));
  
  var chart = createChart(chartSheet, chartSheetName, ranges, chartType);
  
  chartSheet.insertChart(chart);
  
  return chartSheet;
}


function createChart(chartsheet, chartsheetname, ranges, charttype) {
    var chartBuilder = chartsheet.newChart()
    .setChartType(charttype)
    .setPosition(1,1,0,0)
    .setOption('title', iterationName + ': ' + chartsheetname)
    .setOption('width', 1280)
    .setOption('height', 800);
  
  for (var i = 0; i < ranges.length; i++) {
    chartBuilder.addRange(ranges[i]);
  };
  
  return chartBuilder.build();
}


function createCompletedWorkBreakdownChartSheet(spreadsheet, dataSheet) {
  
  var chartSheetName = 'Completed work breakdown';
  
  var chartSheet = deleteAndCreateSheet(spreadsheet, chartSheetName);
  
  var lastRow = dataSheet.getLastRow();
  var lastColumn = dataSheet.getLastColumn();

  var ranges = new Array();
  // First range contains the labels
  ranges.push(getRangeByOffsets(dataSheet, 1, lastRow - 1));
  // Second range contains the values of the completed work
  ranges.push(getRangeByOffsets(dataSheet, lastColumn - 1, lastRow - 1));
  
  var chart = createBreakDownPieChart(chartSheet, chartSheetName, ranges);
  
  chartSheet.insertChart(chart);
    
  return chartSheet;
}

function createTotalWorkBreakdownChartSheet(spreadsheet, dataSheet) {
  
  var chartSheetName = 'Total work breakdown';
  
  var chartSheet = deleteAndCreateSheet(spreadsheet, chartSheetName);
  
  var lastRow = dataSheet.getLastRow();
  var lastColumn = dataSheet.getLastColumn();

  var ranges = new Array();
  // First range contains the labels
  ranges.push(getRangeByOffsets(dataSheet, 1, lastRow - 1));
  // Second range contains the values of the total work
  ranges.push(getRangeByOffsets(dataSheet, lastColumn, lastRow - 1));
  
  var chart = createBreakDownPieChart(chartSheet, chartSheetName, ranges);
  
  chartSheet.insertChart(chart);
    
  return chartSheet;
}

function createBreakDownPieChart(chartSheet, chartSheetName, ranges) {
  
  var colors = Object.keys(getLabelsFromTrello())

  var chartBuilder = chartSheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .setPosition(1,1,0,0)
    .setOption('title', iterationName + ': ' + chartSheetName)
    .setOption('width', 1280)
    .setOption('height', 800)
    .setOption('is3D', true)
    .setOption('colors', colors);
  for (var i = 0; i < ranges.length; i++) {
    chartBuilder.addRange(ranges[i]);
  }
  
  return chartBuilder.build();
}

function getRangeByOffsets(dataSheet, offsetLetter, offsetDigit) { 
  return dataSheet.getRange(createA1NotationRange(offsetLetter, offsetDigit))
}

function createA1NotationRange(offsetLetter, offsetDigit) {
  var UNICODE_LETTER_BASE = 64
  var rangeFrom = String.fromCharCode(UNICODE_LETTER_BASE + offsetLetter) + '1';
  var rangeTo = String.fromCharCode(UNICODE_LETTER_BASE + offsetLetter) + (offsetDigit).toString();
  return rangeFrom + ':' + rangeTo;
}
