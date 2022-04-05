import { ObjectID } from 'mongodb';
import { authenticated } from '@src/auth/auth-guard';
import { connect } from '@src/dao/index';
import { UserDbObject } from '@src/dao/types';
import { Resolvers, User } from '@src/graphql/types';

const getUserCollection = async () => {
	const db = await connect();
	return db.collection<UserDbObject>('User');
};

const userFromDbObject = (dbObject: UserDbObject): User => ({
	userId: dbObject._id.toHexString(),
	first_name: dbObject.first_name,
	last_name: dbObject.last_name,
	email: dbObject.email,
	password: dbObject.password
});

const userQueryResolvers: Resolvers = {
	Query: {
		allUsers: async () => {
			const collection = await getUserCollection();
			return await collection.find().map(userFromDbObject).toArray();
		},
		getUser: authenticated(async (_: any, args, context) => {
			console.log('Entered getUser: ', context.currentUser, args);
			const userId = context.currentUser;

			const collection = await getUserCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(userId)
			});

			return userFromDbObject(dbObject);
		})
	}
};

export default userQueryResolvers;
