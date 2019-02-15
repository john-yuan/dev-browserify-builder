var builder = require('../lib/builder');

builder.build('demo/demo.js', 'dist/demo.min.js', {
    standalone: 'DEMO',
    debug: false,
    detectGlobals: false,
}, {
    compress: {
        drop_console: false
    }
}, function () {
    // console.log('build done');
});
