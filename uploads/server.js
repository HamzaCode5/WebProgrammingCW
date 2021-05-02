const express = require("express");
const upload = require("express-fileupload")
const path = require("path");
const fs = require('fs')

const app = express()

app.use(express.static(path.join(__dirname, "public")));
app.use(upload())
app.listen(8080, () => console.log("Listening to http://localhost:8080"));

app.get("/", ((req, res) => res.sendFile(__dirname + "/public/index.html")))

app.get("/datas", ((req, res) => {
    const uploadsPath = path.join(__dirname, 'uploads');
    const dirs = getDirectories(uploadsPath);
    const databaseFiles = getAllStoredFiles(uploadsPath, dirs);
    res.send(databaseFiles)
}))

app.post("/", ((req, res) => prepareEverything(req, res)))

const prepareEverything = (req, res) => {
    const files = req.files
    if (files) {
        const file = files.file;
        const fileName = file.name;

        if (file.mimetype == "text/plain") {
            console.log(`Error: No uploading because File: ${fileName} is a text file`)
            return
        }

        const uploadsPath = path.join(__dirname, 'uploads');
        const dirs = getDirectories(uploadsPath);
        const databaseFiles = getAllStoredFiles(uploadsPath, dirs);
        const newFile = { fileName, code: cleanUpCode(file.data.toString()) }
        console.log(newFile)

        // iterate trough stored File and find which lines are same
        databaseFiles.forEach(dbFile => {
            newFile[dbFile.fileName] = findSameLines(dbFile.code, newFile.code)
        })

        uploadFileToFolder(file, uploadsPath)
        res.send(newFile)
    }
}

const findSameLines = (arr1, arr2) => {
    const maxLength = arr1.length > arr2.length ? arr2.length : arr1.length;

    const sameLines = [];
    for (let i = 0; i < maxLength; i++) {
        if (arr1[i] === arr2[i]) {
            sameLines.push(i)
        }
    }
    return sameLines
};

const uploadFileToFolder = (file, filePath) =>
    file.mv(filePath + "/" + file.name, err => err ? console.error("File Uploaded failed: " + err) : undefined)

const getDirectories = path =>
    fs.readdirSync(path);

const getAllStoredFiles = (path, fileNames) =>
    Object.values(fileNames).map(fileName =>
        ({ fileName, code: cleanUpCode(fs.readFileSync(path + '/' + fileName, 'utf8')) }))

const cleanUpCode = txt =>
    txt.replace(/\r/g, '')
    .replace(/  +/g, ' ')
    .split('\n')
    .filter(l => l.length > 0)
    .map(l => l.trim());