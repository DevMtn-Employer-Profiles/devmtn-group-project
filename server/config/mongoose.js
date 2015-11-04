var mongoose = require('mongoose'),
    profileModel = require('../models/Profile'),
    skillsModel = require('../models/Skill'),
    userModel = require('../models/User'),
    notificationModel = require('../models/Notification');

module.exports = function(config){
    /**********Mongoose Connection*********/
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error...'));
  db.once('open', function callback(){
    console.log('Ye hath entered into the Employer Db');
  });
  profileModel;
  skillsModel;
  userModel;
};