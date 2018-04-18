/**
 * created on 17.04.2018
 */

require('dotenv').config();

const jwt = require('jsonwebtoken');
const {isEmpty} = require('lodash');
const {randomBytes} = require('crypto');
const expressJWT = require('express-jwt');

/**
 * JWT Secret
 * @access private
 * @readonly
 */
const _secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : randomBytes(24).toString('hex');

/**
 * Handles all jwt authentication functionalities
 * @class Auth
 * @access public
 */
class Auth {
    /**
     * creates an instance of Auth class
     * @access public
     * @static
     * @return {Auth}
     * @readonly
     */
    static get _init() {
        const auth = new Auth();
        return auth;
    }

    /**
     * generates a JWT token
     * @access public
     * @static
     * @param {*} payload
     * @return {string} json web token string
     */
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
                issuer: 'hackerbay.io:backend',
            });
    }

    /**
     * used to inject express-jwt middleware to an express application
     * @member {Function}
     * @access public
     * @instance
     * @return {jwt.RequestHandler}
     */
    installMiddleware() {
        return expressJWT({secret: _secret, requestProperty: 'auth'})
            .unless({
                path: [
                    {url: '/api/login', method: ['POST']},
                    {url: '/api/test', method: ['GET']},
                ],
            });
    }
}

/* initialize the Auth class and provide its instance */
module.exports = Auth._init;

/* export the Auth class for use of static methods */
module.exports._class_ = Auth;
