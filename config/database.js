const mongoose = require('mongoose');

async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectDB;