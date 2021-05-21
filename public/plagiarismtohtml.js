function start() {
    fetch("/results")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const results = document.getElementById("results");

            results.innerHTML = prettyHtmlLayoutForFile(data.fileName, data.size, 0, false)

            data.storedFiles.forEach(file => {
                results.innerHTML += prettyHtmlLayoutForFile(file.storedFileName, file.size, file.levDistance)
            })

        })
}

function prettyHtmlLayoutForFile(name, size, lev, displayPercentage = true) {
    let result = `<fieldset><legend>${name}</legend>
                          <p>File Size ${size}</p>`

    const plagePercent = 100 - (100 * (lev / size))
    console.log("plagePercent: " + plagePercent)

    let percentResult = 0;
    if (plagePercent > 0) {
        percentResult = Math.round(plagePercent);
    }
    console.log("plagePercent: " + plagePercent)

    if (displayPercentage) {
        result += `<p>Plagiarism Score: ${percentResult }% </p>`;
    }
    result += `</fieldset>`
    return result
}