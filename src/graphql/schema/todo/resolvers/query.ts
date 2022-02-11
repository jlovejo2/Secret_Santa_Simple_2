import { connect } from '../../../../dao';
import { TodoMvc } from '../../../types';
import { TodoMvcDbObject } from '../../../../dao';
import { ObjectID } from 'mongodb';

const dbPromise = connect();

const getCollection = async () => {
	const db = await dbPromise;
	return db.collection<TodoMvcDbObject>('todos');
};

const fromDbObject = (dbObject: TodoMvcDbObject): TodoMvc => ({
	todoId: dbObject._id.toHexString(),
	completed: dbObject.completed,
	description: dbObject.description
});

export default {
	Query: {
		allTodos: async () => {
			const collection = await getCollection();
			return await collection.find().map(fromDbObject).toArray();
		},
		Todo: async (_: any, { todoId }) => {
			const collection = await getCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(todoId)
			});
			return fromDbObject(dbObject);
		}
	}
};
