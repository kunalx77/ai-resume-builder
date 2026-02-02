import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || "resume-builder";

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    
    const cleanURI = mongoURI.endsWith("/")
      ? mongoURI.slice(0, -1)
      : mongoURI;

    await mongoose.connect(`${cleanURI}/${dbName}`, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(` MongoDB connected (${dbName})`);

  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1); 
  }
};

export default connectDB;
