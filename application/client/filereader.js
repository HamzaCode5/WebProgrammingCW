const fs = require('fs')

fs.readFile('/Users/hamza/PlagiarismChecker.js', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})