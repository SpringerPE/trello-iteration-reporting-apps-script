function getOpenListsFromTrello() {
  if (DEBUG) Logger.log('Getting lists from iteration board');
  
  var trelloUrl = "https://trello.com/1/boards/" + trelloBoardId + "/lists?filter=open&key=" + trelloAppKey + "&token=" + trelloAuthToken;
  var response = UrlFetchApp.fetch(trelloUrl);
  
  var lists = JSON.parse(response.getContentText());
  
  if (DEBUG) {  
    for (var i = 0; i < lists.length; i++) { 
      Logger.log('Found list %s with name "%s"', i.toString(), lists[i].name);
    }
  }
  
  return lists;
}

function getLabelsFromTrello() {
  if (DEBUG) Logger.log('Getting labels from iteration board');
    
  var trelloUrl = "https://trello.com/1/boards/" + trelloBoardId + "/labelNames?key=" + trelloAppKey + "&token=" + trelloAuthToken;
  var response = UrlFetchApp.fetch(trelloUrl);
  
  var labels = JSON.parse(response.getContentText());
  
  if (DEBUG) Logger.log("Found %s labels", Object.keys(labels).length.toString());
  
  return labels;
}

//TODO: cache queries!
function getCardsFromList(list) { 
  if (DEBUG) Logger.log('Getting cards from %s', list.name);
  
  var trelloUrl = "https://trello.com/1/lists/" + list.id + "/cards?filter=open&key=" + trelloAppKey + "&token=" + trelloAuthToken;
  var response = UrlFetchApp.fetch(trelloUrl);
  
  var cards = JSON.parse(response.getContentText());
    
  if (DEBUG) Logger.log("Found %s cards", cards.length.toString());
  
  return cards;
}

function getAllCards() {
  var lists = getOpenListsFromTrello();
  var cards = [];
  for (var i = 0; i < lists.length; i++) {
    cards.push.apply(cards, getCardsFromList(lists[i]));
  }
    
  if (DEBUG) Logger.log('Found a total of %s cards on the board', cards.length.toString());

  return cards;
}

function getListNames(lists) { 
  var lists = getOpenListsFromTrello()
  var listnames = [];
  for (var i = 0; i < lists.length; i++) {
    listnames[i] = lists[i].name
  }
   
  if (DEBUG) Logger.log('Constructed listnames array: \n' + listnames);
  Logger.log(listnames);

  return listnames
}