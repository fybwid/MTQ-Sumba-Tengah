var fs = require('fs');

/**
 * @param {Array<string>} files
 * @param {Function} cb
 */

function ensureFiles(files, cb) {
  var missingFiles = files.reduce(function(prev, filePath) {
    var fileFound = false;

    try {
      fileFound = fs.statSync(filePath).isFile();
    } catch (e) { }

    if (!fileFound) {
      prev.push(filePath + ' Tidak dapat ditemukan');
    }

    return prev;
  }, []);

  if (missingFiles.length) {
    var err = new Error('File yang dibutuhkan tidak ditemukan\n' + missingFiles.join('\n'));
  }

  if (cb) {
    cb(err);
  } else if (err) {
    throw err;
  }
}

module.exports = ensureFiles;
