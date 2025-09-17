import mongoose from 'mongoose';
import ENV from "../config/env.config.js"

const connectDB = async () => {
    try{
        await mongoose.connect(ENV.MONGO_URL)
        console.log("Mongodb is connected")
    }catch(e){
        console.log(e)
        process.exit(1);
    }
}

export default connectDB;