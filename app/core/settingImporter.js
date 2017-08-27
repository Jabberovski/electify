var fs = require('fs');

module.exports = {
    importSettings: function(file_path, callback) {
        fs.readFile(file_path.toString(), 'utf-8', function(err, settings) {
            if (err) return callback(err);
            callback(null, settings);
        });
    }
    var settingsX = JSON.parse(settings);
}


