/**
 * created on 17.04.2018
 * @author John Waweru
 */

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const zlib = require('zlib');
const {randomBytes} = require('crypto');
const {has} = require('lodash');
const Log = require('./logger');
const routes = require('./routes');
const auth = require('./auth');
const bodyParser = require('body-parser');

/**
 * main application class used to bootstrap an express Application
 * @class App
 * @access protected
 */
class App {
    /**
     * creates an instance of App and returns the express application used in the App class
     * @access public
     * @static
     * @return {express.Application}
     * @readonly
     */
    static get _init() {
        const app = new App(express());
        return app._app;
    }
    /**
     * @return {express.Application}
     * @access public
     * @readonly
     * @member {express.Application}
     */
    get _app() {
        return this.app;
    }

    /**
     * creates express app
     * @constructor
     * @private
     * @param {express.Application} app - an instance of express.Application
     */
    constructor(app) {
        this.app=app;

        /* app third party middlewares */
        app.use(compression({
            level: 9,
            memLevel: 9,
            strategy: zlib.Z_HUFFMAN_ONLY,
        }));
        app.use(helmet({
            frameguard: {
                action: 'deny',
            },
            dnsPrefetchControl: false,
            noCache: true,
            noSniff: true,
        }));
        app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0 / MySQL 5.3.4'}));
        Log.http(app);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false,
            limit: '100MB',
        }));
        app.use(auth.installMiddleware(app));
        /* End of Installation of third party API */

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Content-Type, Accept,X-Requested-With, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            return next();
        });
        app.use('/api', routes);
        app.get('/ping', this.ping);
        app.use(this.notFoundError);
        app.use(this.restErrorHandler);
    }

    /**
     * API 404 Error handler
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {*}
     * @access private
     * @member {Function}
     * @instance
     */
    notFoundError(req, res, next) {
        const err = new Error();
        err.message = 'Requested Resource is not found';
        err.name = 'NotFoundError';
        err.status = 404;
        err.level = 'warning';
        return next(err);
    }

    /**
     * API Error handler
     * @param {Error} err
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {*}
     * @access private
     * @member {Function}
     * @instance
     */
    restErrorHandler(err, req, res) {
        console.log(err); /* for debugging purposes */
        return res.status(has(err, 'status') ? err.status : 500)
            .json(err || {message: 'Something Went Wrong!', name: 'InteralServerError', level: 'error', status: 500});
    }

    /**
     * API ping route handler
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {*}
     * @access private
     * @member {Function}
     * @instance
     * @async
     */
    async ping(req, res, next) {
        try {
            const counted = await new Promise(
                (resolve) => {
                    setTimeout(
                        () => resolve({
                            payload: randomBytes(12).toString('base64'),
                            timestamp: new Date().toISOString(),
                        }),
                    750);
                });

            return res.json(counted);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = App._init;
