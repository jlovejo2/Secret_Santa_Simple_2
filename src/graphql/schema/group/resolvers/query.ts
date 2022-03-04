import { ObjectID } from 'mongodb';
import { connect } from '@dao/index';
import { GroupDbObject, UserDbObject } from '@dao/types';
import { Resolvers, Group, User } from '@graphql/types';

const getGroupCollection = async () => {
	const db = await connect();
	return db.collection<GroupDbObject>('Group');
};

const groupFromDbObject = (dbObject: GroupDbObject): Group => ({
	groupId: dbObject._id.toHexString(),
	title: dbObject.title,
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
					{
						$lookup: {
							from: 'Group',
							let: { groupId: '$groupID' },
							pipeline: [
								{ $match: { $expr: { $and: [{ $eq: ['$groupID', '$$groupId'] }] } } },
								// {
								// 	$lookup: {
								// 		from: 'User',
								// 		let: { userId: '$memberId' },
								// 		pipeline: [
								// 			{ $match: { $expr: { $and: [{ $eq: ['$memberId', '$$userId'] }] } } }
								// 		],
								// 		as: 'members'
								// 	}
								// },
								{ $project: { _id: 0, groupId: '$_id', title: 1, members: 1 } }
							],
							as: 'groups'
						}
					},
					{ $match: { _id: ObjectID.createFromHexString(userId) } },
					{
						$project: {
							_id: 1,
							first_name: 1,
							last_name: 1,
							email: 1,
							groups: {
								$cond: { if: { $eq: ['$groups', []] }, then: null, else: '$groups' }
							}
						}
					}
				])
				.next();

			// dbObject.
			console.log('user', dbObject.groups[0].members);

			// if(dbObject) return true
			// else return false

			return userFromDbObject(dbObject);
		}
	}
};

export default GroupQueryResolvers;
