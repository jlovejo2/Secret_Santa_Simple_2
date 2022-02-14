import { connect } from '../../../../dao';
import { UserDbObject } from '../../../../dao/types';
import { Resolvers, User } from '../../../types';

const getUserCollection = async () => {
	const db = await connect();
	return db.collection<UserDbObject>('User');
};

const userFromDbObject = (dbObject: UserDbObject): User => ({
	userId: dbObject._id.toHexString(),
	first_name: dbObject.first_name,
	last_name: dbObject.last_name,
	email: dbObject.email,
	password: dbObject.password,
	groups: dbObject.groups
});

const userMutationResolvers: Resolvers = {
	Mutation: {
		createUser: async (_: any, { input }) => {
			const db = await connect();

			try {
				console.log('entered create user...', input);
				const data: Omit<UserDbObject, '_id'> = {
					first_name: input.first_name,
					last_name: input.last_name,
					email: input.email,
					password: input.password
				};

				const createdUser = await db
					.collection<UserDbObject>('User')
					.insertOne(data);

				return {
					...data,
					userId: createdUser.insertedId.toHexString()
				};
			} catch (e) {
				console.log('error in create user: ', e);
				return e;
			}
		}
	}
};

export default userMutationResolvers;
