const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, 'csv/node_mentoring_t1_2_input_example.csv');

csv()
.fromFile(csvFilePath)
.then(jsonFormatData => {
  console.log('\nThe file is loaded fully into the RAM');
  const stringFormatData = jsonFormatData.map(item => JSON.stringify(item)).join('\n');

  fs.writeFile(path.join(__dirname, 'loaded_fully_text.txt'), stringFormatData, (error) => {
    if (error) throw error;
    console.log('The file has been saved!');
  });
});

pipeline(
  fs.createReadStream(csvFilePath),
  csv(),
  fs.createWriteStream(path.join(__dirname, 'loaded_text_by_chunks.txt')),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);