import mongoose from "mongoose";
const connection = async () => {
  try {
    var connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Db connection successful: ${connect.connection.host}`);
  } catch (error) {
    console.log(
      `Exception occured while connecting to mongoDb. ${error.message}`
    );
    process.exit(1);
  }
};

export default connection;
