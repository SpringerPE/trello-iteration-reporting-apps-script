function updateHashTagsDetails(sheet, cards) {
  
  sheet.clear();
  
  // Get all needed data 
  // TODO: Refactor to avoid unneeded, multiple Trello requests
  var hashTagPoints = calculateHashTags(cards);
  
  // Create Header
  var header = (["Hash tags", "Total points in iteration"]); 
  ensureHeader(header, sheet);
  
  // Add rows for each hash tag
  for (var hashTag in hashTagPoints) {
    sheet.appendRow([hashTag,hashTagPoints[hashTag]])
  }
  
  sheet.sort(2, false);
}
