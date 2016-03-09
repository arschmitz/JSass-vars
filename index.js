require( "babel/polyfill" );
var path = require( "path" );
var toSass = require( "json-sass/lib/jsToSassString" );
var fs = require( "fs" );
var glob = require( "glob" );
var _ = require( "lodash" );

function getFiles( files ) {
	if ( typeof files !== "object" ) {
		return glob.sync( files );
	}
	var combined = [];

	for ( var i = 0; i < files.length; i++ ) {
		combined = _.union( combined, glob.sync( files[ i ] ) );
	}

	return combined;
}

module.exports = function( src, options ) {
	var files = getFiles( src );
	var variables;
	var output = "";
	var defaults = {
		dest: false,
		js: options.dest ? options.dest.replace( ".scss", ".js" ) : undefined,
		global: "sassvars",
		namespace: "",
		module: false,
		headers: true,
		template: __dirname + "/lib/template.js"
	};
	console.log( options.headers )
	options = _.merge( {}, defaults, options );
	for ( var i = 0; i < files.length; i++ ) {
		variables = require( files[ i ] );
	}
	console.log( typeof options.headers );
	for ( var module in variables ) {
		if ( options.headers === "true" || options.headers === true ) {
			output += "\n// ======================================================================\n" +
				"// " + module + " variables\n" +
				"// ======================================================================\n\n";
		}

		for ( var variable in variables[ module ] ) {
			output += "$" + ( options.namespace || "" ) +
				( options.module ? module + "-" : "" ) + variable +
				": " + toSass( variables[ module ][ variable ].value ) + ";\n";
		}
	}

	if ( options.dest ) {
		fs.writeFileSync( options.dest, output );
	}
	if ( options.js ) {
		var template = fs.readFileSync( options.template, "utf-8" );

		template = template.replace( "/*>>varibleObject>>*/", JSON.stringify( variables, undefined, 4 ) )
			.replace( "/*>>globalName>>*/", options.global );
		fs.writeFileSync( options.js, template );
	}
	return variables;
}
