var storypointsByListName;


function getStorypointsByListName(lists, cardsByList) {
  var totalStorypoints = 0;
  if (!storypointsByListName){
    storypointsByListName = {};
    for (var i = 0; i < lists.length; i++) {
      storypointsByListName[lists[i].name] = calcStorypointsForCards(cardsByList[lists[i].id]);
    }
    if (DEBUG) Logger.log('Storypoints by listName: %s', storypointsByListName);
  }
  return storypointsByListName;
}


function getStoryPointsFromCardName(cardName) {
  if (DEBUG) Logger.log("Getting storypoints from card with name: %s", cardName)
  
  var cn = cardName.trim();
  var storypoints = 0;
  
  // Check if storypoints are on the first position
  if (cn.charAt(0) == "(" && cn.indexOf(")") != -1) {
    storypoints = parseInt(cn.substr(1,cn.indexOf(")")-1));
  } 
  // Check if storypoints are on the last position
  else if (cn.lastIndexOf("(") != -1 && cn.charAt(cn.length-1) == ")") {
    storypoints = parseInt(cn.substr(cn.lastIndexOf("(")+1,cn.length-2));
  } 
  
  // If 'Not-a-Number' was found, set storypoints to 0.
  if (isNaN(storypoints)) {
    storypoints = 0;
  }
  
  if (DEBUG) Logger.log("Detected storypoints: %s", storypoints.toString())
  
  return storypoints;
}   

function calcStorypointsForCards(cards) {
  if (DEBUG) Logger.log('Calculating storypoints');
  
  var sum = parseInt(0);
  
  for (var i = 0; i < cards.length; i++) { 
    sum += parseInt(getStoryPointsFromCardName(cards[i].name));
  }
  
  if (DEBUG) Logger.log('Accumulated storypoints: %s', sum.toString());
  
  return sum;
}

function calcStorypointsForLabelColor(cards, labelColor) {
  if (DEBUG) Logger.log("Calculating storypoints for label color %s", labelColor)
  
  var sum = parseInt(0);
  
  for (var i = 0; i < cards.length; i++) {
    // TODO: Handle cards with multiple labels
    if (cards[i].labels[0] && cards[i].labels[0].color === labelColor) {
      sum += parseInt(getStoryPointsFromCardName(cards[i].name));
    }
  }

  if (DEBUG) Logger.log('Accumulated storypoints: %s', sum.toString());

  return sum;
}
