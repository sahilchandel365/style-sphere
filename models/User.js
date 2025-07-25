const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,  // ✅ Use native JavaScript String type
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('User', UserSchema);

// ✅ Corrected spelling
module.exports = UserModel;
