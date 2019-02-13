var browserify = require('browserify');
var logger = require('@john-yuan/dev-simple-logger');

var build = function (entry, output, browserifyOptions) {
    var bundler = browserify(entry, browserifyOptions|| {});
    var writeStream = fs.createWriteStream(output);

    logger.info('Bundle start');

    var inputStream = bundler.bundle(function (err) {
        if (err) {
            logger.error(err);
        }
    });

    inputStream.pipe(writeStream);
    inputStream.on('end', function () {
        logger.info('Bundle done');
    });
};

exports.build = build;

