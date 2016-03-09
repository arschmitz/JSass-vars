[![Build Status](https://travis-ci.org/arschmitz/jsass-vars.png)](https://travis-ci.org/arschmitz/jsass-vars) [![NPM version](https://badge.fury.io/js/jsass-vars.png)](https://www.npmjs.com/package/jsass-vars)


# JSass Vars

JSass Vars allows you to defined your scss or sass varibles as a javascript object created from one
or more JavaScript modules. JSass Vars will create a valid sass/scss variables file from the object
create by the src modules. It also creates a valid JacaScript module with UMD wrapped which will
return an object containing all your variables and values for use in your JS scripts. In the browser
with out AMD it will create a single global object containing the varibels.

## Usage

#### Node Module
```js
var jsass = require( "jsass.js" );

spider( src [,options] );
```

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
