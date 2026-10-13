const mongoose = require('mongoose');

/**
 * Connects to MongoDB database using Mongoose ODM.
 * Configured via process.env.MONGO_URI environment variable.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Database connection error: ${error.message}`);
    // Exit process with failure code if unable to connect to database
    process.exit(1);
  }
};

module.exports = connectDB;
