import mongoose from 'mongoose';

class AppDataSource{
    static async connect() {
        await mongoose.connect('mongodb://127.0.0.1:27017/book-my-show');
        console.log('Database Connection Open!');
    }

    static async disconnect() {
        mongoose.disconnect();
    }
}

export default AppDataSource;