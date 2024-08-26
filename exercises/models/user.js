const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  betaUser: { type: Boolean, default: false },
  birthDate: Date,
  address: {
    street: String,
    houseNumber: Number,
    zip: Number,
    city: String,
    state: String,
  },
  pets: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
