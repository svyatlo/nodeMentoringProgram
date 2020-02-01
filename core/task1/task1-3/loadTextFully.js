const fs = require('fs');
const csv = require('csvtojson');

export default function loadTextFully(sourcePath, targetPath) {
    csv()
        .fromFile(sourcePath)
        .then(jsonFormatData => {
            console.log('\nThe file is loaded fully into the RAM');
            const stringFormatData = jsonFormatData.map(item => JSON.stringify(item)).join('\n');

            fs.writeFile(targetPath, stringFormatData, (error) => {
                if (error) {
                    console.error(error.message);
                }
                console.log('The file has been saved!');
            });
        });
}
