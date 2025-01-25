const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log("inside connectDb");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDb connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
