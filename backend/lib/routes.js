/**
 * created on 17.04.2018
 */

const express = require('express');

class Routes {

    static _init() {
        const routes = new Routes();
        return routes._app;
    }

    get _app() {
        return this.app;
    }

    constructor(app) {
        this.app=app;
        app.get('/test', (req, res) => res.send('It Works!')); // Testing where the /api route is reachable //
    }

    login(req, res, next) {

    }

    jsonPatch(req, res, next) {

    }

    thumbnailCreator(req, res, next) {

    }

}

module.exports = Routes._init();