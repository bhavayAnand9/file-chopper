const splitFile = require('../splitter')

names = ['test.mp4.sf-part1', 'test.mp4.sf-part2', 'test.mp4.sf-part3', 'test.mp4.sf-part4']

splitFile.mergeFiles(names, __dirname + '/output.mp4')
  .then(() => {
    console.log('Done! file merged and named as output.mp4');
  })
  .catch((err) => {
    console.log('Error: ', err)
  })