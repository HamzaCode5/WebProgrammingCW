const express = require("express");
const upload = require("express-fileupload")
const path = require("path");

const app = express()

app.use(express.static(path.join(__dirname, "public")));
app.use(upload())
app.listen(8080, () => console.log("Listening to http://localhost:8080"));

app.get("/", ((req, res) => res.sendFile(__dirname + "/public/index.html")))

app.post("/", ((req, res) => {
    const files = req.files
    if (files) {
        const file = files.file
        console.log(file)

        // if (file.mimetype !== "text/plain"){
        //     console.log("Error: No text file")
        //     return
        // }
        const text = file.data.toString()
        console.log(text)

        const fileName = file.name
        console.log(fileName)
        file.mv("./uploads/" + fileName, err => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                const cleaned = cleanUpCode(text)
                res.send(cleaned)
                console.log(cleaned)
            }
        })
        // get those files
        // compareTwoText( arg1, arg2 )
    }
}))

const cleanUpCode = txt => txt.replace(/\r/g, '').replace(/  +/g, ' ').split('\n').filter(l => l.length).map(l => l.replace(/;$/, ''));

const arrayDiff = (arr1, arr2) => {
    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;
};
