# file-chopper
chopper split and merge files in multiple parts.

### Installation
To Install Globally
```
npm i -g file-chopper --save
```

To Install Locally
```
npm i file-chopper --save
```

### Up To Date
All methods support latest Promise feature of ECMAScript Using BlueBird Promise Library.

#### Split files with input parts
```
file-chopper(file) => Promise<string[]> 
```
string[] is an array containing names of all partition files.

**Input**:
- file: Path to the file to split.
- Int: No of files to create from original file

**Returns**:
- Promise<string[]>: Promise with string[] array containing full paths of all created files.

Example:
```javascript
const file-chopper = require('file-chopper');

file-chopper.splitFile(__dirname + '/fileName', Integer)
  .then((names) => {
    console.log(names);
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
```

#### Merge parts
```
mergeFiles(names, outputFile) => Promise<>
```
**Inputs**:
- names: String[] array with full part paths.
- outputFile: Full path of the output file to be created.

**Returns**:
- Promise<>: Promise that results in an empty resolving.


Example:
```javascript
const file-chopper = require('file-chopper');

file-chopper.mergeFiles(names, __dirname + '/testfile-output.bin')
  .then(() => {
    console.log('Done!');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
```

<!-- ## CLI Tool

### Installation

To use this module as CLI tool you need to install the package globally
```
npm i -g file-chopper
```

Mac & Linux Users might need to give su access by running this command:
```
sudo npm i -g file-chopper
```

### How to Use

The CLI tool works just like you use any other CLI App

```
file-chopper -split <input> <num parts>
file-chopper -merge <part> <part> ...
``` -->