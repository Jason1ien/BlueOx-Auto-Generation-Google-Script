Script Features and Use Cases
Initial Problem: Creating a new project takes up an excessive amount of time. Before this script, creating a project required navigating through multiple folders, copying every single template file and then copying it over to the project folder. The user would have to manually rename every single file to the correct project name, resulting in a lot of busy work and wasted time. This script aims to solve this issue by generating each file and renaming it automatically as well as other useful features such as updating files. Listed below is a description on what this script provides, instructions on how to use the script, explanation of the code, and a troubleshooting guide.

Auto Generating a New Project: Instead of manually copy and pasting templates and renaming every document, users can simply fill out the data fields on a new line in the project matrix and click generate. The script will then automatically generate all required files for the project, place all files in its own project folder, and place the project folder in the current project folder directory. Template folders are also placed into the project folder. All data fields in the project matrix will also be automatically filled into each individual google file as well.

Updating Data Fields in All Google Files: If data fields change, instead of manually going into each file and updating each data field one by one, users can simply update the data field on the project tracking matrix, then specify the project number they want to update, and press the update button. All files that correspond to the project number will then be updated with the current data fields entered into the tracking matrix.
Connecting Script to Project Tracking Matrix
Copy the URL of the tracking matrix that you want the script to connect to
Open the script and navigate to main.gs on the left sidebar
On the top of main.gs, go to line 3 of the script 
Paste the copied URL in “INSERT URL HERE”, making sure to also keep the quotation marks

When a linked is added in, the formatting should look exactly like the image below

The spreadsheet should now be connected to the matrix and be ready to run!

Linking a Template File to a Script
Open the script and on the right side, navigate to a script that is linked to a template (i.e budgetBranded.gs)
At the top of every script (i.e budgetBranded.gs), there is a source ID where the script opens the source template from and copies it to a new file
The line of code should be located around line 3-4 and when loaded with an ID, looks like this


To change the template, grab the ID from the URL. The ID is a random string of characters. Below is an example of the ID highlighted from the URL

Once the ID is copied, paste it into the source, while still keeping the single quotes

Now a new template has been linked to a script!







Adding a New Template to the Script
Open the script and on the right side, press the plus button and select “Script”

Type in a name for the script. Not required but recommended to match the name with the document.

On the right side, select any of the scripts with a matching type

Copy all the code from the preexisting script template and paste it into the new script that you created.
Read through the script and replace any changes that are required. 
Different scripts may require different replacements, however some general things to look out for are
File ID Changes
File name changes
Keyword changes






Updating a File Title on Auto Generation
Open the script
On the right hand side, navigate to a script where you want to change title name
Look through the code for a line that is adding together the filename, with the name of the template.
These will look slightly different and will be located in different places depending on the file type. Below are some examples of some different variations.



To change the name, replace the text inside of the quotation marks into the desired name


Save the script by pressing CTRL+S or ⌘+S.
Now when that file is generated, the title of that file will be a different name!














Generating a New Project
To generate a new project, the user must press the generate button on the project tracking matrix

Upon pressing the generate button, the script will retrieve the data that is filled on the most recent line on the tracking matrix
Using this data, the script will run and generate all files for the new project with all data fields generated as well
Once generation is complete, the script will notify the user that the script has finished executing
Approximate run time for generating a new project is between 5 to 7 minutes

Updating a Project
To update a project’s data fields, the user will first replace the data fields with the information they want to update.
After the data fields have been updated on the tracking matrix, to reflect these changes on the google files, the user must specify the project number they want to update on the cell next to the update button

Once a project number has been entered, make sure to click out of the cell to save the input
Upon pressing the update button, the script will retrieve the updated data fields and updated all google files that need to be changed
Once all files corresponding to the project have been updated, the script will notify the user that the script has finished executing
Approximate run time for updating a project is between 1 to 2 minutes.









How the Script Works (Non-Techical Explanation)
	The script is connected to the Google Sheet using Google’s API openByUrl or getActiveSpreadsheet. These two lines tell the script what method to open the project matrix with. OpenByUrl opens the tracking matrix using the spreadsheet’s URL, while getActive spreadsheet opens it up by connecting to whatever spreadsheet the script is linked to. The URL is specified in main.gs in the Matrix script and can be replaced on line 3. 

If the script is connected using getActiveSpreadsheet, nothing needs to be changed in the code. However, the user must ensure that the script is correctly linked to the google spreadsheet.

Data is retrieved from the spreadsheet by looking at each cell and assigning it a corresponding data field in the script. The script will store these data fields and use them for either generating or updating.
	Google Files are generated by creating a copy of the original source file (the template) and then creating an entirely new file. This is similar to a user simply creating a new google file. The new file name is a combination of the Project Number, Client Name, and Project Title with the source document’s name. All formatting is then copied over from the source template to the newly generated file. This is similar to the user copy and pasting everything from the template over to the new google file. Lastly, all data fields are inputted into the file. This step replicates the user going into each data field and replacing it. Once the file is generated, the script stores each individual data field into the tracking matrix’s hidden storage so they can be compared to later when files need to be updated. After the file is generated, the next file in line will start generating.
	Google files are updated by first looking through the user’s (whoever pressed the update button) google account for files that match a name. The name is a combination of the current project that is being updated, along with the file’s corresponding title (i.e _ClientCommsWorkspace). The script retrieves the file and starts updating that single file entirely before moving to the next one. The script knows what fields to update pulling the updated data fields directly from the tracking matrix (these are the new data fields) and comparing it with the data fields stored within the matrix’s hidden storage (these are now old data fields). When an old data field is detected, the script will change the data field. Once all fields are changed, the script moves on to the next file to update.






How the Script Works (Technical Explanation)
	The code is organized by each google file that needs to be generated. Inside of each file, there is a function that generates the file, and a function that updates the file. Inside of main are function calls to generate each google file. Each of these functions requires the folder ID as an argument to know where the file should be placed. The folder ID is specified in parent, which is then opened by parentFolder, and created in folder. 



	In main.gs, global variables are generated for each data field. The data is taken from the spreadsheet opened by the URL and is retrieved through a 2D-Array that mimics the spreadsheet starting at index 0.
	File generation has similar code depending on which filetype they are (Doc, Slides, Spreadsheet). Google docs are first generated by retrieving the sourceDocId which is the template document that will be copied. Keywords are then retrieved and stored into variables for later reference. A document is generated with the title hard coded in. Contents and formatting are then added into the generated document. After the contents are copied, the documents are exactly the same. The script starts to loop through the document once for every element and looks for the keyword. If the keyword is detected, the text is replaced with the correct data field. 

Similarly, Google slides and Google sheets are generated and autofilled using the same method.
	Files are updated in the script “updateFiles”. To check whether a file has been updated, script properties are used. Properties are a form of local storage that is stored within the script, and will not be erased even when the script is not running. Properties allow the script to keep track of each data field, and reference it later when data fields need to be updated. Data field Properties are organized in this template: “rowNumber_cellLetter_rowNumber”. For example, the property for the cell A1, will be stored in the property “1_A_1”. 

Example of Retrieving a Property: 
Upon generating a file, properties are set for that generated file. When a user presses the update button, the function update() stored in updateFiles.gs will run. This function updates each file individually as well as updates the properties. The file that is retrieved is an existing file that matches the naming scheme. The script will search the user’s google drive for a file matching a specified name. An individual file is updated by searching for old properties in the file. For each data field, the document will be looped once and compare the property to the current data field that is pulled directly from the file. If the property and the file’s data field does not match, the text will be replaced. Otherwise, the script will move onto the next data field to search. Once all files have been updated, the properties are then updated by grabbing the current data field on the google spreadsheet.
The file budgetBranded has a slightly different code organization than the rest of the documents since many sheets need to be rearranged to prevent #REF errors. Sheets are copied over using a switch case. The switch case determines the order of the sheet. The case number determines where a sheet is placed in the spreadsheet starting with index 0 as the first sheet. To retrieve the sheets from the template document, sheets are retrieved using an index starting at 0 as well.

For example, the above code retrieves the 8th sheet in the template spreadsheet and places it at the beginning of the newly generated spreadsheet.








General Script Limitations
Data entries must not be the same as each other
Since the script searches through documents for matching keywords, data fields cannot be the exact same. An example of this would be if two people occupied the same position. If data fields are the exact same, then it will replace all fields that match the query. One workaround for this issue is to add a space at the end of one of the matching data entries so both data entries are not exactly the same.

Not every single data field is generated in each file, only the fields specified on the spreadsheet
Other fields that are exclusive to that file must be filled in manually
File names cannot be changed
The script assumes that file names are not changed and searches for files using that assumption. Changing file names will result in the script being unable to update the files.
Only one user may generate a project at a time
When multiple users generate a project, the global script properties may be stored incorrectly may update incorrectly
Data organization on the tracking matrix CANNOT be changed
If the data on the project matrix spreadsheet is moved around, the script is not built to handle these dynamic changes. Each column is hardcoded to map to a specific data field. If these data fields are moved around, incorrect data may be placed in the files.


Project Generation Limitations
Project on the latest line is generated
If adding 2 projects, each project must be adding one at a time, waiting for each script to run finish executing







Project Updating Limitations
Project Number, Client Name, and Project Name CANNOT be updated
When clicking update, the project number, client name, and project name will NOT be updated. The script does not update or modify the project number, client name, or project name.
Only one project may be updated at a time
There is currently no way to update all projects in the tracking matrix at once. In an effort to reduce run time, only the project number that is specified will be updated.
Cells must have EXACT inputs, including spaces
The script reads the cell and takes in exactly what is inputted
When changing the cell to update, make sure to click out of the cell and wait a couple seconds
Pressing update too quickly after immediately after changing the update cell might result in some bugs


Troubleshooting Guide
“Exception: Range Not Found”
ISSUE: In the case that the script specifies “Range Not Found”, it is most likely due to the user not inputting a valid project number into the update cell.
FIX: Verify that a valid project number is inputted into the cell
“TypeError: Cannot read properties of undefined (reading 'findText')”
ISSUE: The user is trying to update a file that they have not opened yet on their google account
FIX: For each file that the user is attempting to update, they must open the file at least once in their google account. This means for a newly generated project, any other user that wants to update that project must open each file within that project to be able to update it through the tracking matrix.



Script Written By: Jason Lien & Lekchok Kartsang
Contact: jason.lien@blueoxfilms.com & lekchok.kartsang@blueoxfilms.com
