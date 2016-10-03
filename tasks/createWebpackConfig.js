var path = require('path');
var template = require.resolve(path.resolve(__dirname, './../templates/webpack.config.js'));
var indexHtmlTpl = require.resolve(path.resolve(__dirname, './../templates/index.html'));
var setupPostcss = require('./setupPostcss.js');
var camelize = require('camelize/es5.js');

function createIndexHtml(config) {
	return function() {
		file.write(this.touch(indexHtmlTpl).ejs(config));
		return config;
	}
}

function writeWebpackConfig(config) {
	return function() {
		var file = this.touch('webpack.config.js');

		file.write(this.touch(template).ejs(config));
		return this.run('jsbeautifier', {
			file: file.fullname,
			forceOverride: true
		}).then(function() {
			return createIndexHtml(config);
		});
	}
}

function approveConfig() {
	var defaultConfig = {
		postCss: {
			plugins: ['import','autoprefixer','nested','for']
		},
		packageName: camelize(this.touch('package.json').require().name)
	}
	return this.run(setupPostcss(defaultConfig))
	.then(function(config) {
		return writeWebpackConfig(config);
	});
}

function checkPackage() {
	return this.run('ensurePackage')
	.then(function() {
		return checkExists;
	});
}

function checkExists() {
	var file = this.touch('webpack.config.js');
	if (file.exists()) {
		return this.run('confirm', {
			question: 'Webpack.config.js already exits. Override it?'
		})
		.then(function(result) {
			if (!result) {
				return false;
			} else {
				return approveConfig;
			}
		}.bind(this));
	} else {
		return approveConfig;
	}
}

module.exports = function() {
	return checkPackage;
}
