import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
	[X in Exclude<keyof T, K>]?: T[X];
} &
	{ [P in K]-?: NonNullable<T[P]> };
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
	loginUser?: Maybe<LoggedInUser>;
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

export type MutationLoginUserArgs = {
	input?: Maybe<LoginUserInput>;
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

export type LoginUserInput = {
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

export type LoggedInUser = {
	userId?: Maybe<Scalars['String']>;
	token?: Maybe<Scalars['String']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
	selectionSet: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
	| LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
	| NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Mutation: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	SendPicksInput: SendPicksInput;
	CreateGroupInput: CreateGroupInput;
	Query: ResolverTypeWrapper<{}>;
	Group: ResolverTypeWrapper<Group>;
	GroupMember: ResolverTypeWrapper<GroupMember>;
	SendPicksResponse: ResolverTypeWrapper<SendPicksResponse>;
	UpdateTodoInput: UpdateTodoInput;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	TodoMVC: ResolverTypeWrapper<TodoMvc>;
	CreateUserInput: CreateUserInput;
	loginUserInput: LoginUserInput;
	User: ResolverTypeWrapper<User>;
	loggedInUser: ResolverTypeWrapper<LoggedInUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Mutation: {};
	String: Scalars['String'];
	ID: Scalars['ID'];
	SendPicksInput: SendPicksInput;
	CreateGroupInput: CreateGroupInput;
	Query: {};
	Group: Group;
	GroupMember: GroupMember;
	SendPicksResponse: SendPicksResponse;
	UpdateTodoInput: UpdateTodoInput;
	Boolean: Scalars['Boolean'];
	TodoMVC: TodoMvc;
	CreateUserInput: CreateUserInput;
	loginUserInput: LoginUserInput;
	User: User;
	loggedInUser: LoggedInUser;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	createGroup?: Resolver<
		Maybe<ResolversTypes['Group']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateGroupArgs, 'input'>
	>;
	createTodo?: Resolver<
		ResolversTypes['TodoMVC'],
		ParentType,
		ContextType,
		RequireFields<MutationCreateTodoArgs, 'description'>
	>;
	createUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateUserArgs, never>
	>;
	loginUser?: Resolver<
		Maybe<ResolversTypes['loggedInUser']>,
		ParentType,
		ContextType,
		RequireFields<MutationLoginUserArgs, never>
	>;
	sendPicks?: Resolver<
		Maybe<ResolversTypes['SendPicksResponse']>,
		ParentType,
		ContextType,
		RequireFields<MutationSendPicksArgs, 'input'>
	>;
	updateGroup?: Resolver<
		Maybe<ResolversTypes['Group']>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateGroupArgs, 'input'>
	>;
	updateTodo?: Resolver<
		Maybe<ResolversTypes['TodoMVC']>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateTodoArgs, 'todoId' | 'data'>
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	Todo?: Resolver<
		Maybe<ResolversTypes['TodoMVC']>,
		ParentType,
		ContextType,
		RequireFields<QueryTodoArgs, 'todoId'>
	>;
	allGroups?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['Group']>>>,
		ParentType,
		ContextType
	>;
	allTodos?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['TodoMVC']>>>,
		ParentType,
		ContextType
	>;
	allUsers?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['User']>>>,
		ParentType,
		ContextType
	>;
	getGroup?: Resolver<
		Maybe<ResolversTypes['Group']>,
		ParentType,
		ContextType,
		RequireFields<QueryGetGroupArgs, 'groupId'>
	>;
	getGroupsByUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		RequireFields<QueryGetGroupsByUserArgs, 'userId'>
	>;
	getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type GroupResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']
> = {
	groupId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
	members?: Resolver<
		Array<ResolversTypes['GroupMember']>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupMemberResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['GroupMember'] = ResolversParentTypes['GroupMember']
> = {
	first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	secret_pick?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendPicksResponseResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['SendPicksResponse'] = ResolversParentTypes['SendPicksResponse']
> = {
	message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoMvcResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TodoMVC'] = ResolversParentTypes['TodoMVC']
> = {
	todoId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
	userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	groups?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['Group']>>>,
		ParentType,
		ContextType
	>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoggedInUserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['loggedInUser'] = ResolversParentTypes['loggedInUser']
> = {
	userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Group?: GroupResolvers<ContextType>;
	GroupMember?: GroupMemberResolvers<ContextType>;
	SendPicksResponse?: SendPicksResponseResolvers<ContextType>;
	TodoMVC?: TodoMvcResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
	loggedInUser?: LoggedInUserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export type CreateGroupMutationVariables = Exact<{
	input: Array<CreateGroupInput>;
}>;

export type CreateGroupMutation = {
	createGroup?: Maybe<
		Pick<Group, 'groupId'> & {
			members: Array<Pick<GroupMember, 'first_name' | 'last_name' | 'email'>>;
		}
	>;
};

export type SendPicksMutationVariables = Exact<{
	input: SendPicksInput;
}>;

export type SendPicksMutation = {
	sendPicks?: Maybe<Pick<SendPicksResponse, 'message'>>;
};

export type GetGroupsByUserQueryVariables = Exact<{
	userId: Scalars['ID'];
}>;

export type GetGroupsByUserQuery = {
	getGroupsByUser?: Maybe<
		Pick<User, 'first_name' | 'last_name' | 'email'> & {
			groups?: Maybe<Array<Maybe<Pick<Group, 'groupId'>>>>;
		}
	>;
};

export type LoginUserMutationVariables = Exact<{
	input: LoginUserInput;
}>;

export type LoginUserMutation = {
	loginUser?: Maybe<Pick<LoggedInUser, 'token' | 'userId'>>;
};

export type CreateUserMutationVariables = Exact<{
	input: CreateUserInput;
}>;

export type CreateUserMutation = {
	createUser?: Maybe<Pick<User, 'userId' | 'first_name'>>;
};

export type TodoQueryVariables = Exact<{
	todoId: Scalars['ID'];
}>;

export type TodoQuery = {
	Todo?: Maybe<Pick<TodoMvc, 'description' | 'completed'>>;
};

export type UpdateTodoMutationVariables = Exact<{
	todoId: Scalars['ID'];
	data: UpdateTodoInput;
}>;

export type UpdateTodoMutation = {
	updateTodo?: Maybe<Pick<TodoMvc, 'description' | 'completed'>>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
	getUser?: Maybe<
		Pick<User, 'first_name' | 'last_name' | 'email'> & {
			groups?: Maybe<Array<Maybe<Pick<Group, 'groupId'>>>>;
		}
	>;
};

export type IndexQueryVariables = Exact<{ [key: string]: never }>;

export type IndexQuery = {
	allTodos?: Maybe<Array<Maybe<Pick<TodoMvc, 'todoId'>>>>;
};

export type CreateTodoMutationVariables = Exact<{
	description: Scalars['String'];
}>;

export type CreateTodoMutation = {
	createTodo: Pick<TodoMvc, 'todoId' | 'description' | 'completed'>;
};

export const CreateGroupDocument = gql`
	mutation createGroup($input: [CreateGroupInput!]!) {
		createGroup(input: $input) {
			groupId
			members {
				first_name
				last_name
				email
			}
		}
	}
`;
export type CreateGroupMutationFn = ApolloReactCommon.MutationFunction<
	CreateGroupMutation,
	CreateGroupMutationVariables
>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		CreateGroupMutation,
		CreateGroupMutationVariables
	>
) {
	return ApolloReactHooks.useMutation<
		CreateGroupMutation,
		CreateGroupMutationVariables
	>(CreateGroupDocument, baseOptions);
}
export type CreateGroupMutationHookResult = ReturnType<
	typeof useCreateGroupMutation
>;
export type CreateGroupMutationResult = ApolloReactCommon.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<
	CreateGroupMutation,
	CreateGroupMutationVariables
>;
export const SendPicksDocument = gql`
	mutation sendPicks($input: SendPicksInput!) {
		sendPicks(input: $input) {
			message
		}
	}
`;
export type SendPicksMutationFn = ApolloReactCommon.MutationFunction<
	SendPicksMutation,
	SendPicksMutationVariables
>;

/**
 * __useSendPicksMutation__
 *
 * To run a mutation, you first call `useSendPicksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPicksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPicksMutation, { data, loading, error }] = useSendPicksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPicksMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		SendPicksMutation,
		SendPicksMutationVariables
	>
) {
	return ApolloReactHooks.useMutation<
		SendPicksMutation,
		SendPicksMutationVariables
	>(SendPicksDocument, baseOptions);
}
export type SendPicksMutationHookResult = ReturnType<
	typeof useSendPicksMutation
>;
export type SendPicksMutationResult = ApolloReactCommon.MutationResult<SendPicksMutation>;
export type SendPicksMutationOptions = ApolloReactCommon.BaseMutationOptions<
	SendPicksMutation,
	SendPicksMutationVariables
>;
export const GetGroupsByUserDocument = gql`
	query getGroupsByUser($userId: ID!) {
		getGroupsByUser(userId: $userId) {
			first_name
			last_name
			email
			groups {
				groupId
			}
		}
	}
`;

/**
 * __useGetGroupsByUserQuery__
 *
 * To run a query within a React component, call `useGetGroupsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetGroupsByUserQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<
		GetGroupsByUserQuery,
		GetGroupsByUserQueryVariables
	>
) {
	return ApolloReactHooks.useQuery<
		GetGroupsByUserQuery,
		GetGroupsByUserQueryVariables
	>(GetGroupsByUserDocument, baseOptions);
}
export function useGetGroupsByUserLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		GetGroupsByUserQuery,
		GetGroupsByUserQueryVariables
	>
) {
	return ApolloReactHooks.useLazyQuery<
		GetGroupsByUserQuery,
		GetGroupsByUserQueryVariables
	>(GetGroupsByUserDocument, baseOptions);
}
export type GetGroupsByUserQueryHookResult = ReturnType<
	typeof useGetGroupsByUserQuery
>;
export type GetGroupsByUserLazyQueryHookResult = ReturnType<
	typeof useGetGroupsByUserLazyQuery
>;
export type GetGroupsByUserQueryResult = ApolloReactCommon.QueryResult<
	GetGroupsByUserQuery,
	GetGroupsByUserQueryVariables
>;
export const LoginUserDocument = gql`
	mutation loginUser($input: loginUserInput!) {
		loginUser(input: $input) {
			token
			userId
		}
	}
`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<
	LoginUserMutation,
	LoginUserMutationVariables
>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		LoginUserMutation,
		LoginUserMutationVariables
	>
) {
	return ApolloReactHooks.useMutation<
		LoginUserMutation,
		LoginUserMutationVariables
	>(LoginUserDocument, baseOptions);
}
export type LoginUserMutationHookResult = ReturnType<
	typeof useLoginUserMutation
>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
	LoginUserMutation,
	LoginUserMutationVariables
>;
export const CreateUserDocument = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
			userId
			first_name
		}
	}
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
	CreateUserMutation,
	CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		CreateUserMutation,
		CreateUserMutationVariables
	>
) {
	return ApolloReactHooks.useMutation<
		CreateUserMutation,
		CreateUserMutationVariables
	>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<
	typeof useCreateUserMutation
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
	CreateUserMutation,
	CreateUserMutationVariables
>;
export const TodoDocument = gql`
	query Todo($todoId: ID!) {
		Todo(todoId: $todoId) {
			description
			completed
		}
	}
`;

/**
 * __useTodoQuery__
 *
 * To run a query within a React component, call `useTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoQuery({
 *   variables: {
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useTodoQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<TodoQuery, TodoQueryVariables>
) {
	return ApolloReactHooks.useQuery<TodoQuery, TodoQueryVariables>(
		TodoDocument,
		baseOptions
	);
}
export function useTodoLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		TodoQuery,
		TodoQueryVariables
	>
) {
	return ApolloReactHooks.useLazyQuery<TodoQuery, TodoQueryVariables>(
		TodoDocument,
		baseOptions
	);
}
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>;
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>;
export type TodoQueryResult = ApolloReactCommon.QueryResult<
	TodoQuery,
	TodoQueryVariables
>;
export const UpdateTodoDocument = gql`
	mutation UpdateTodo($todoId: ID!, $data: UpdateTodoInput!) {
		updateTodo(todoId: $todoId, data: $data) {
			description
			completed
		}
	}
`;
export type UpdateTodoMutationFn = ApolloReactCommon.MutationFunction<
	UpdateTodoMutation,
	UpdateTodoMutationVariables
>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTodoMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		UpdateTodoMutation,
		UpdateTodoMutationVariables
	>
) {
	return ApolloReactHooks.useMutation<
		UpdateTodoMutation,
		UpdateTodoMutationVariables
	>(UpdateTodoDocument, baseOptions);
}
export type UpdateTodoMutationHookResult = ReturnType<
	typeof useUpdateTodoMutation
>;
export type UpdateTodoMutationResult = ApolloReactCommon.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
	UpdateTodoMutation,
	UpdateTodoMutationVariables
>;
export const GetUserDocument = gql`
	query getUser {
		getUser {
			first_name
			last_name
			email
			groups {
				groupId
			}
		}
	}
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		GetUserQuery,
		GetUserQueryVariables
	>
) {
	return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(
		GetUserDocument,
		baseOptions
	);
}
export function useGetUserLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		GetUserQuery,
		GetUserQueryVariables
	>
) {
	return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
		GetUserDocument,
		baseOptions
	);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
	GetUserQuery,
	GetUserQueryVariables
>;
export const IndexDocument = gql`
	query Index {
		allTodos {
			todoId
		}
	}
`;

/**
 * __useIndexQuery__
 *
 * To run a query within a React component, call `useIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		IndexQuery,
		IndexQueryVariables
	>
) {
	return ApolloReactHooks.useQuery<IndexQuery, IndexQueryVariables>(
		IndexDocument,
		baseOptions
	);
}
export function useIndexLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		IndexQuery,
		IndexQueryVariables
	>
) {
	return ApolloReactHooks.useLazyQuery<IndexQuery, IndexQueryVariables>(
		IndexDocument,
		baseOptions
	);
}
export type IndexQueryHookResult = ReturnType<typeof useIndexQuery>;
export type IndexLazyQueryHookResult = ReturnType<typeof useIndexLazyQuery>;
export type IndexQueryResult = ApolloReactCommon.QueryResult<
	IndexQuery,
	IndexQueryVariables
>;
export const CreateTodoDocument = gql`
	mutation CreateTodo($description: String!) {
		createTodo(description: $description) {
			todoId
			description
			completed
		}
	}
`;
export type CreateTodoMutationFn = ApolloReactCommon.MutationFunction<
	CreateTodoMutation,
	CreateTodoMutationVariables
>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTodoMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		CreateTodoMutation,
		CreateTodoMutationVariables
	>
) {
	return ApolloReactHooks.useMutation<
		CreateTodoMutation,
		CreateTodoMutationVariables
	>(CreateTodoDocument, baseOptions);
}
export type CreateTodoMutationHookResult = ReturnType<
	typeof useCreateTodoMutation
>;
export type CreateTodoMutationResult = ApolloReactCommon.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
	CreateTodoMutation,
	CreateTodoMutationVariables
>;
