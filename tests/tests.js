var fs = require( "fs" );
var jsass = require( "../index.js" );
var rimraf = require( "rimraf" );
var tests = [
	{
		src: "/control/default.scss",
		js: "/control/default.js",
		test: "Default"
	},
	{
		src: "/control/headers.scss",
		js: "/control/headers.js",
		test: "Headers"
	},
	{
		src: "/control/module.scss",
		js: "/control/module.js",
		test: "Module"
	},
	{
		src: "/control/namespace.scss",
		js: "/control/namespace.js",
		test: "Namespace"
	},
	{
		src: "/control/global.scss",
		js: "/control/global.js",
		test: "Global"
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
	compareFiles( test );
} );

function compareFiles( opt ) {
	testExport[ opt.test ] = function( test ) {
		test.expect( 4 );

		var jscontrol = require( __dirname + opt.js );
		var control = fs.readFileSync( __dirname + opt.src, "utf8" );
		var jsstring = fs.readFileSync( __dirname + opt.js, "utf8" );
		var output = jsass( "./tests/src/*", {
			dest: "./tests/temp/test.scss"
		} );
		var scss = fs.readFileSync( "./tests/temp/test.scss", "utf8" );
		var js = fs.readFileSync( "./tests/temp/test.js", "utf8" );
		test.ok( control, scss, opt.test + " scss file correct" );
		test.ok( jsstring, js, opt.test + "js file correct" );
		test.ok( control, output.scss, opt.test + " scss return correct" );
		test.ok( jscontrol, output.js, opt.test + "js return correct" );
		test.done();
	};
}
module.exports.basic = testExport;
