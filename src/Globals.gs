// Logging options
var DEBUG = true;
var INFO = false;

// To find the script location in Drive define a unique string here
var UNIQUE_STRING_IN_DRIVE = 'VdGXWPQUcETlJUQBeAVsjj7FbVeEhmHwfML2E4ihNfDS09RPU9nucu6cVQz9agXaCh8iFaICpMJD9iHvTwsmJTE6Z5oHDaT0RZNr1pe4iE7tzgk7M6Znzd3N2u4H2pE'

function run() {
  var docProperties = PropertiesService.getScriptProperties().getProperties();
  Logger.log(docProperties)
}

// Load script properties
var scriptProperties = PropertiesService.getScriptProperties();

// Load access data
// See https://trello.com/1/appKey/generate for details
var trelloAppKey = scriptProperties.getProperty('trelloAppKey');
var trelloAuthToken = scriptProperties.getProperty('trelloAuthToken');

// Load Iteration Board ID
var trelloBoardId = scriptProperties.getProperty('trelloBoardId');

// Load iteration name
// TODO: Don't use a property for this, get it directly from the trello board?!
var iterationName = scriptProperties.getProperty('iterationName');