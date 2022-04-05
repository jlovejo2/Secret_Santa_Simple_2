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
	deleteGroup?: Maybe<Scalars['Boolean']>;
	loginUser?: Maybe<LoggedInUser>;
	sendPicksNodeMailer?: Maybe<SendPicksResponse>;
	sendPicksSendGrid?: Maybe<SendPicksResponse>;
	updateGroup?: Maybe<Group>;
	updateTodo?: Maybe<TodoMvc>;
};

export type MutationCreateGroupArgs = {
	input: CreateGroupInput;
};

export type MutationCreateTodoArgs = {
	description: Scalars['String'];
};

export type MutationCreateUserArgs = {
	input?: Maybe<CreateUserInput>;
};

export type MutationDeleteGroupArgs = {
	groupId: Scalars['String'];
};

export type MutationLoginUserArgs = {
	input?: Maybe<LoginUserInput>;
};

export type MutationSendPicksNodeMailerArgs = {
	input: SendPicksInput;
};

export type MutationSendPicksSendGridArgs = {
	input: SendPicksInput;
};

export type MutationUpdateGroupArgs = {
	input: UpdateGroupInput;
};

export type MutationUpdateTodoArgs = {
	todoId: Scalars['ID'];
	data: UpdateTodoInput;
};

export type SendPicksInput = {
	groupId: Scalars['String'];
	title: Scalars['String'];
	members: Array<Maybe<GroupMemberInput>>;
};

export type CreateGroupInput = {
	title: Scalars['String'];
	members?: Maybe<Array<Maybe<GroupMemberInput>>>;
};

export type UpdateGroupInput = {
	groupId: Scalars['String'];
	title: Scalars['String'];
	members?: Maybe<Array<Maybe<GroupMemberInput>>>;
};

export type GroupMemberInput = {
	userId?: Maybe<Scalars['String']>;
	first_name?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	secret_pick?: Maybe<Scalars['String']>;
};

export type Query = {
	Todo?: Maybe<TodoMvc>;
	allGroups?: Maybe<Array<Maybe<Group>>>;
	allTodos?: Maybe<Array<Maybe<TodoMvc>>>;
	allUsers?: Maybe<Array<Maybe<User>>>;
	getGroup?: Maybe<Group>;
	getGroupsByUser?: Maybe<User>;
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

export type Group = {
	groupId?: Maybe<Scalars['ID']>;
	title: Scalars['String'];
	members?: Maybe<Array<GroupMember>>;
};

export type GroupMember = User | NonUser;

export type NonUser = {
	first_name?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	is_user?: Maybe<Scalars['Boolean']>;
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

export type LoginUserInput = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type User = {
	userId: Scalars['ID'];
	first_name?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	password?: Maybe<Scalars['String']>;
	groups?: Maybe<Array<Group>>;
	user_secret_picks?: Maybe<Array<SecretPick>>;
};

export type SecretPick = {
	group?: Maybe<Group>;
	group_member_info?: Maybe<GroupMember>;
	secret_pick?: Maybe<Scalars['String']>;
};

export type LoggedInUser = {
	userId?: Maybe<Scalars['String']>;
	token?: Maybe<Scalars['String']>;
};

export type AdditionalEntityFields = {
	path?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
};

import { ObjectID } from 'mongodb';
export type GroupDbObject = {
	_id?: Maybe<ObjectID>;
	title: string;
	members?: Maybe<Array<GroupMember>>;
};

export type TodoMvcDbObject = {
	_id: ObjectID;
	completed: boolean;
	description: string;
};

export type UserDbObject = {
	_id: ObjectID;
	first_name?: Maybe<string>;
	last_name?: Maybe<string>;
	email?: Maybe<string>;
	password?: Maybe<string>;
	groups?: Maybe<Array<Group>>;
	user_secret_picks?: Maybe<Array<SecretPick>>;
};

export type SecretPickDbObject = {
	group?: Maybe<Group>;
	group_member_info?: Maybe<GroupMember>;
	secret_pick?: Maybe<string>;
};
