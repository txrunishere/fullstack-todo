import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstence = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      "Mongo DB Connection Successful!",
      connectionInstence.connection.host,
      connectionInstence.connection.name
    );
  } catch (error) {
    console.log("Error while DB Connection", error);
    process.exit(1)
  }
};

export {
  connectDB
}