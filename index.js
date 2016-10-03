
// var core = require(require.resolve('/Users/VladimirMorulus/WorkAreas/mahabra/morulus/dron'));
var fs = require('fs');
var path = require('path');
var createWebpackConfig = require('./tasks/createWebpackConfig.js');
var installNpmPackages = require('./tasks/installNpmPackages.js');
var patchPackage = require('./tasks/patchPackage.js');

function perform() {
	return this.run(createWebpackConfig)
	.then(patchPackage)
	.then(installNpmPackages);
}

module.exports = function() {
	return perform;
}