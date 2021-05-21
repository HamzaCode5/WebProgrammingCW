const lev = require("node-levenshtein")
const express = require("express");
const upload = require("express-fileupload")
const path = require("path");
const fs = require('fs');
const app = express();

app.use('/', express.static("public"));

app.use(upload());

app.listen(8080, function() {
    console.log("Listening to http://localhost:8080")
});

app.get("/", function(req, res) {
    res.sendFile("/public/index.html")
})

app.get("/filenames", function(req, res) {
    const uploadsPath = path.join('uploads');
    const storedFileNames = fs.readdirSync(uploadsPath);
    res.json({ storedFileNames })
});

let plagScores = {}
app.get("/results", function(req, res) {
    res.json(plagScores)
})

app.post("/", function(req, res) {
    const newUploadedFile = req.files

    if (newUploadedFile === null) {
        console.log("Please first choose a file before upload")
        return
    }

    const file = newUploadedFile.file;
    const fileName = file.name;
    const fileData = file.data.toString()
    const uploadsPath = path.join('uploads');
    const storedFileNames = fs.readdirSync(uploadsPath);

    if (!allowedMimetype.includes(file.mimetype)) {
        res.send(`Error Wrong File Type, \nFile '${fileName}' is a '${file.mimetype}' Source Code Files Only, Please Go Back And Upload A Source Code File`)
        return
    } else {
        uploadFileToFolder(file, uploadsPath)
    }

    const dataOfAll = {
        "fileName": fileName,
        "size": fileData.length,
        "storedFiles": []
    }

    Object.values(storedFileNames).forEach((storedFileName) => {

        const storedFileData = fs.readFileSync(uploadsPath + '/' + storedFileName, 'utf8')
        const num = lev.compare(storedFileData, fileData)
        const currentFile = {
            "storedFileName": storedFileName,
            "levDistance": num,
            "size": storedFileData.length
        }

        dataOfAll.storedFiles.push(currentFile)

    })

    plagScores = dataOfAll
    res.sendFile(__dirname + "/public/PlagiarismScore.html")

})

const allowedMimetype = [
    "text/css",
    "application/javascript",
    "application/x-javascript",
    "application/ecmascript",
    "text/javascript",
    "text/x-python",
    "application/java",
    "application/java-byte-code",
    "application/x-bytecode.python",
    "application/octet-stream"
    //add mimetype here for more source code types/lang allowed
]
const uploadFileToFolder = (file, filePath) =>
    file.mv(filePath + "/" + file.name, err => err ? console.error("File Uploaded failed: " + err) : undefined)