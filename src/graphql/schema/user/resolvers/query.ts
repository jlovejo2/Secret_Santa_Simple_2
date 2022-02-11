import { connect } from '../../../../dao';
import { ObjectID } from 'mongodb';
import { UserDbObject } from '../../../../dao/types';
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
	Query: {
		allUsers: async () => {
			const collection = await getCollection();
			return await collection.find().map(fromDbObject).toArray();
		},
		getUser: async (_: any, { userId }) => {
			const collection = await getCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(userId)
			});
			return fromDbObject(dbObject);
		}
	}
};
