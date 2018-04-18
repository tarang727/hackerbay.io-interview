/**
 * created on 17.04.2018
 * @author John Waweru
 */

const express = require('express');
const {has, isEmpty} = require('lodash');
const jsonPatch = require('./model/json-patch');
const loginUser = require('./model/login');
const sharp = require('sharp');
const fetch = require('node-fetch');
const fileType = require('file-type');

/**
 * Holds all the routes and route handlers for the api
 * @class Routes
 * @public
 */
class Routes {
    /**
     * creates an instance of Routes class and returns an instance of express.Router class instance used in the Routes class;
     * @access public
     * @static
     * @return {express.Router}
     * @readonly
     */
    static get _init() {
        const routes = new Routes(express.Router());
        return routes._app;
    }

    /**
     * express.Router class instance used in the class
     * @member {express.Router}
     * @readonly
     * @access public
     */
    get _app() {
        return this.app;
    }

    /**
     * @constructor
     * @param {express.Application} app
     * @private
     */
    constructor(app) {
        this.app=app;
        app.get('/test', (req, res) => res.send('It Works!')); /* Testing where the '/api' route is reachable */
        app.post('/login', this.login);
        app.post('/json-patch', this.jsonPatch);
        app.post('/thumbnail', this.thumbnailCreator);
    }

    /**
     * API login route handler
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @access private
     * @member {Function}
     * @return {*} express json response
     */
    login(req, res, next) {
        try {
            if (!has(req.body, 'username') || !has(req.body, 'password')) {
                const err = new Error();
                err.name = 'MissingData';
                err.message = 'username or password is missing please check the json sent';
                err.level = 'error';
                err.status = 400;
                throw err;
            }

            const token = loginUser(req.body.username, req.body.password);
            return res.json({
                jwt_token: token,
                timestamp: new Date().toISOString(),
                login: 'successful',
            });
        } catch (e) {
            return next(e);
        }
    }

    /**
     * API json patch route handler
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @access private
     * @member {Function}
     * @return {*} express json response
     */
    jsonPatch(req, res, next) {
        try {
            if (!has(req.body, 'original_json') || !has(req.body, 'json_patch')) {
                const err = new Error();
                err.name = 'MissingData';
                err.message = 'Please provide original_json field and json_patch field in the request body.';
                err.level = 'error';
                err.status = 400;
                throw err;
            }

            const doc = jsonPatch(req.body.original_json, req.body.json_patch);
            return res.json(doc);
        } catch (e) {
            return next(e);
        }
    }

    /**
     * API image thumbnail route handler
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {*} express buffer stream response
     * @access private
     * @member {Function}
     * @async
     */
    async thumbnailCreator(req, res, next) {
        try {
            const imageUrl = has(req.body, 'image_url') && !isEmpty(req.body.image_url)
                ? req.body.image_url
                : 'https://cdn.macrumors.com/article-new/2017/11/crying-tears-of-joy-emoji-250x248.jpg';

            const imageBuffer = await fetch(imageUrl, {method: 'GET', compress: true}).then((res) => res.buffer());
            const imageThumbnail = await sharp(imageBuffer).resize(50, 50).toBuffer();

            res.writeHead(200, {'Content-Type': fileType(imageThumbnail).mime});
            return res.end(imageThumbnail, 'binary');
        } catch (e) {
            return next(e);
        }
    }
}

/* initialize the Routes class */
module.exports = Routes._init;
/* export Routes class */
module.exports._class_ = Routes;
