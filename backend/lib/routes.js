/**
 * created on 17.04.2018
 */

const express = require('express');
const {has, isEmpty} = require('lodash');
const jsonPatch = require('./model/json-patch');
const loginUser = require('./model/login');
const sharp = require('sharp');
const fetch = require('node-fetch');

/**
 * Holds all the routes and route handlers for the api
 * @class Routes
 * @protected
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
     * @access private
     * @member {Function}
     * @return {*} express buffer stream response
     */
    async thumbnailCreator(req, res, next) {
        try {
            const imageUrl = has(req.body, 'image_url') && !isEmpty(req.body.image_url)
                ? req.body.image_url
                : 'https://www.hdwallpapers.in/walls/life_under_the_ocean-wide.jpg';

            const imageBuffer = await fetch(imageUrl, {method: 'GET', compress: true}).then((res) => res.buffer());
            const imageThumbnail = await sharp(imageBuffer).resize(50, 50).toBuffer();
            return res.send(imageThumbnail);
        } catch (e) {
            return next(e);
        }
    }
}

/* initialize the Routes class */
module.exports = Routes._init;
