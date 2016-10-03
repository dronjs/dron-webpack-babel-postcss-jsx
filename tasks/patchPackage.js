module.export = function(config) {
	var json = this.touch('package.json').require();
	json.scripts['dev-server'] = 'NODE_ENV=development webpack-dev-server --watch';
	json.scripts['prod-server'] = 'NODE_ENV=production webpack-dev-server --watch';
	json.scripts['prod'] = 'NODE_ENV=production webpack --progress';
	json.scripts['dev'] = 'NODE_ENV=development webpack --progress --watch';
	this.touch('package.json').write(JSON.stringify(json));
	return config;
}