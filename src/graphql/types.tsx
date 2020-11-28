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
	sendPicks?: Maybe<Scalars['String']>;
};

export type MutationCreateTodoArgs = {
	description: Scalars['String'];
};

export type MutationUpdateTodoArgs = {
	todoId: Scalars['ID'];
	data: UpdateTodoInput;
};

export type MutationSendPicksArgs = {
	input: Array<GroupMember>;
};

export type UpdateTodoInput = {
	description?: Maybe<Scalars['String']>;
	completed?: Maybe<Scalars['Boolean']>;
};

export type GroupMember = {
	first_name: Scalars['String'];
	last_name: Scalars['String'];
	email: Scalars['String'];
	secret_pick?: Maybe<Array<Maybe<GroupMember>>>;
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
	Query: ResolverTypeWrapper<{}>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	Mutation: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	UpdateTodoInput: UpdateTodoInput;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	GroupMember: GroupMember;
	TodoMVC: ResolverTypeWrapper<TodoMvc>;
	User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Query: {};
	ID: Scalars['ID'];
	Mutation: {};
	String: Scalars['String'];
	UpdateTodoInput: UpdateTodoInput;
	Boolean: Scalars['Boolean'];
	GroupMember: GroupMember;
	TodoMVC: TodoMvc;
	User: User;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	allTodos?: Resolver<Array<ResolversTypes['TodoMVC']>, ParentType, ContextType>;
	Todo?: Resolver<
		Maybe<ResolversTypes['TodoMVC']>,
		ParentType,
		ContextType,
		RequireFields<QueryTodoArgs, 'todoId'>
	>;
	allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	createTodo?: Resolver<
		ResolversTypes['TodoMVC'],
		ParentType,
		ContextType,
		RequireFields<MutationCreateTodoArgs, 'description'>
	>;
	updateTodo?: Resolver<
		Maybe<ResolversTypes['TodoMVC']>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateTodoArgs, 'todoId' | 'data'>
	>;
	sendPicks?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType,
		RequireFields<MutationSendPicksArgs, 'input'>
	>;
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
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Query?: QueryResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	TodoMVC?: TodoMvcResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

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

export type IndexQueryVariables = Exact<{ [key: string]: never }>;

export type IndexQuery = { allTodos: Array<Pick<TodoMvc, 'todoId'>> };

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
