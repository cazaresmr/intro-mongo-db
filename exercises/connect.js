// connect.js
const mongoose = require('mongoose');

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Add other options as needed
  });
};

module.exports = connect;
