/**
 * created on 18.04.2018
 * @author John Waweru
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const {has, isError, isBuffer} = require('lodash');
const fileType = require('file-type');
const app = require('../lib/app');
const login = require('../lib/model/login');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Api Thumbnail Module Test Suite', function() {
    const payload = login('user', 'password');

    it('Should have an API that provides a buffer image', function() {
        this.timeout('25000ms');

        return chai.request(app)
            .post('/api/thumbnail')
            .set('Accept', 'application/octet-stream')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.eql('image/jpeg');
                expect(isBuffer(res.body)).to.be.true;
                expect(fileType(res.body).mime).to.eql('image/jpeg');
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
            });
    });

    it('API should work when image_url on request body is provided', function() {
        this.timeout('25000ms');

        return chai.request(app)
            .post('/api/thumbnail')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .send({
                image_url: 'https://avatars3.githubusercontent.com/u/29040596?s=70&v=4',
            })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.eql('image/png');
                expect(isBuffer(res.body)).to.be.true;
                expect(fileType(res.body).mime).to.eql('image/png');
            })
            .catch((e) => {
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
            });
    });
});
