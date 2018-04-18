/**
 * created on 17.04.2018
 */

const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const {randomBytes} = require('crypto');
const expressJWT = require('express-jwt');

const _secret =  randomBytes(24).toString('hex');

class Auth {

    static get _init() {
        const auth = new Auth();
        return auth;
    }

    static generateToken(payload) {
        if (isEmpty(payload)) {
            const err = new Error();
            err.name = 'MissingData';
            err.message = 'payload seems to be empty';
            err.level = 'error';
            err.status = 400;
            throw err;
        }
        return jwt.sign(payload, _secret,
            {
                expiresIn: '1d',
                audience: 'hackerbay.io:api',
                issuer: 'hackerbay.io:backend'
            });
    }

    constructor() { }

    installMiddleware() {
        return expressJWT({ secret: _secret, requestProperty: 'auth' })
            .unless({
                path: [
                    { url: '/api/login', method: ['POST'] },
                    { url: '/api/test', method: ['GET'] }
                ]
            });
    }

}

module.exports = Auth._init;
module.exports._class_ = Auth;