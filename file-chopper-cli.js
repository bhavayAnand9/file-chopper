#!/usr/bin/env node

var split = require('./file-chopper.js');

var CLi = function () {};

CLi.prototype.parse = function (option) {
  this.option = option;

  switch (option) {
    case '-merge':
      this.method = this.merge;
      break;
    case '-split':
      this.method = this.split;
      break;
    default:
      this.method = this.help;
  }
}

CLi.prototype.help = function () {
  console.log("Usage: splitter -split input.bin 5");
  console.log("       splitter -merge output.bin part1 part2 ...");
  console.log("");
  console.log(" -split <inputFile> <no of parts>");
  console.log("    Split the inputFile in parts.");
  console.log("")
  console.log(" -merge <outpuFilet> <part1File> <part2File> ...");
  console.log("    Merge the given parts to build original file structure.");
  console.log("")
  console.log("")
  console.log("NPM Module 'splitter' by Bhavay Anand");
  console.log("Visit github.com/bhavayAnand9/splitter for any help.");
  console.log("")
}

CLi.prototype.split = function () {
  var file = process.argv[3];
  var parts = parseInt(process.argv[4]);
  
  if (isNaN(parts)) {
    return this.help();
  }

  split.splitFile(file, parts).then(function (names) {
    console.log('Successfully splitted into: ' + names);
  }).catch(function (err) {
    console.log('An error occured:');
    console.log(err);
  });
}

CLi.prototype.merge = function () {
  var files = [];
  var output_file = process.argv[3];

  for (var i = 4; i < process.argv.length; i++) {
    files.push(process.argv[i]);
  }

  split.mergeFiles(files, output_file).then(function() {
    console.log('Succesfully merged the parts into ' + output_file);
  }).catch(function (err) {
    console.log('An error occured:');
    console.log(err);
  });
}

CLi.prototype.run = function () {
  return this.method();
}

if (require.main === module) {
  var cli = new CLi();
  cli
    .parse(process.argv[2])
    .run();
}

