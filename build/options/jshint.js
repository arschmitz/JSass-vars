module.exports = {
	all: {
		options: {
			jshintrc: true
		},
		src: [
			"index.js",
			"Gruntfile.js",
			"bin/jsass",
			"build/**/*.js",
			"tests/*.js",
			"!tests/test-template.js"
		]
	}
};
