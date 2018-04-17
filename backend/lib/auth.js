/**
 * created on 17.04.2018
 */

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('crypto');

class Auth {

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
        return jwt.sign(payload, (process.env.JWT_SECRET),
            {
                expiresIn: '1d',
                audience: 'hackerbay.io:api',
                issuer: 'hackerbay.io:backend'
            });
    }

    constructor() { }

}

module.exports = Auth._init;