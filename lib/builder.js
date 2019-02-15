var fse = require('fs-extra');
var path = require('path');
var browserify = require('browserify');
var logger = require('@john-yuan/dev-simple-logger');
var uglify = require('uglify-js');

/**
 * Bundle the files and their dependencies. The result code is passed back by the
 * callback function. If error occured, the error message is logged and process will exit.
 *
 * @param {string} entry The entry filename
 * @param {Object} browserifyOptions The browserify options
 * @param {Function} callback The bundle finished callback `(code: string) => void`
 */
var bundle = function (entry, browserifyOptions, callback) {
    var bundler = browserify(entry, browserifyOptions|| {});

    bundler.bundle(function (err, buf) {
        if (err) {
            logger.error(err);
            process.exit();
        } else if (callback) {
            callback(buf.toString());
        }
    });
};

/**
 * Use uglify-js to minify the code. If error occured, the error message is
 * logged and process will exit.
 *
 * @param {string} code The code to minify
 * @param {Object} uglifyOptions The uglify options
 * @returns {string} Returns the minified code
 */
var minify = function (code, uglifyOptions) {
    var result = uglify.minify(code, uglifyOptions);

    if (result.error) {
        logger.error(result.error);
        process.exit();
    } else {
        return result.code;
    }
};

/**
 * Use browserify to bundle the code. Then use uglify-js to minify the code and save the result file.
 *
 * @param {string} entry The entry file path
 * @param {string} output The dist file path
 * @param {Object.<string, *>} browserifyOptions The browserify options
 * @param {Object.<string, *>} uglifyOptions The uglify options
 * @param {(code: string) => void} callback The finish callback
 */
var build = function (entry, output, browserifyOptions, uglifyOptions, callback) {

    output = path.resolve(process.cwd(), output);

    logger.info('Bundle started.');

    bundle(entry, browserifyOptions, function (code) {
        var minifiedCode;

        logger.info('Bundle finished!');
        logger.info('Minify started.');

        minifiedCode = minify(code, uglifyOptions);

        logger.info('Minify finished!');

        fse.outputFileSync(output, minifiedCode);

        logger.info('Build finished! File saved: ' + output);

        callback && callback(minifiedCode);
    });
};

exports.build = build;
