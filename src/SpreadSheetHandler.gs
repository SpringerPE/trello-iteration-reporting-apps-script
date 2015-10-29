function getOrCreateIterationSpreadsheet(spreadsheetName) {

  var files = DriveApp.searchFiles("title contains '"+spreadsheetName+"'")
  
  while (files.hasNext()) {
   var file = files.next();
   if(file.getName() == spreadsheetName) {
      if (DEBUG) Logger.log('Spreadsheet "' + spreadsheetName +'" found.');
      return SpreadsheetApp.openById(file.getId());
    }
  }
  
  if (DEBUG) Logger.log('Spreadsheet "' + spreadsheetName +'" not found, creating new one.');

  return SpreadsheetApp.create(spreadsheetName);                       
}



function getOrCreateIterationSpreadsheetNew(spreadsheetName) {
  
  var parentFolder = getParentFolderOfThisScript();
    
  var files = parentFolder.find(spreadsheetName)
    
  for(var i in files) {
    if(files[i].getName() == spreadsheetName) {
      if (DEBUG) Logger.log('Spreadsheet "' + spreadsheetName +'" found.');
      return SpreadsheetApp.openById(files[i].getId());
    }
  }
  
  if (DEBUG) Logger.log('Spreadsheet "' + spreadsheetName +'" not found, creating new one.');

  // By default spreadsheets are created in the root directory, 'move' it into the right folder.  
  var newFileId = SpreadsheetApp.create(spreadsheetName).getId();
  var newFile = DocsList.getFileById(newFileId);
  newFile.addToFolder(parentFolder);
  newFile.removeFromFolder(DocsList.getRootFolder());
  
  return SpreadsheetApp.openById(newFileId);                            
}

function getParentFolderOfThisScript() {
  var thisScriptFile = DocsList.find(UNIQUE_STRING_IN_DRIVE)[0];
  var parentFolder = thisScriptFile.getParents()[0];
  return parentFolder;
  
}

function getOrCreateSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    if (DEBUG) Logger.log('Sheet "%s" does not exists, adding new one.', sheetName);
    sheet = spreadsheet.insertSheet(sheetName)
  } 
  
  return sheet;
}

function deleteAndCreateSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (sheet) {
    if (DEBUG) Logger.log('Deleting already existing sheet "%s"', sheetName);
    spreadsheet.deleteSheet(sheet);
  } 
  
  return sheet = spreadsheet.insertSheet(sheetName);
}

function ensureHeader(header, sheet) {
  // Only add the header if sheet is empty
  if (sheet.getLastRow() == 0) {
    if (DEBUG) Logger.log('Sheet is empty, adding header.')    
    sheet.appendRow(header);
    return true;
    
  } else {
    if (DEBUG) Logger.log('Sheet is not empty, not adding header.')
    return false;
  }
}
