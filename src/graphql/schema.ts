import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import resolvers from './resolvers';

const loadedFiles = loadFilesSync(
	join(process.cwd(), './src/graphql/schema/**/*.graphql')
);
const typeDefs = mergeTypeDefs(loadedFiles);

export const schema = makeExecutableSchema({
	typeDefs: [DIRECTIVES, typeDefs],
	resolvers
});
