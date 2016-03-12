var fs = require( "fs" );
var jsass = require( "../index.js" );
var rimraf = require( "rimraf" );
var resolve = require( "resolve" );
var tests = [
	{
		src: "./tests/src/*",
		dest: "/control/default.scss",
		js: "/control/default.js",
		test: "Default"
	},
	{
		src: "./tests/src/*",
		dest: "/control/headers.scss",
		js: "/control/headers.js",
		test: "Headers",
		option: {
			name: "headers",
			value: false
		}
	},
	{
		src: "./tests/src/*",
		dest: "/control/module.scss",
		js: "/control/module.js",
		test: "Module",
		option: {
			name: "module",
			value: true
		}
	},
	{
		src: "./tests/src/*",
		dest: "/control/namespace.scss",
		js: "/control/namespace.js",
		test: "Namespace",
		option: {
			name: "namespace",
			value: "test-"
		}
	},
	{
		src: "./tests/src/*",
		dest: "/control/global.scss",
		js: "/control/global.js",
		test: "Global",
		option: {
			name: "global",
			value: "warming"
		}
	},
	{
		src: "./tests/src/*",
		dest: "/control/template.scss",
		js: "/control/template.js",
		test: "Template",
		option: {
			name: "template",
			value: "./tests/test-template.js"
		}
	},
	{
		src: [
			"./tests/src/typography.js",
			"./tests/src/colors.js"
		],
		dest: "/control/fileArray.scss",
		js: "/control/fileArray.js",
		test: "fileArray"
	},
	{
		src: "./tests/src/z_buttons.js",
		dest: "/control/dependency.scss",
		js: "/control/dependency.js",
		test: "dependencies"
	}
];
var testExport = {
	setUp: function( callback ) {
		fs.mkdir( process.cwd() + "/tests/temp/", function( err ) {
			if ( !err ) {
				callback();
				return;
			}
			rimraf( process.cwd() + "/tests/temp/", function() {
				fs.mkdir( process.cwd() + "/tests/temp/", function( error ) {
					if ( !error ) {
						callback();
						return;
					}
					throw error;
				} );
			} );
		} );
	},
	tearDown: function( callback ) {
		rimraf( process.cwd() + "/tests/temp/", callback );
		var path = resolve.sync( process.cwd() + "/tests/src/chassis.js" );
		if ( require.cache[ path ] ) {
			delete require.cache[ path ];
		}
	}
};
tests.forEach( function( test ) {
	compareFiles( testExport, test );
} );
function compareFiles( module, opt ) {
	module[ opt.test ] = function( test ) {
		test.expect( 4 );

		var jscontrol = require( __dirname + opt.js );
		var control = fs.readFileSync( __dirname + opt.dest, "utf8" );
		var jsstring = fs.readFileSync( __dirname + opt.js, "utf8" );
		var options = {
			dest: "./tests/temp/test.scss"
		};
		if ( opt.option ) {
			options[ opt.option.name ] = opt.option.value;
		}
		var output = jsass( opt.src, options );
		var scss = fs.readFileSync( "./tests/temp/test.scss", "utf8" );
		var js = fs.readFileSync( "./tests/temp/test.js", "utf8" );
		test.equal( control, scss, opt.test + " scss file correct" );
		test.equal( jsstring, js, opt.test + "js file correct" );
		test.equal( control, output.scss, opt.test + " scss return correct" );
		test.deepEqual( jscontrol, output.js, opt.test + "js return correct" );
		test.done();
	};
}
testExport.js = function( test ) {
	jsass( "./tests/src/*", {
		dest: "./tests/temp/test.scss",
		js: "./tests/temp/js-test.scss"
	} );
	test.expect( 1 );
	test.ok( fs.existsSync( "./tests/temp/js-test.scss" ), "js option changes js file name" );
	test.done();
};
module.exports.basic = testExport;
