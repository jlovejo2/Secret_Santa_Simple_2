export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Query = {
	allTodos: Array<TodoMvc>;
	Todo?: Maybe<TodoMvc>;
	allUsers: Array<User>;
};

export type QueryTodoArgs = {
	todoId: Scalars['ID'];
};

export type Mutation = {
	createTodo: TodoMvc;
	updateTodo?: Maybe<TodoMvc>;
	sendPicks?: Maybe<SendPicksResponse>;
	createGroup?: Maybe<Group>;
	updateGroup?: Maybe<Group>;
};

export type MutationCreateTodoArgs = {
	description: Scalars['String'];
};

export type MutationUpdateTodoArgs = {
	todoId: Scalars['ID'];
	data: UpdateTodoInput;
};

export type MutationSendPicksArgs = {
	input: SendPicksInput;
};

export type MutationCreateGroupArgs = {
	input: Array<CreateGroupInput>;
};

export type MutationUpdateGroupArgs = {
	input: Array<CreateGroupInput>;
};

export type UpdateTodoInput = {
	description?: Maybe<Scalars['String']>;
	completed?: Maybe<Scalars['Boolean']>;
};

export type CreateGroupInput = {
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	secret_pick?: Maybe<Scalars['String']>;
};

export type SendPicksInput = {
	groupId: Scalars['String'];
	members: Array<CreateGroupInput>;
};

export type TodoMvc = {
	todoId: Scalars['ID'];
	completed: Scalars['Boolean'];
	description: Scalars['String'];
};

export type User = {
	userId: Scalars['ID'];
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	groups?: Maybe<Array<Maybe<Group>>>;
};

export type Group = {
	groupId: Scalars['ID'];
	members?: Maybe<Array<Maybe<GroupMember>>>;
};

export type GroupMember = {
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	secret_pick?: Maybe<Scalars['String']>;
};

export type SendPicksResponse = {
	message?: Maybe<Scalars['String']>;
};

export type AdditionalEntityFields = {
	path?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
};

import { ObjectID } from 'mongodb';
export type TodoMvcDbObject = {
	_id: ObjectID;
	completed: boolean;
	description: string;
};

export type UserDbObject = {
	_id: ObjectID;
	first_name: string;
	last_name: string;
	email: string;
	groups?: Maybe<Array<Maybe<Group>>>;
};

export type GroupDbObject = {
	_id: ObjectID;
	members?: Maybe<Array<Maybe<GroupMember>>>;
};
