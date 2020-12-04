import {Request, Response } from 'express';
import { Resolvers, TodoMvc, GroupMember } from "./types";
import { connect, emailSender } from "../dao";
import { Group, GroupDbObject, TodoMvcDbObject } from "../dao/types";
import { ObjectID } from "mongodb";


const dbPromise = connect();

const getCollection = async () => {
  const db = await dbPromise;
  return db.collection<TodoMvcDbObject>("todos");
};

const fromDbObject = (dbObject: TodoMvcDbObject): TodoMvc => ({
  todoId: dbObject._id.toHexString(),
  completed: dbObject.completed,
  description: dbObject.description,
});

const resolvers: Resolvers = {
  Query: {
    allTodos: async () => {
      const collection = await getCollection();
      return await collection.find().map(fromDbObject).toArray();
    },
    Todo: async (_: any, { todoId }) => {
      const collection = await getCollection();
      const dbObject = await collection.findOne({
        _id: ObjectID.createFromHexString(todoId),
      });
      return fromDbObject(dbObject);
    },
  },
  Mutation: {
    createTodo: async (_: any, { description }) => {
      const data: Omit<TodoMvcDbObject, "_id"> = {
        description,
        completed: false,
      };

      const collection = await getCollection();
      const document = await collection.insertOne(data);
      return fromDbObject({
        ...data,
        _id: document.insertedId,
      });
    },
    updateTodo: async (_: any, { todoId, data }) => {
      const collection = await getCollection();
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectID.createFromHexString(todoId),
        },
        { $set: data },
        {
          returnOriginal: false,
        }
      );
      return fromDbObject(result.value);
    },
    sendPicks: async (_:any, { input }, res: Response) => {
        let toAddress: string;
        let fromAddress = process.env.MY_EMAIL;
        let subject = 'This is your pick for SECRET SANTA!!!!!  Only Open if you are alone';
        let body: string;
        
        console.log('Entered send picks!!')
        
        for (let member of input.members) {
            toAddress=member.email
            body = `
            Hi ${member.first_name} ${member.last_name},

            you have the honor, nay the pleasure of having ${member.secret_pick} for secret santa

            sincerely,
            The Internet
            `

            console.log('inside the for loop in send picks')

          const sentEmail = await emailSender(toAddress,fromAddress,subject,body)
          console.log(sentEmail)
        }


        return { 
          message: 'Sent successfully'
        }
    },
    createGroup: async (_:any, { input }) => {
        
        const db = await connect()

        const data: Omit<GroupDbObject, "_id"> = {
            members: input
        };
        
        const createdGroup = await db.collection<GroupDbObject>("Group").insertOne(data)

        // const fromGroupDbObject = (dbObject: GroupDbObject): Group => ({
        //   groupId: dbObject._id.toHexString(),  
        //   members: dbObject.members,
        //   });

        return {
            groupId: createdGroup.insertedId.toHexString(), 
            members: data.members
          };
    },
    updateGroup: async (_:any, { input }) => {
        
        const db = await connect()
        
        const createdGroup = await db.collection<GroupDbObject>("Group").findOneAndUpdate(data)

        const fromGroupDbObject = (dbObject: GroupDbObject): Group => ({
            groupId: dbObject._id.toHexString(),
            members: dbObject.members,
          });

        return fromGroupDbObject({
            ...data,
            _id: createdGroup.insertedId,
          });
    }
  },
};

export default resolvers;