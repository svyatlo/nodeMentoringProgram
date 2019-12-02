const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, '../csv/node_mentoring_t1_2_input_example.csv');

function loadTextFully() {
  csv()
  .fromFile(csvFilePath)
  .then(jsonFormatData => {
    console.log('\nThe file is loaded fully into the RAM');
    const stringFormatData = jsonFormatData.map(item => JSON.stringify(item)).join('\n');
  
    fs.writeFile(path.join(__dirname, 'text_is_fully_loaded.txt'), stringFormatData, (error) => {
      if (error) {
        console.error(error.message);
      }
      console.log('The file has been saved!');
    });
  });
}

function loadTextByChunks() {
  pipeline(
    fs.createReadStream(csvFilePath),
    csv(),
    fs.createWriteStream(path.join(__dirname, 'text_is_loaded_by_chunks.txt'), 'utf8'),
    (error) => {
      if (error) {
        console.error('Pipeline failed.', error.message);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
}


loadTextFully();
loadTextByChunks();

