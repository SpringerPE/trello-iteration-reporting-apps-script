## About
A Google Apps Script for creating a report spreadsheet based on your Trello board

## Quickstart 

1. Set up the script properties on File > Project properties > Script properties for:
- iterationName
- trelloAuthToken
- trelloAppKey
- trelloBoardId

2. Optional: Change the reportName on Main.gs

3. Press the start button on Main.gs

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
