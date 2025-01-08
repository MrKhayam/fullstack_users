import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://khayam:anamkhayam@next-blog.w9mc8.mongodb.net/"
    );
    console.log(`Connection Successfull at host: ${mongoose.connection.host}`);
};


export default connectDB;