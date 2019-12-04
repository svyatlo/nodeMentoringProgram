const path = require('path');

import { fileName } from './constants';
import loadTextFully from './loadTextFully';
import loadTextByChunks from './loadTextByChunks';

const sourcePath = path.join(__dirname, '../csv/', fileName.source);
const targetFullyPath = path.join(__dirname, fileName.targetFullyLoaded);
const targetByChunksPath = path.join(__dirname, fileName.targetByChunksLoaded);

loadTextFully(sourcePath, targetFullyPath);
loadTextByChunks(sourcePath, targetByChunksPath);

