const path = require('path');

module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	filenameHashing: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	lintOnSave: false,
	devServer: {
		port: 8080
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.join(__dirname, './src')
			}
		}
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].template = 'src/index.html';
			args[0].favicon = 'src/assets/img/favicon.ico';
			return args;
		});
	}
};
