var path = require('path');

module.exports = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.graphql?$/,
			exclude: /node_modules/,
			use: ['webpack-graphql-loader']
		});

		// config.resolve.extensions.push('.ts')
		config.resolve.alias['@components'] = path.join(
			process.cwd(),
			'./components'
		);
		config.resolve.alias['@hooks'] = path.join(process.cwd(), './hooks');
		config.resolve.alias['@src'] = path.join(process.cwd(), './src');
		config.resolve.alias['@graphql'] = path.join(process.cwd(), './src/graphql');
		config.resolve.alias['@dao'] = path.join(process.cwd(), './src/dao');
		config.resolve.alias['@auth'] = path.join(process.cwd(), './src/auth');

		return config;
	}
};
