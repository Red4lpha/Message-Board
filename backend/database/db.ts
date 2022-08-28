import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

const mongoDB: string = process.env.MONGO_URI || '';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDB);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
