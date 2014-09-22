## About
A Google Apps Script for creating a report spreadsheet based on your Trello board. Read our [blog post](http://springerpe.github.io/tech/2014/09/22/trello-iteration-reporting.html), if you are interested in some background information.

## Quickstart 

1. Clone this repository

2. On Google Drive, create a new project

3. Use the [GAS-pump gem](https://github.com/SpringerPE/gas-pump) to upload the files to the new project that you have just created

4. Set up the script properties on File > Project properties > Script properties for:
 - *iterationName* -- this can be any name you want
 - *trelloAuthToken*
 - *trelloAppKey*
 - *trelloBoardId*
 - for the last three, [Pimp Your Trello Cards](http://bit.ly/pimpTrello) is a handy spreadsheet for getting the keys.

5. Optional: Change the reportName on Main.gs

6. Press the start button on Main.gs

7. Optional: Configure an automatic (time based) trigger by using the 'Resources - Current Script’s triggers' dialog.

Voila! The report should be on your Google Drive

## Anatomy of a Trello board
![Anatomy](/images/anatomyoftrelloboard.png)


#### The Spreadsheet
##### The Data Sheets
###### Iteration Details
Calculates the story points for each label in each list
![Iteration Details](/images/iterationdetails.png)

###### Daily Status
Calculates the daily story points based for: Left in Iteration, Work in Progress, Completed Work
![Daily Status](/images/dailystatus.png)


###### Hash Tags Data
Lists the hash tags used in cards and the equivalent story points for each hash tag
![Hash Tags Data](/images/hashtagsdata.png)


#### The Chart Sheets
##### Total vs Done
A bar chart that compares the total story points and completed work for each label. This is based on the Iteration Details sheet.
![Total vs Done](/images/totalvsdone.png)

##### Total Work Breakdown
A pie chart that represents the percentage of each label for the total work to be done in this iteration. This is based on the Iteration Details sheet.
![Total Work Breakdown](/images/totalworkbreakdown.png)

##### Completed Work Breakdown
A pie chart that represents the percentage of each label for the completed work in this iteration. This is based on the Iteration Details sheet.
![Completed Work Breakdown](/images/completedworkbreakdown.png)

##### Burn Up - Burn Down
A line chart that graphs the story points for: Left in Iteration, Work in Progress, Completed Work. This is based on the Daily Status sheet.
![Burn Up - Burn Down](/images/burnupburndown.png)

##### Hash Tags Points
A bar chart that compares the hashtags based on their story points. This is based on the Hash Tags Data sheet.
![Hash Tags Points](/images/hashtagspoints.png)
