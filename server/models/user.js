const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    expiredin:{ type: Number},
    accesToken: { type: String}

    },{
        timestamps: true
    }
);
module.exports = mongoose.model('Users', userSchema);