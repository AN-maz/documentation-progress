const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username tidak boleh kosong MasPur!'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password tidak boleh kosong MasPur!']
    }
});

module.exports = mongoose.model('User', UserSchema);