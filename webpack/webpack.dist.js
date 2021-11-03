const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
	console.log('ENV:', env);
	return {
		entry: {
			app: path.resolve(__dirname, '../src/index.ts'),
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, '../dist'),
		},
		mode: 'production',
		resolve: {
			extensions: [ '.ts', '.tsx', '.js' ]
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						format: { comments: false }
					},
					extractComments: false
				})
			],
			splitChunks: { chunks: 'initial' }
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './index.html',
				favicon: './src/favicon.ico'
			}),
			new webpack.DefinePlugin({
				CONFIG: {
					DEVELOPMENT: JSON.stringify(false),
					PRODUCTION: JSON.stringify(true)
				}
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, '../src/css/'),
						to: 'css/'
					},
					{
						from : path.resolve(__dirname, '../src/assets/'),
						to: './',
					}
				]
			})
		]
	};
}
