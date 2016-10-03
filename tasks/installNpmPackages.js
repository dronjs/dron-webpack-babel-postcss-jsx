function installNpmPackages(config) {
	return function() {
		var dependencies = [
			'webpack',
			'webpack-dev-server',
			'style-loader',
			'css-loader',
			'postcss-loader',
			'postcss-nested',
			'postcss-for',
			'autoprefixer',
			'babel-loader',
			'babel-preset-es2015',
			'babel-plugin-add-module-exports',
			'babel-plugin-transform-react-jsx'
		].concat(config.postCss.plugins.map(function(name) {
			return name=='autoprefixer' ? name : 'postcss-'+name;
		}));
		if (config.progressBar) dependencies.push('progress-bar-webpack-plugin');
		console.log('Install dependencies:', dependencies.join(' '));
		return this.run('installNpmPackages', {
			devDependencies: dependencies,
			save: true
		});
	}

}

module.exports = installNpmPackages;
