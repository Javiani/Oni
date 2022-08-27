const path = require('path')

module.exports = [{

	resolve: {
		extensions: ['.ts', '.js', '.json']
	},

	entry: {
		'index': './src/index.ts',
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			}
		]
	},

	output: {
		path: path.resolve(__dirname, './'),
		filename: '[name].js',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this',
		library: 'Oni'
	}
}, {

	entry: {
		'react': './src/adapters/react.js'
	},

	externals: {
		react: 'react',
		React: 'react',
		onijs: 'onijs'
	},

	resolve: {
		extensions: ['*', '.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			}
		]
	},

	output: {
		path: path.resolve(__dirname, './react'),
		filename: 'index.js',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this'
	}
}]
