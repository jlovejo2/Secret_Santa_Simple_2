import { ObjectID } from 'mongodb';
import { connect } from '@dao/index';
import { TodoMvcDbObject } from '@dao/types';
import { Resolvers, TodoMvc } from '@graphql/types';

const getTodoCollection = async () => {
	const db = await connect();
	return db.collection<TodoMvcDbObject>('todo');
};

const todoFromDbObject = (dbObject: TodoMvcDbObject): TodoMvc => ({
	todoId: dbObject._id.toHexString(),
	completed: dbObject.completed,
	description: dbObject.description
});

const todoMutationResolvers: Resolvers = {
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
		}
	}
};

export default todoMutationResolvers;
