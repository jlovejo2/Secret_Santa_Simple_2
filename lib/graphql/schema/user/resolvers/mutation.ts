import {
	hashPassword,
	tradeUserForToken,
	validatePassword
} from '@lib/auth/auth-helpers';
import { connect } from '@lib/dao/index';
import { UserDbObject } from '@lib/dao/types';
import { Resolvers, User } from '@lib/graphql/types';

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

			//check that email does not already exist in the database for a user
			// if it does throw an error.
			// note need to add client-side receiving of errors
			const emailExists = await db
				.collection<UserDbObject>('User')
				.findOne({ email: input.email });

			if (emailExists)
				throw new Error('Email already exists for user.  User not created.');

			const hashedPassword = await hashPassword(input.password);

			if (!hashedPassword)
				throw new Error('Error hashing password, User not created');
			else {
				try {
					console.log('entered create user...', input);
					const data: Omit<UserDbObject, '_id'> = {
						first_name: input.first_name,
						last_name: input.last_name,
						email: input.email,
						password: hashedPassword
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
		},
		loginUser: async (_: any, { input }) => {
			console.log('enetered loginUser ', input);

			const collection = await getUserCollection();
			const dbObject = await collection.findOne({ email: input.email });

			console.log('found user: ', dbObject);

			const foundUser = userFromDbObject(dbObject);

			if (foundUser) {
				if (await validatePassword(input.password, foundUser.password)) {
					const token = await tradeUserForToken(foundUser);
					console.log(token);
					// localStorage.setItem('auth-token', token as string);
					return { token, userId: foundUser.userId };
				} else throw new Error('Password was incorrect');
			} else throw new Error('No user was found with that login.');
		}
	}
};

export default userMutationResolvers;
