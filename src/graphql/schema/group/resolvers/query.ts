import { ObjectID } from 'mongodb';
import { connect } from '../../../../dao';
import { GroupDbObject } from '../../../../dao';
import { Group } from '../../../types';

const dbPromise = connect();

const getCollection = async () => {
	const db = await dbPromise;
	return db.collection<GroupDbObject>('groups');
};

const fromDbObject = (dbObject: GroupDbObject): Group => ({
	groupId: dbObject._id.toHexString(),
	members: dbObject.members
});

export default {
	Query: {
		allGroups: async () => {
			const collection = await getCollection();
			return await collection.find().map(fromDbObject).toArray();
		},
		getGroup: async (_: any, { groupId }) => {
			const collection = await getCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(groupId)
			});
		}
	}
};
