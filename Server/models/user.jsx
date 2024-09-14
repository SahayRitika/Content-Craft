const mongoose = require('mongoose');

// Use environment variable for MongoDB URI or fall back to localhost for development
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/contentcraft';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
