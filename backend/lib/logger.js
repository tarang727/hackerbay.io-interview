/**
 * created on 17.04.2018
 */

const logger = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const fs = require('fs');

/**
 * A static class that contains logging functionalities
 * @static
 * @class Logger
 */
class Logger {
    /**
     * adds logging middleware to the global express Application instance of the app
     * @param {express.Application} app
     * @access public
     * @static
     * @return {void}
     */
    static http(app) {
        /**
         * This IIFE is for checking and creating the log directory if it does not exist
         * @param {string} dir The directory which the logs will be put
         * @returns log directory path
         */
        const logDir = ((dir) => {
            fs.existsSync(dir) || fs.mkdirSync(dir);
            return dir;
        })(path.join(__dirname, '../logs'));

        const accessLogStream = rfs('access.log', {interval: '3d', path: logDir}); // ACCESS LOGS STREAM //
        const errorLogStream = rfs('error.log', {interval: '3d', path: logDir}); // ERROR LOGS STREAM //

        // log all Error and Warnings to error.log //
        app.use(logger('combined', {
            skip: (req, res) => (res.statusCode < 400),
            stream: errorLogStream,
        }));

        // log all requests to access.log //
        app.use(logger('combined', {
            stream: accessLogStream,
            immediate: true,
        }));

        app.use(logger('dev')); // log any other response to console //
    }
}

module.exports = Logger;
