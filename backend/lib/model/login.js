/**
 * created on 18.04.2018
 */

const {isEmpty, isString} = require('lodash');
const auth = require('../auth');
const {randomBytes} = require('crypto');

/**
 * generates a json web token on presence of a password and username
 * @function loginUser
 * @param {string} username
 * @param {string} password
 * @return {string}
 */
const loginUser = (username, password) => {
    if (isEmpty(username) || !isString(username)) {
        const err = new Error();
        err.name = 'NullData';
        err.message = 'username provided is an empty string or null';
        err.level = 'error';
        err.status = 405;
        throw err;
    }
    if (isEmpty(password) || !isString(password)) {
        const err = new Error();
        err.name = 'NullData';
        err.message = 'password provided is an empty string or null';
        err.level = 'error';
        err.status = 405;
        throw err;
    }

    // generate jwt token
    return auth._class_.generateToken({username, payload: randomBytes(20).toString('base64')});
};

module.exports = loginUser;
