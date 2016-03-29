[![Build Status](https://travis-ci.org/arschmitz/JSass-vars.png)](https://travis-ci.org/arschmitz/jsass-vars) [![NPM version](https://badge.fury.io/js/jsass-vars.png)](https://www.npmjs.com/package/jsass-vars)


# JSass Vars

JSass Vars allows you to defined your scss or sass varibles as a javascript object created from one
or more JavaScript modules. JSass Vars will create a valid sass/scss variables file from the object
create by the src modules. It also creates a valid JacaScript module with UMD wrapped which will
return an object containing all your variables and values for use in your JS scripts. In the browser
with out AMD it will create a single global object containing the varibels.

Functions have a special meaning in jSass. When constructing the js and scss files jSass checks if the
value is a function. If the value is a function it is executed and the return value is "de-refrenced". This is used to be able to refrence previously defined variables. jSass expects the return value from functions to be a string in the form of "module.property".

Example:
#### a.js
```js
module.exports = {
	foo: {
		value: "bar"
	}
};
```
#### b.js
```js
module.exports = {
	baz: {
		value: () => "a.foo"
	}
};
```
#### output.js
```js
module.exports = {
	a: {
		foo: {
			value: "bar"
		}
	},
	b: {
		baz: {
			value: "bar"
		}
	}
};
```

#### output.scss
```sass
$foo: bar;
$baz: $foo;
```

### Note
The recomended syntax for basic de-refrencing is to use an ES6 arrow function for easy readability
```js
prop: () => "module.prop"
```

## Usage

#### Node Module
```js
var jsass = require( "jsass.js" );

var output = jsass( src [,options] );
```
Returns an object with js, and scss properties containing a JavaScript Object and a sass string respectively
#### Command line
```
jsass src [, option1 ] [, option2 ]
```

## src ( Required )
Type: `String|Array`

Accepts any globing pattern or an array of patterns. Use an array if your files are order dependant.

## Options

#### dest
Type: `String`
Default value: `undefined`
Command Line: `-d, --dest`

If set the `scss` output files will be saved here.

#### js
Type: `String`
Default value: same as dest replacing `.scss` with `.js`
Command Line: `-j, --js`

If set the js output files will be saved here.

### global
Type: `String`
Default value: "sassVars"
Command Line: `-g, --global`

Global namespace in browser enviroments.

#### namespace
Type: `String`
Default value: ``
Command Line: `-n, --namespace`

namespace to prepend to all variable names in scss file

#### module
Type: `Boolean`
Default value: `false`
Command Line: `-m, --module`

To prepend module name to varible names in scss file

#### headers
Type: `Boolean`
Default value: `true`
Command Line: `-h, --headers`

Output module names as heads in scss file

#### template
Type: `Boolean`
Default value: `true`
Command Line: `-t, --template`

Path to custom template file
if true it uses the default template
