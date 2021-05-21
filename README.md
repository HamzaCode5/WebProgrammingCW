## Plagiarism Source Code Checker

## Upload files for analysis

This web application allows users to upload a source code file and compare its contents against other files, checking for plagiarism. To do this, I used Node - Levenshtein to determine the distance/difference in characters each file had. It'll first measure the characters of the file, then it'll compare next to other files that are within the projects "uploads" folder. To use this just run npm start, go to localhost:8080 and click choose file. Once you've chosen your file, click upload.

## Identify Similarity

After the user has chosen and uploaded a file, the file's size will be compared to the other files stored in the uploads folder. The "num" that's returned is the number of differences the file has compared to the other file for each of the file(s) in the folder. That number then goes through a calculation and gives the user a plagiarism percentage.

## Database

For the database, I didn't connect any Sqlite or PostgreSQL for the storing of the files. Instead, I just have an Uploads folder that stores the files inside every time you upload, and also compares them against a new file that has been uploaded.

## Report

After the user clicks upload they'll be directed to the Plagiarism Report Page, which will supply the file that's been uploaded on the top and its size. With all the other files underneath being compared, you'll have the size and the plagiarism score for each file comparison with the newly uploaded file.

## Invention

I created a Stored Files function which when clicked will return all the files that are currently stored in the "uploads" folder.m I also tried to implement an HTML to PDf so the user could download the report but didn't have any luck with it.

## Testing

There are also files in the testing folder which can be used for testing the code similarity checker

## NPM
Npm downloads
express
express-fileupload
node-levenshtein
