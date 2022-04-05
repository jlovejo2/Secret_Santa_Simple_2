import { MongoClient, Db } from 'mongodb';
export * from './types';

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;
let url: string = '';

if (!DB_USER) {
	throw new Error('Please define the DB_USER env variable');
} else if (!DB_PASSWORD) {
	throw new Error('Please define the DB_PASSWORD env variable');
} else if (!DB_CLUSTER) {
	throw new Error('Please define the DB_CLUSTER env variable');
} else if (!DB_NAME) {
	throw new Error('Please define the DB_NAME env variable');
} else {
	url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;
}

export let client: MongoClient;
export let database: Db;

export const connect = async (): Promise<Db> => {
	if (database) {
		return database;
	}

	const opts = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};

	console.info(`Connecting to database ...`);

	console.log('database url: ', url);

	try {
		client = new MongoClient(url);
		console.log('created mongo client ...');
		await client.connect();
		console.log('successfully connected to database ...');

		let db = client.db('main');
		console.log('found main collection ....');
		database = db;
		return database;
	} catch (e) {
		console.info('Error connecting...', e);
	}
};
