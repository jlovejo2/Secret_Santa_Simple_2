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
	Mutation: {
		createTodo: async (_: any, { description }) => {
			const data: Omit<TodoMvcDbObject, '_id'> = {
				description,
				completed: false
			};

			const collection = await getCollection();
			const document = await collection.insertOne(data);
			return fromDbObject({
				...data,
				_id: document.insertedId
			});
		},
		updateTodo: async (_: any, { todoId, data }) => {
			const collection = await getCollection();
			const result = await collection.findOneAndUpdate(
				{
					_id: ObjectID.createFromHexString(todoId)
				},
				{ $set: data },
				{
					returnOriginal: false
				}
			);
			return fromDbObject(result.value);
		}
	}
};
