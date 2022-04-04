import { join, resolve } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { loadTypedefsSync } from '@graphql-tools/load';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import {
	GroupMutations,
	GroupQueries
} from '@lib/graphql/schema/group/resolvers';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { UserMutations, UserQueries } from '@lib/graphql/schema/user/resolvers';
import { TodoMutations, TodoQueries } from '@lib/graphql/schema/todo/resolvers';

const loadedTypesFiles = loadTypedefsSync(
	join(__dirname, './graphql/schema/**/*.graphql'),
	{
		loaders: [new GraphQLFileLoader()]
	}
);

console.log('these are the loaded types files', loadedTypesFiles);

const typeDefs = mergeTypeDefs(loadedTypesFiles.map(source => source.document));

const resolvers = mergeResolvers([
	GroupMutations,
	GroupQueries,
	UserMutations,
	UserQueries,
	TodoMutations,
	TodoQueries
]);

export const createSchema = () => {
	return makeExecutableSchema({
		typeDefs: [DIRECTIVES, typeDefs],
		resolvers
	});
};
