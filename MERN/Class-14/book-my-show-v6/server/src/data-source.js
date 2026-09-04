import mongoose from 'mongoose';

const dbUrl = process.env.MONGO_DB_URL;

class AppDataSource{
    static async connect() {
        await mongoose.connect(dbUrl);
        console.log('Database Connection Open!');
    }

    static async disconnect() {
        mongoose.disconnect();
    }
}

export default AppDataSource;