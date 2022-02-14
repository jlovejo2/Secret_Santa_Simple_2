import { ObjectID } from 'mongodb';
import { connect } from '../../../../dao';
import { GroupDbObject } from '../../../../dao/types';
import { Resolvers, Group } from '../../../types';

const getGroupCollection = async () => {
	const db = await connect();
	return db.collection<GroupDbObject>('Group');
};

const groupFromDbObject = (dbObject: GroupDbObject): Group => ({
	groupId: dbObject._id.toHexString(),
	members: dbObject.members
});

const GroupQueryResolvers: Resolvers = {
	Query: {
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
	}
};

export default GroupQueryResolvers;
