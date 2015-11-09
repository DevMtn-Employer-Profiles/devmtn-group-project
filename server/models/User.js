var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true,
       unique: true
   },
   dm_id: {
       type: String
   },
   roles: {
       type: mongoose.Schema.Types.Mixed
   },
   name: {
       first: {
           type: String
       },
       last: {
           type: String
       }
   }, 
   student_matches: {
       type: mongoose.Schema.Types.ObjectId, 
       default: [],
       ref: 'StudentMatch'
   }
});

module.exports = mongoose.model('User', userSchema);