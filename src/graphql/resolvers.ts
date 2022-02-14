import { ObjectID } from 'mongodb';
import { connect } from '../dao';
import {
	GroupDbObject,
	SendPicksResponse,
	UserDbObject,
	TodoMvcDbObject
} from '../dao/types';
import sendGrid, { MailDataRequired } from '@sendgrid/mail';
import { Resolvers, User, Group, TodoMvc } from './types';

const getTodoCollection = async () => {
	const db = await connect();
	return db.collection<TodoMvcDbObject>('todo');
};

const todoFromDbObject = (dbObject: TodoMvcDbObject): TodoMvc => ({
	todoId: dbObject._id.toHexString(),
	completed: dbObject.completed,
	description: dbObject.description
});

const getGroupCollection = async () => {
	const db = await connect();
	return db.collection<GroupDbObject>('Group');
};

const groupFromDbObject = (dbObject: GroupDbObject): Group => ({
	groupId: dbObject._id.toHexString(),
	members: dbObject.members
});

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

const resolvers: Resolvers = {
	Query: {
		allTodos: async () => {
			const collection = await getTodoCollection();
			console.log(collection);
			return await collection.find().map(todoFromDbObject).toArray();
		},
		Todo: async (_: any, { todoId }) => {
			const collection = await getTodoCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(todoId)
			});
			return todoFromDbObject(dbObject);
		},
		allUsers: async () => {
			const collection = await getUserCollection();
			return await collection.find().map(userFromDbObject).toArray();
		},
		getUser: async (_: any, { userId }) => {
			const collection = await getUserCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(userId)
			});
			return userFromDbObject(dbObject);
		},
		allGroups: async () => {
			console.log('in all groups...');
			const collection = await getGroupCollection();
			console.log(collection);
			return collection.find().map(groupFromDbObject).toArray();
		},
		getGroup: async (_: any, { groupId }) => {
			const collection = await getGroupCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(groupId)
			});
			return groupFromDbObject(dbObject);
		}
	},
	Mutation: {
		createTodo: async (_: any, { description }) => {
			console.log('creating a todo....');
			const data: Omit<TodoMvcDbObject, '_id'> = {
				description,
				completed: false
			};

			const collection = await getTodoCollection();
			const document = await collection.insertOne(data);
			return todoFromDbObject({
				...data,
				_id: document.insertedId
			});
		},
		updateTodo: async (_: any, { todoId, data }) => {
			const collection = await getTodoCollection();
			const result = await collection.findOneAndUpdate(
				{
					_id: ObjectID.createFromHexString(todoId)
				},
				{ $set: data },
				{
					returnOriginal: false
				}
			);
			return todoFromDbObject(result.value);
		},
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
		},
		sendPicks: async (
			_: any,
			{ input },
			res: Response
		): Promise<SendPicksResponse> => {
			let msg: MailDataRequired;
			let fromAddress = process.env.MY_EMAIL;
			let subject =
				'This is your pick for SECRET SANTA!!!!!  Only Open if you are alone';

			console.log('Entered send picks!!');

			sendGrid.setApiKey(process.env.secret_santa_app_key);

			for (let member of input.members) {
				msg = {
					to: member.email,
					from: fromAddress,
					subject: subject,
					text: `
            Hi ${member.first_name} ${member.last_name},
            you have the honor, nay the pleasure of having ${member.secret_pick} for secret santa

            sincerely,
            The Internet
            `
				};

				sendGrid
					.send(msg)
					.then(() => {
						console.log('Email sent');
					})
					.catch(error => {
						console.error(error);
					});
			}

			return {
				message: 'Sent successfully'
			};
		},
		createGroup: async (_: any, { input }) => {
			const db = await connect();

			const data: Omit<GroupDbObject, '_id'> = {
				members: input
			};

			const createdGroup = await db
				.collection<GroupDbObject>('Group')
				.insertOne(data);

			// const fromGroupDbObject = (dbObject: GroupDbObject): Group => ({
			//   groupId: dbObject._id.toHexString(),
			//   members: dbObject.members,
			//   });

			return {
				groupId: createdGroup.insertedId.toHexString(),
				members: data.members
			};
		},
		updateGroup: async (_: any, { input }) => {
			const db = await connect();

			const updatedGroup = await db
				.collection<GroupDbObject>('Group')
				.findOneAndUpdate(
					{
						_id: ObjectID.createFromHexString(input.groupId)
					},
					{ $set: input },
					{
						returnOriginal: false
					}
				);

			const fromGroupDbObject = (dbObject: GroupDbObject): Group => ({
				groupId: dbObject._id.toHexString(),
				members: dbObject.members
			});

			return fromGroupDbObject(updatedGroup.value);
		}
	}
};

export default resolvers;
