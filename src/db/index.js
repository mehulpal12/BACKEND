import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import express from "express";

const app = express(); 

const connectDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected: ${db.connection.host}`);
    
  } catch (error) {
    console.error("MongoDB connection error:& password", error);
    process.exit(1);
  }
};
connectDB();
export default connectDB;