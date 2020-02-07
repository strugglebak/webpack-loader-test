const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolveLoader: {
		modules: ['node_modules', path.resolve(__dirname, 'loaders')]
	},
	watch: true,
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(png|jpg)$/,
				use: {
					// loader: 'file-loader'
					loader: 'url-loader',
					options: {
						limit: 200*1024 // 表示 200k byte
					}
				}
			},
			// {
			// 	test: /\.js$/,
			// 	use: {
			// 		loader: 'banner-loader',
			// 		options: {
			// 			text: '这里是注释',
			// 			filename: path.resolve(__dirname, 'banner.js')
      //   	}
			// 	}
			// }
			// {
			// 	test: /\.js$/,
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: {
      //     	presets: ['@babel/preset-env'] // 使用 @babel/preset-env 来转化
      //   	}
			// 	}
			// },
			// {
			// 	test: /\.js$/,
			// 	use: { loader: 'demo-loader' },
			// 	enforce: 'pre',
			// },
			// {
			// 	test: /\.js$/,
			// 	use: { loader: 'demo-loader2' },
			// },
			// {
			// 	test: /\.js$/,
			// 	use: { loader: 'demo-loader3' },
			// 	enforce: 'post',
			// },
		]
	}
}

