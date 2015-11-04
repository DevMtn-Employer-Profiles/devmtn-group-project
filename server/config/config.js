var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    /**********PORT Connection*********/
  development: {
    db: 'mongodb://192.168.1.24/DevMtnEmployProf',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: ''/*This needs to be the DevMountain DB address*/,
    rootPath: rootPath,
    port: process.env.PORT || 80 
  }
};
