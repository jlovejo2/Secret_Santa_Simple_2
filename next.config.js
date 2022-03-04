var path = require('path');

module.exports = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.graphql?$/,
			loader: 'webpack-graphql-loader'
		});

		// config.resolve.extensions.push('.ts')
		config.resolve.alias['@components'] = path.join(__dirname, './components');
		config.resolve.alias['@hooks'] = path.join(__dirname, './hooks');
		config.resolve.alias['@src'] = path.join(__dirname, './src');
		config.resolve.alias['@graphql'] = path.join(__dirname, './src/graphql');
		config.resolve.alias['@dao'] = path.join(__dirname, './src/dao');
		config.resolve.alias['@auth'] = path.join(__dirname, './src/auth');

		return config;
	}
};
