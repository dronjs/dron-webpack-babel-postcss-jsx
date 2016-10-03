module.exports = function(defaultConfig) {
	return function setupPostcss() {
		return this.run('prompt', {
			questions: [
				{
					type: 'checkbox',
					message: 'Select postCss plugins',
					name: 'plugins',
					choices: defaultConfig.postCss.plugins.map(function(name) {
						return {
							name: name,
							checked: true
						}
					})
				}
			]
		}).then(function(answers) {
			return Object.assign({}, defaultConfig, {
				postCss: answers
			});
		});
	}
}