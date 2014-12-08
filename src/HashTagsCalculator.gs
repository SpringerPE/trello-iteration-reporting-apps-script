function calculateHashTags(cards) {
  var calculatedHashTags = {}
  
  for (var i = 0; i < cards.length; i++) {
    var cardName = cards[i].name;
    var cardHashTags = mapPointsToHashTags(cardName);
   
    for(hashTag in cardHashTags) {
     if (calculatedHashTags[hashTag] === undefined ) {
       calculatedHashTags[hashTag] = cardHashTags[hashTag];
     } else {
       calculatedHashTags[hashTag] += cardHashTags[hashTag];
     }
  }};

  if (DEBUG) Logger.log("Calculated hash tags: %s", calculatedHashTags);
  
  return calculatedHashTags;
}

function mapPointsToHashTags(cardName) {
  var hashTags = getHashTagsFromCardName(cardName);
  var storyPoints = getStoryPointsFromCardName(cardName);
  var mapHashTagsPoints = {};
  
  if (hashTags !== null) {
    hashTags.forEach( function(hashTag) {
      hashTag = hashTag.toLowerCase();
      mapHashTagsPoints[hashTag] = storyPoints;
    });
  };
  
  return mapHashTagsPoints;
}

function getHashTagsFromCardName(cardName) {
  if (DEBUG) Logger.log("Getting hash tags from card with name: %s", cardName)
  
  var cn = cardName.trim();
  var foundHashTags = cn.match(/#[a-z0-9]+/gi);
    
  if (DEBUG) Logger.log("Detected hash tags: %s", foundHashTags);
  
  return foundHashTags;
}
