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
        type: Schema.Types.Mixed
    },
    cohortId: {
        type: Number
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
module.exports = Mongoose.model('User', userSchema);
