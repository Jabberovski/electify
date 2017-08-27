let fs = require('fs');

module.exports.writeFile = function(dataDirectory, data) {
    var path = (dataDirectory + Date.now().toString());
    fs.writeFile(path, data, 'utf8', function() {
        console.log("Stored.");
    });
};

module.exports.createFolder = function(path) {
    if(fs.existsSync(path)) return;
    return fs.mkdirSync(path);
}

module.exports.readAllFilesInFolder = function(path) {
    var result = [];
    var filenames = fs.readdirSync(path);
    // console.log(filenames);
    for(var filename of filenames) {
    // console.log(filename);
        result.push(JSON.parse(fs.readFileSync(path+filename, 'utf-8')));
    }
    // console.log(result);
    // callback(result);
    return result;
};
