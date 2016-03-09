// This is just boiler plate dont worry about it
// This just supports loading in any enviroment
// dont include this file in build its a template for making new variable files
( function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory();
	} else {
		root.chassis = factory();
	}
}( this, function() {

//>> return chasses.moduleName;
} ) );
