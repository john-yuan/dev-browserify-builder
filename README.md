# Browserify Builder

A dev-tool to bundle the javascript file and its dependencies with browserify and minify the result code with uglify-js.

## Install

```bash
npm i @john-yuan/dev-browserify-builder
```

## Usage

```js
var builder = require('@john-yuan/dev-browserify-builder');

builder.build('src/main.js', 'dist/main.min.js', {
    // The browserify options
    debug: false,
    detectGlobals: false
}, {
    // The uglify-js options
    compress: {
        drop_console: true
    }
}, function (code) {
    // Build finish callback
});
```

## API

```js
/**
 * Bundle the entry javascript file and its dependencies and minify the result.
 *
 * @param {string} entry The entry javascript file path
 * @param {string} output The path to save the result file
 * @param {Object} browserifyOptions The options passed to browserify
 * @param {Object} uglifyOptions The options passed to uglify-js
 * @param {(code: string) => void} callback The build finish callback, `code` is the final result
 */
builder.build(entry, output, browserifyOptions, uglifyOptions, callback);
```
