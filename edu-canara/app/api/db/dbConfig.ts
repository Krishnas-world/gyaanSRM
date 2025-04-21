import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB database:', process.env.MONGO_URL?.split('/').pop());
            isConnected = true;
        });

        connection.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        });

    } catch (error:any) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
}
