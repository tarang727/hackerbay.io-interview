/**
 * created on 17.04.2018
 */

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('crypto');
const expressJWT = require('express-jwt');

class Auth {

    static get _secret() {
        return crypto.randomBytes(24).toString('hex');
    }

    static get _init() {
        const auth = new Auth();
        return auth;
    }

    static generateToken(payload) {
        if (_.isEmpty(payload)) {
            const err = new Error();
            err.name = 'MissingData';
            err.message = 'payload seems to be empty';
            err.level = 'error';
            err.status = 400;
            throw err;
        }
        console.log(Auth._secret);        
        return jwt.sign(payload, (Auth._secret),
            {
                expiresIn: '1d',
                audience: 'hackerbay.io:api',
                issuer: 'hackerbay.io:backend'
            });
    }

    constructor() { }

    installMiddleware() {
        console.log(Auth._secret);
        return expressJWT({ secret: Auth._secret, requestProperty: 'auth' })
            .unless({
                path: [
                    { url: '/api/login', method: ['POST'] },
                    { url: '/api/test', method: ['GET'] }
                ]
            });
    }

}

module.exports = Auth._init;