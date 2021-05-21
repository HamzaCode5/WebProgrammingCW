function start() {
    fetch("/filenames")
        .then(response => response.json())
        .then(data => {
            const filesList = document.getElementById("listOfFilename");
            data["storedFileNames"].forEach(name => {
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(name));
                filesList.appendChild(li);

            })

            data.storedFiles.forEach(file => {
                results.innerHTML += displayList(name, filesList)
            })

        })

}

function displayList(name, filesList) {
    let result = `<fieldset><legend>${name}</legend>
        <p>File Name ${filesList}</p>`
    result += `</fieldset>`
    return result
}