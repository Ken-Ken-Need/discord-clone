import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        if (mongoose.connections[0].readyState) {
            return;
        }
        await mongoose.connect(process.env.DSN ? process.env.DSN : "");
        console.log('MongoDB Connected');
    }
    catch {
        throw {error: "error occurred connecting to the server"}
    }
};

export default connectDB;
