const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    refco: {
        type: String
    },
    pin: {
      type: String
    }
});

module.exports = mongoose.model('user', userSchema);

