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
 
// names = ['test.png.sf-part1', 'test.png.sf-part2', 'test.png.sf-part3', 'test.png.sf-part4']

// splitFile.mergeFiles(names, __dirname + '/output.png')
//   .then(() => {
//     console.log('Done! file merged and named as output.png');
//   })
//   .catch((err) => {
//     console.log('Error: ', err)
//   })