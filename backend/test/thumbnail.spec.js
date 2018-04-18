/**
 * created on 18.04.2018
 * @author John Waweru
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const {has, isError} = require('lodash');
const fileType = require('file-type');
const app = require('../lib/app');
const login = require('../lib/model/login');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Api Thumbnail Module Test Suite', function() {
    const payload = login('user', 'password');

    it.skip('Should have an API that provides a buffer image', () => {
        return chai.request(app)
            .post('/api/thumbnail')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
            });
    });

    it.skip('API should work when image_url on request body is provided', () => {
        return chai.request(app)
            .post('/api/thumbnail')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .send({
                image_url: '',
            })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
            });
    });
});
