/**
 * created on 17.04.2018
 */

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const zlib = require('zlib');
const { randomBytes } = require('crypto');
const { has } = require('lodash');
const Log = require('./logger');
const routes = require('./routes');
const auth = require('./auth');

class App {

    static get _init() {
        const app = new App(express());
        return app._app;
    }
    /**
     * @returns an instance of express.Application used in the whole app
     */
    get _app() {
        return this.app
    }
    /**
     * creates express app
     * @constructor
     * @param {express.Application} app - an instance of express.Application
     */
    constructor(app) {
        this.app=app; 

        app.use(compression({
            level: 9,
            memLevel: 9,
            strategy: zlib.Z_HUFFMAN_ONLY
        }));
        app.use(helmet({
            frameguard: {
                action: 'deny'
            },
            dnsPrefetchControl: false,
            noCache: true,
            noSniff: true
        }));
        app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0 / MySQL 5.3.4' }));

        Log.http(app);
        app.use(auth.installMiddleware(app))
        app.use('/api', routes);
        app.get('/ping', this.ping);
        app.use(this.notFoundError);
        app.use(this.restErrorHandler);
    }
    notFoundError(req, res, next) {
        const err = new Error();
        err.message = 'Requested Resource is not found';
        err.name = 'NotFoundError';
        err.status = 404;
        err.level = 'warning';
        return next(err);
    }
    restErrorHandler(err, req, res) {
        console.log(err); // for debugging purposes //
        return res.status(has(err, 'status') ? err.status : 500)
            .json(err || { message: 'Something Went Wrong!', name: 'InteralServerError', level: 'error', status: 500 });
    }
    /**
     * @returns A promisified payload object to signify the API is online and working 
     */
    async ping(req, res, next) {
        try {
            const counted = await new Promise(
                (resolve) => {
                    setTimeout(
                        () => resolve({
                            payload: randomBytes(12).toString('base64'),
                            timestamp: new Date().toISOString()
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