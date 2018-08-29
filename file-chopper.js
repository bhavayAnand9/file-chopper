/* Splitter */

 var Promise = require('bluebird');
 var fs      = require('fs');
 
 
 var chopper = function () {};
 
 
 chopper.prototype.splitFile = function(file, parts) {
     var self = this;
 
     if (parts < 1) {
         return Promise.reject(new Error("No of parts must be an integer greater than 1"));
     }
 
     return Promise.promisify(fs.stat)(file).then(function (stat) {
         if (! stat.isFile) {
             return Promise.reject(new Error("Given file isn't valid (fs.stat.isFile property has false value)"));
         }
         if (! stat.size) {
             return Promise.reject(new Error("Given File is empty (fs.stat.size property has 0 value)"));
         }
 
         var totalSize = stat.size;  //totalSize is the size of file
         var splitSize = Math.floor(totalSize / parts);  //splitSize is size of single part
 
         if(splitSize < 1) {
             return Promise.reject(new Error("Too many parts, or file's too small!"));
         }
 
         var lastSplitSize = splitSize + totalSize % parts;
 
         var partInfo = [];
 
         for (var i = 0; i < parts; i ++) {
             partInfo[i] = {
                 number: i + 1,
 
                 start: i * splitSize,
 
                 end: (i * splitSize) + splitSize
             };
 
             if (i === (parts - 1)) {
                 partInfo[i].end = (i * splitSize) + lastSplitSize;
             }
         }
 
         return self.__chopper(file, partInfo);
     });
 };
 
                                                       //MERGE 
 
 chopper.prototype.mergeFiles = function(inputFiles, outputFile) {
     if (inputFiles.length <= 0) {
         return Promise.reject(new Error("Make sure you input an array with files as first parameter!"));
     }
 
     var writer = fs.createWriteStream(outputFile, {
         encoding: null
     });
 
     return Promise.mapSeries(inputFiles, function (file) {
         return new Promise(function (resolve, reject) {
             var reader = fs.createReadStream(file, { encoding: null });
             reader.pipe( writer, { end: false });
             reader.on('error', reject);
             reader.on('end', resolve);
         });
     }).then(function() {
         writer.close();
         return Promise.resolve(outputFile);
     });
 };
 
 
 chopper.prototype.__splitFile = function (file, partInfo) {
     // Now the magic. Read buffers with length..
     var partFiles = [];
 
     return Promise.mapSeries(partInfo, function (info) {
         return new Promise(function (resolve, reject) {
             // Open up a reader
             var reader = fs.createReadStream(file, {
                 encoding: null,
                 start: info.start,
                 end: info.end - 1
             });
 
             var maxPaddingCount = String(partInfo.length).length;
             var currentPad = '';
             for (var i = 0; i < maxPaddingCount; i++) {
                 currentPad += '0';
             }
             // <file>.fc-part01	...... <file>.fc-part14		
             var unpaddedPartNumber = '' + info.number;
             var partNumber = currentPad.substring(0, currentPad.length - unpaddedPartNumber.length) + unpaddedPartNumber;
             var partName = file + '.fc-part' + partNumber;
 
             partFiles.push(partName);
 
             // Open up writer
             var writer = fs.createWriteStream(partName);
 
             // Pipe reader to writer
             var pipe = reader.pipe(writer);
 
             pipe.on('error', reject);
             pipe.on('finish', resolve);
         });
     }).then(function () {
         return Promise.resolve(partFiles);
     });;
 }
 
 module.exports = new chopper();
 