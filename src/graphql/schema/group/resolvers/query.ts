import { AggregationCursor, ObjectID } from 'mongodb';
import { connect } from '../../../../dao';
import { GroupDbObject, UserDbObject } from '../../../../dao/types';
import { Resolvers, Group, User } from '../../../types';

const getGroupCollection = async () => {
	const db = await connect();
	return db.collection<GroupDbObject>('Group');
};

const groupFromDbObject = (dbObject: GroupDbObject): Group => ({
	groupId: dbObject._id.toHexString(),
	members: dbObject.members
});

const userFromDbObject = (dbObject: UserDbObject): User => ({
	userId: dbObject._id.toHexString(),
	first_name: dbObject.first_name,
	last_name: dbObject.last_name,
	email: dbObject.email,
	password: dbObject.password,
	groups: dbObject.groups
});

const GroupQueryResolvers: Resolvers = {
	Query: {
		allGroups: async () => {
			const collection = await getGroupCollection();
			return collection.find().map(groupFromDbObject).toArray();
		},
		getGroup: async (_: any, { groupId }) => {
			const collection = await getGroupCollection();
			const dbObject = await collection.findOne({
				_id: ObjectID.createFromHexString(groupId)
			});
			return groupFromDbObject(dbObject);
		},
		getGroupsByUser: async (_: any, { userId }) => {
			const db = await connect();
			const collection = db.collection<UserDbObject>('User');
			const dbObject = await collection
				.aggregate([
					{ $match: { _id: ObjectID.createFromHexString(userId) } },
					{
						$lookup: {
							from: 'Group',
							let: { groupId: '$id' },
							pipeline: [
								{ $match: { $expr: { $and: [{ $eq: ['$id', '$$groupId'] }] } } },
								{
									$lookup: {
										from: 'User',
										let: { userId: '$memberId' },
										pipeline: [
											{ $match: { $expr: { $and: [{ $eq: ['$memberId', '$$userId'] }] } } }
										],
										as: 'members'
									}
								},
								{ $project: { _id: 0, groupId: '$_id', members: 1 } }
							],
							as: 'groups'
						}
					},
					{ $project: { _id: 1, first_name: 1, last_name: 1, email: 1, groups: 1 } }
				])
				.next();

			// dbObject.
			console.log('user', dbObject);

			// if(dbObject) return true
			// else return false

			return userFromDbObject(dbObject);
		}
	}
};

export default GroupQueryResolvers;
