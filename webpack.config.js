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
		library: 'pandora'
	}
}, {

	entry: {
		'react': './src/adapters/react.js'
	},

	externals: {
		react: 'react',
		React: 'react'
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
		path: path.resolve(__dirname, './'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		umdNamedDefine: true,
		globalObject: 'this',
		publicPath: '/'
	}
}]
