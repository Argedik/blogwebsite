import mongoose from 'mongoose';
interface Connection {
	isConnected?: number;
}

const connection: Connection = {};

export const connectToDb = async () => {
	try {
		const mongoUri = process.env.MONGO;
		if (!mongoUri) {
			throw new Error(
				'MongoDB URI is not defined in the environment variables'
			);
		}
		if (connection.isConnected) {
			console.log('Using existing connection');
			return;
		}
		const db = await mongoose.connect(mongoUri);
		connection.isConnected = db.connections[0].readyState;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to connect to database');
	}
};
