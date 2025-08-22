import mongoose from "mongoose";

async function ConnectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Task_Management",
    });
    console.log("Db connected");
  } catch (error) {
    console.log("Error in Connecting with db", error);
    process.exit(1)
  }
}

export default ConnectDb;
