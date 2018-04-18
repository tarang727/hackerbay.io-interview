/**
 * created on 18.04.2018
 * @author John Waweru
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const {has, isDate, isError, isString, isNil} = require('lodash');
const app = require('../lib/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Api Test Suite', function() {
    it('Check that app module exports app class as well', () => {
        expect(isNil(app._class_)).to.be.false;
        expect(isNil(app._class_._init)).to.be.false;
        expect(typeof app._class_._init).to.eql('object');
        expect(typeof app._class_._init._app).to.eql('function');

        return chai.request(app._class_._init._app)
            .get('/ping')
            .then((res) => {
                expect(res.body).to.be.an('object', 'The response body should be an JSON Object');
                expect(has(res.body, 'timestamp')).to.be.true;
                expect(has(res.body, 'payload')).to.be.true;
                expect(isDate(new Date(res.body.timestamp))).to.be.true;
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
                return Promise.reject(e);
            });
    });

    it('Ping server to see if it works', () => {
        return chai.request(app).get('/ping')
            .then((res) => {
                expect(res.body).to.be.an('object', 'The response body should be an JSON Object');
                expect(has(res.body, 'timestamp')).to.be.true;
                expect(has(res.body, 'payload')).to.be.true;
                expect(isDate(new Date(res.body.timestamp))).to.be.true;
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
                return Promise.reject(e);
            });
    });

    it('Ping Api to see if it works', () => {
        return chai.request(app).get('/api/test')
            .then((res) => {
                expect(isString(res.text)).to.be.true;
                expect(res.text).to.eql('It Works!', 'Should return a statement: "It Works!"');
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
                return Promise.reject(e);
            });
    });
});
