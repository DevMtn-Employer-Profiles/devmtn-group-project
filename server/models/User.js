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
   }
});

module.exports = mongoose.model('User', userSchema);