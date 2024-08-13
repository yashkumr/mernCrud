import mongoose from 'mongoose';

const connectDb = async() => {
 try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
     console.log(`Connected to mongoDb database ${conn.connection.host}`.bgMagenta.white);

 }catch(error){
    console.log(`Error in MongoDb ${error}`.bgRed.white);

 }
}

export default connectDb