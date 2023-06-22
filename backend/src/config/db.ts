import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {

    try {
        let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        } as ConnectOptions);

        console.log(("Mongo DB connected: " + conn.connection.host));

    } catch (error: any) {
        console.log(("Error en BD: " + error.message));
        process.exit(1);
    }

};

export default connectDB;