var toSass = require( "json-sass/lib/jsToSassString" );
var fs = require( "fs" );
var glob = require( "glob" );
var _ = require( "lodash" );
var resolve = require( "resolve" );

function getFiles( files ) {
	if ( typeof files !== "object" ) {
		return glob.sync( process.cwd() + "/" + files );
	}
	var combined = [];

	for ( var i = 0; i < files.length; i++ ) {
		combined = _.union( combined, glob.sync( files[ i ] ) );
	}
	return combined;
}

module.exports = function( src, options ) {
	options = options || {};
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
	function deRef( jsVal ) {
		var retVal = jsVal();
		var parts = retVal.split( "." );
		if ( !options.module ) {
			parts.shift();
		}
		return {
			jsVal: eval( "variables." + retVal ).value,
			scssVal: parts.join( "-" )
		};
	}
	if ( !files.length ) {
		throw new Error( "File " + src + " does not exist. No source files provided" );
	}
	options = _.merge( {}, defaults, options );
	for ( var k = 0; k < files.length; k++ ) {
		variables = require( files[ k ] );
	}
	for ( var module in variables ) {
		if ( options.headers === "true" || options.headers === true ) {
			output += "\n// ======================================================================\n" +
				"// " + module + " variables\n" +
				"// ======================================================================\n\n";
		}

		for ( var variable in variables[ module ] ) {
			var jsVal = variables[ module ][ variable ].value;
			var deRefVal;
			if ( typeof jsVal === "object" ) {
				jsVal = _.merge( {}, jsVal );
				for ( var i in jsVal ) {
					if ( typeof jsVal[ i ] === "function" ) {
						deRefVal = deRef( jsVal[ i ] );
						variables[ module ][ variable ].value[ i ] = deRefVal.jsVal;
						jsVal[ i ] = "$" + deRefVal.scssVal;
					}
				}
			} else if ( typeof jsVal === "function" ) {
				deRefVal = deRef( jsVal );
				variables[ module ][ variable ].value = deRefVal.jsVal;
				jsVal = "$" + deRefVal.scssVal;
			}
			output += "$" + ( options.namespace || "" ) +
				( options.module ? module + "-" : "" ) + variable +
				": " + toSass( jsVal ) + ";\n";
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
	for ( var j = 0; j < files.length; j++ ) {
		var path = resolve.sync( files[ j ] );
		if ( require.cache[ path ] ) {
			delete require.cache[ path ];
		}
	}
	return {
		scss: output,
		js: variables
	};
};
