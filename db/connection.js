import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const dbURI = process.env.MOGNGO_URL

export const connection = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


