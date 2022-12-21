import mongoose from "mongoose";

async function connectToMongoDb() {
  return await mongoose.connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connectToMongoDb;
