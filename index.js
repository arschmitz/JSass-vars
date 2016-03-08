require( "babel/polyfill" );
var path = require( "path" );
var toSass = require( "./node_modules/json-sass/lib/jsToSassString.js" );
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
		jsDest: options.dest ? options.dest.replace( ".scss", ".js" ) : undefined,
		global: "sassvars",
		namespace: "",
		prependModule: false,
		headers: true,
		template: __dirname + "/lib/template.js"
	};

	options = _.merge( {}, defaults, options );

	for ( var i = 0; i < files.length; i++ ) {
		variables = require( files[ i ] );
	}

	for ( var module in variables ) {
		if ( options.headers !== false ) {
			output += "\n// ======================================================================\n" +
				"// " + module + " variables\n" +
				"// ======================================================================\n\n";
		}

		for ( var variable in variables[ module ] ) {
			output += "$" + ( options.nameSpace || "" ) +
				( options.prependModule ? module + "-" : "" ) + variable +
				": " + toSass( variables[ module ][ variable ].value ) + ";\n";
		}
	}

	if ( options.dest ) {
		fs.writeFileSync( options.dest, output );
	}
	if ( options.jsDest ) {
		var template = fs.readFileSync( options.template, "utf-8" );

		template = template.replace( "/*>>varibleObject>>*/", JSON.stringify( variables, undefined, 4 ) )
			.replace( "/*>>globalName>>*/", options.global );
		fs.writeFileSync( options.jsDest, template );
	}

	return variables;
}
