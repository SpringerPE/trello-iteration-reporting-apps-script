function retrieveCardsByListsFromTrello(lists) {
  var cards = retreieveAllCardsFromTrello();
  return groupCardsByLists(cards, lists);
}

function groupCardsByLists(cards, lists) {
  var cardsByLists = [];
  for (var i = 0; i < lists.length; i++) {
    cardsByLists[lists[i].id]=[];
  }
  for (var i = 0; i < cards.length; i++) {
    if(!cardsByLists[cards[i].idList]){
      cardsByLists[cards[i].idList]=[];
    }
    cardsByLists[cards[i].idList].push(cards[i]);
  }
  return cardsByLists;
}

function retreieveAllCardsFromTrello() {
  if (DEBUG) Logger.log('Retrieving all cards from board %s', trelloBoardId);
  var trelloUrl = "https://trello.com/1/boards/" + trelloBoardId + "/cards?filter=open&key=" + trelloAppKey + "&token=" + trelloAuthToken;
  var response = UrlFetchApp.fetch(trelloUrl);

  var cards = JSON.parse(response.getContentText());
  if (DEBUG) Logger.log('Retrieved a total of %s cards from board', cards.length.toString());
  return cards;
}

function retrieveOpenListsFromTrello() {
  if (DEBUG) Logger.log('Retrieving lists from iteration board');
  
  var trelloUrl = "https://trello.com/1/boards/" + trelloBoardId + "/lists?filter=open&key=" + trelloAppKey + "&token=" + trelloAuthToken;
  var response = UrlFetchApp.fetch(trelloUrl);
  
  var lists = JSON.parse(response.getContentText());
  
  if (DEBUG) {  
    for (var i = 0; i < lists.length; i++) { 
      Logger.log('Retrieved list %s with name "%s"', i.toString(), lists[i].name);
    }
  }
  return lists;
}

function retrieveLabelsFromTrello() {
  if (DEBUG) Logger.log('Retrieving labels from iteration board');
    
  var trelloUrl = "https://trello.com/1/boards/" + trelloBoardId + "/labelNames?key=" + trelloAppKey + "&token=" + trelloAuthToken;
  var response = UrlFetchApp.fetch(trelloUrl);
  
  var labels = JSON.parse(response.getContentText());
  
  if (DEBUG) Logger.log("Retrieved %s labels from board", Object.keys(labels).length.toString());
  
  return labels;
}
