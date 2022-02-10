import { MongoClient, Db } from 'mongodb';
export * from './types';

const { DB_USER, DB_PASSWORD, DB_CLUSTER } = process.env;
let url: string = '';

if (!DB_USER) {
	throw new Error('Please define the DB_USER env variable');
} else if (!DB_PASSWORD) {
	throw new Error('Please define the DB_PASSWORD env variable');
} else if (!DB_CLUSTER) {
	throw new Error('Please define the DB_CLUSTER env variable');
} else {
	url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/<dbname>?retryWrites=true&w=majority`;
}

export let client: MongoClient;
export let database: Db;

export const connect = async (): Promise<Db> => {
	if (!database) {
		console.info(`Connecting to database ...`);

		try {
			client = await MongoClient.connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
			database = client.db('main');
		} catch (e) {
			console.info('Error connecting...', e);
		}
	}

	return database;
};
