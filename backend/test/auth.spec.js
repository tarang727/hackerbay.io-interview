/**
 * created on 18.04.2018
 * @author John Waweru
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const {has, isError, isDate} = require('lodash');
const app = require('../lib/app');
const auth = require('../lib/auth');
const login = require('../lib/model/login');
const jwt = require('jsonwebtoken');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Api Auth Module Test Suite', function() {
    it('Should export an instance of Auth class', (done) => {
        expect(auth).to.be.an.instanceof(auth._class_, 'expected to be an instanceof auth._class_ which is Auth class');
        expect(auth.installMiddleware).to.be.a('function');
        expect(has(auth._class_, 'generateToken')).to.be.true;
        expect(has(auth._class_, '_init')).to.be.true;
        expect(auth._class_._init).to.be.instanceof(auth._class_, 'expected to be an instanceof auth._class_ which is Auth class');
        done();
    });

    it('Should generate a token', (done) => {
        const token = auth._class_.generateToken({obj: 'some string', obj2: 'some other string'});
        expect(token).to.be.a('string');
        const verifyToken = jwt.verify(token, auth.__secret, {issuer: 'hackerbay.io:backend', audience: 'hackerbay.io:api'});
        expect(verifyToken).to.not.be.null;
        expect(verifyToken).to.be.an('object');
        expect(has(verifyToken, 'obj')).to.be.true;
        expect(has(verifyToken, 'obj2')).to.be.true;
        done();
    });

    it('Should guard json-patch route and thumbnail route', () => {
        return chai.request(app)
            .post('/json-patch')
            .set('Authorization', 'Bearer [token]')
            .then((res) => {
                expect(res.status).to.be.eql(401);
                expect(res.unauthorized).to.be.true;
                return Promise.resolve(null);
            })
            .catch((e) => {
                expect(e).to.not.be.null;
                expect(isError(e)).to.be.true;
                return Promise.resolve(null);
            });
    });

    it('Should have a function to login user', (done) => {
        expect(login).to.be.a('function');
        const payload = login('username', 'password');
        expect(payload).to.be.a('string');
        const verifyPayload = jwt.verify(payload, auth.__secret, {issuer: 'hackerbay.io:backend', audience: 'hackerbay.io:api'});
        expect(verifyPayload).to.not.be.null;
        expect(verifyPayload).to.be.an('object');
        expect(has(verifyPayload, 'username')).to.be.true;
        expect(has(verifyPayload, 'payload')).to.be.true;
        done();
    });

    it('Login function should not allow missing username or password', (done) => {
        expect(login).to.throw;
        expect(login.bind(login, 'username', '')).to.throw;
        done();
    });

    it('Should have an Api route login user', () => {
        return chai.request(app)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user',
                password: 'pass-word',
            })
            .then((res) => {
                expect(res.body).to.be.an('object', 'The response body should be an JSON Object');
                expect(has(res.body, 'jwt_token')).to.be.true;
                expect(has(res.body, 'timestamp')).to.be.true;
                expect(has(res.body, 'login')).to.be.true;
                expect(isDate(new Date(res.body.timestamp))).to.be.true;
                expect(res.body.login).to.eql('successful');
                expect(res.body.jwt_token).to.be.a('string');
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
                return Promise.reject(e);
            });
    });

    it('Should not login user with missing information', () => {
        return chai.request(app)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'user',
                password: null,
            })
            .then((res) => {
                expect(res.status).to.be.eql(400);
                expect(res.error.name).to.be.eql('MissingData');
                return Promise.resolve(null);
            })
            .catch((e) => {
                expect(e).to.not.be.null;
                expect(isError(e)).to.be.true;
            });
    });
});
