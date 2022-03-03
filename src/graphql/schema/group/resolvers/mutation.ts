import { ObjectID } from 'mongodb';
import { connect } from '@dao/index';
import { GroupDbObject, SendPicksResponse } from '@dao/types';
import { NonUser, User } from '@graphql/types';
import sendGrid, { MailDataRequired } from '@sendgrid/mail';
import {
	Resolvers,
	Group,
	CreateGroupMutationResult,
	GroupMemberInput,
	GroupMember
} from '@graphql/types';

const getGroupCollection = async () => {
	const db = await connect();
	return db.collection<GroupDbObject>('Group');
};

const groupFromDbObject = (dbObject: GroupDbObject): Group => ({
	groupId: dbObject._id.toHexString(),
	title: dbObject.title,
	members: dbObject.members
});

const GroupMutationResolvers: Resolvers = {
	Mutation: {
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
            you have the honor, nay the pleasure of having   _______secret_pick_here________ for secret santa

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

			console.log('create group mutation: ', input);

			//map through members in input and assemble array to place in data
			const memberData: GroupMember[] = input.members.map(
				(member: GroupMemberInput) => {
					if (member.userId) {
						const existingUser: User = { userId: member.userId };
						return existingUser;
					} else {
						const nonUser: NonUser = { ...member, is_user: false };
						return nonUser;
					}
				}
			);

			const data: GroupDbObject = {
				title: input.title,
				members: memberData
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
				title: data.title,
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
				title: dbObject.title,
				members: dbObject.members
			});

			return fromGroupDbObject(updatedGroup.value);
		}
	}
};

export default GroupMutationResolvers;
