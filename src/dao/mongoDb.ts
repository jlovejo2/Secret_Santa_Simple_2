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
	url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/<dbname>?retryWrites=true&w=majority`;
}

export let client: MongoClient = null;
export let database: Db = null;

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
		client = new MongoClient(url, opts);
		console.log('created mongo client ...', client, database);
		await client.connect();

		let db = client.db('main');
		database = db;

		console.log('connected to database', database);

		return database;
	} catch (e) {
		console.info('Error connecting...', e);
	}
};
