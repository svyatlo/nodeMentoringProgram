const fs = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('stream');

export default function loadTextByChunks(sourcePath, targetPath) {
    pipeline(
        fs.createReadStream(sourcePath),
        csv(),
        fs.createWriteStream(targetPath, 'utf8'),
        (error) => {
            if (error) {
                console.error('Pipeline failed.', error.message);
            } else {
                console.log('Pipeline succeeded.');
            }
        }
    );
}
