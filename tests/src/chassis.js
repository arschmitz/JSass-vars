// This is just boiler plate dont worry about it
// This just supports loading in any enviroment
( function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory();
	} else {
		root.chassis = factory();
	}
}( this, function() {

// return an empty object for other files to extend
return {};
} ) );
