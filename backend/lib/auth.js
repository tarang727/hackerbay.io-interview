/**
 * created on 17.04.2018
 */

const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

class Auth {

    static _init() {
        const auth = new Auth();
        return auth;
    }

    constructor() {}

}

module.exports = Auth._init();