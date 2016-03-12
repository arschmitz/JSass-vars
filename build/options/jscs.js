module.exports = {
	all: {
		options: {
			fix: true,
			config: ".jscsrc",
			maxErrors: 100000000
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
