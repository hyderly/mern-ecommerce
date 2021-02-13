import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`DataBase Connected at ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB connecttion error");
    process.exit(1);
  }
};

export default connectDB;
