import { ObjectID } from 'mongodb';
import { connect } from '../../../../dao';
import { TodoMvcDbObject } from '../../../../dao/types';
import { Resolvers, TodoMvc } from '../../../types';

const getTodoCollection = async () => {
	const db = await connect();
	return db.collection<TodoMvcDbObject>('todo');
};

const todoFromDbObject = (dbObject: TodoMvcDbObject): TodoMvc => ({
	todoId: dbObject._id.toHexString(),
	completed: dbObject.completed,
	description: dbObject.description
});

const todoQueryResolvers: Resolvers = {
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
		}
	}
};

export default todoQueryResolvers;
