import { UserDbObject } from '../../../../dao/types';
import { connect } from '../../../../dao';
import { ObjectID } from 'mongodb';
import { User } from '../../../types';

const dbPromise = connect();

const getCollection = async () => {
	const db = await dbPromise;
	return db.collection<UserDbObject>('users');
};

const fromDbObject = (dbObject: UserDbObject): User => ({
	userId: dbObject._id.toHexString(),
	first_name: dbObject.first_name,
	last_name: dbObject.last_name,
	email: dbObject.email,
	password: dbObject.password,
	groups: dbObject.groups
});

export default {
	Mutation: {
		createUser: async (_: any, { first_name, last_name, email, password }) => {
			const data: Omit<UserDbObject, '_id'> = {
				first_name,
				last_name,
				email,
				password
			};

			const collection = await getCollection();
			const document = await collection.insertOne(data);
			return fromDbObject({
				...data,
				_id: document.insertedId
			});
		}
	}
};
