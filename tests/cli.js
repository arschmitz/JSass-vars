var fs = require( "fs" );
var rimraf = require( "rimraf" );
var execSync = require( "child_process" ).execSync;
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
	}
};
tests.forEach( function( test ) {
	compareFiles( testExport, test );
} );
function compareFiles( module, opt ) {
	module[ opt.test ] = function( test ) {
		test.expect( 2 );

		var cmd = "./bin/jsass  " + ( typeof opt.src === "string" ? opt.src : opt.src.join( "," ) ) + " --dest=" + "./tests/temp/test.scss";
		var control = fs.readFileSync( __dirname + opt.dest, "utf8" );
		var jsstring = fs.readFileSync( __dirname + opt.js, "utf8" );

		if ( opt.option ) {
			cmd = cmd + " --" + opt.option.name + "=" + opt.option.value;
		}
		execSync( cmd );
		var scss = fs.readFileSync( "./tests/temp/test.scss", "utf8" );
		var js = fs.readFileSync( "./tests/temp/test.js", "utf8" );
		test.equal( control, scss, opt.test + " scss file correct" );
		test.equal( jsstring, js, opt.test + "js file correct" );
		test.done();
	};
}
testExport.js = function( test ) {
	execSync( "./bin/jsass ./tests/src/* --dest=./tests/temp/test.scss --js=./tests/temp/js-test.scss" );
	test.expect( 1 );
	test.ok( fs.existsSync( "./tests/temp/js-test.scss" ), "js option changes js file name" );
	test.done();
};
module.exports.basic = testExport;
