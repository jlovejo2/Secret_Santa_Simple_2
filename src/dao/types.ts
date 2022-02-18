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

export type Mutation = {
	createGroup?: Maybe<Group>;
	createTodo: TodoMvc;
	createUser?: Maybe<User>;
	sendPicks?: Maybe<SendPicksResponse>;
	updateGroup?: Maybe<Group>;
	updateTodo?: Maybe<TodoMvc>;
};

export type MutationCreateGroupArgs = {
	input: Array<CreateGroupInput>;
};

export type MutationCreateTodoArgs = {
	description: Scalars['String'];
};

export type MutationCreateUserArgs = {
	input?: Maybe<CreateUserInput>;
};

export type MutationSendPicksArgs = {
	input: SendPicksInput;
};

export type MutationUpdateGroupArgs = {
	input: SendPicksInput;
};

export type MutationUpdateTodoArgs = {
	todoId: Scalars['ID'];
	data: UpdateTodoInput;
};

export type SendPicksInput = {
	groupId: Scalars['String'];
	members: Array<CreateGroupInput>;
};

export type CreateGroupInput = {
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	secret_pick?: Maybe<Scalars['String']>;
};

export type Query = {
	Todo?: Maybe<TodoMvc>;
	allGroups?: Maybe<Array<Maybe<Group>>>;
	allTodos?: Maybe<Array<Maybe<TodoMvc>>>;
	allUsers?: Maybe<Array<Maybe<User>>>;
	getGroup?: Maybe<Group>;
	getGroupsByUser?: Maybe<Array<Maybe<Group>>>;
	getUser?: Maybe<User>;
};

export type QueryTodoArgs = {
	todoId: Scalars['ID'];
};

export type QueryGetGroupArgs = {
	groupId: Scalars['ID'];
};

export type QueryGetGroupsByUserArgs = {
	userId: Scalars['ID'];
};

export type QueryGetUserArgs = {
	userId: Scalars['ID'];
};

export type Group = {
	groupId: Scalars['ID'];
	members: Array<GroupMember>;
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

export type UpdateTodoInput = {
	description?: Maybe<Scalars['String']>;
	completed?: Maybe<Scalars['Boolean']>;
};

export type TodoMvc = {
	todoId: Scalars['ID'];
	completed: Scalars['Boolean'];
	description: Scalars['String'];
};

export type CreateUserInput = {
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	password: Scalars['String'];
};

export type User = {
	userId: Scalars['ID'];
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	password: Scalars['String'];
	groups?: Maybe<Array<Maybe<Group>>>;
};

export type AdditionalEntityFields = {
	path?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
};

import { ObjectID } from 'mongodb';
export type GroupDbObject = {
	_id: ObjectID;
	members: Array<GroupMember>;
};

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
	password: string;
	groups?: Maybe<Array<Maybe<Group>>>;
};
