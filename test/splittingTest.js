const splitFile = require('../splitter')
 
console.log("debug : before starting splitting the input file.")

splitFile.splitFile(__dirname + '/test.mp4', 4)
  .then((names) => {
    console.log(names)
  })
  .catch((err) => {
    console.log('Error: ', err)
  })

console.log("debug : after splitting up and before starting merging.")