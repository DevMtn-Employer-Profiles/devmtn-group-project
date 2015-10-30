var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://192.168.1.24/DevMtnEmployProf',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  }
};
