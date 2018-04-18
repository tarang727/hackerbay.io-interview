/**
 * created on 18.04.2018
 * @author John Waweru
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const {has, isError} = require('lodash');
const app = require('../lib/app');
const login = require('../lib/model/login');
const jsonPatch = require('../lib/model/json-patch');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Api JSON Patch Module Test Suite', function() {
    const payload = login('user', 'password');
    const obj = {firstName: 'Albert', contactDetails: {phoneNumbers: []}};
    const changes = [
        {op: 'replace', path: '/firstName', value: 'Joachim'},
        {op: 'add', path: '/lastName', value: 'Wester'},
        {op: 'add', path: '/contactDetails/phoneNumbers/0', value: {number: '555-123'}},
    ];

    it('Should apply changes from a JSON patch to an object', (done) => {
        expect(jsonPatch).to.throw;
        expect(jsonPatch.bind(jsonPatch, obj, null)).to.throw;

        const result = jsonPatch(obj, changes);
        expect(result).to.be.an('object');
        expect(result.firstName).to.eql('Joachim');
        expect(has(result, 'lastName')).to.be.true;
        expect(result.lastName).to.eql('Wester');
        expect(has(result.contactDetails, 'phoneNumbers')).to.be.true;
        expect(result.contactDetails.phoneNumbers.length).to.eql(1);
        done();
    });

    it('Should have An API for applying changes from a JSON patch to an object', () => {
        return chai.request(app)
            .post('/api/json-patch')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .send({
                original_json: obj,
                json_patch: changes,
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.firstName).to.eql('Joachim');
                expect(has(res.body, 'lastName')).to.be.true;
                expect(res.body.lastName).to.eql('Wester');
                expect(has(res.body.contactDetails, 'phoneNumbers')).to.be.true;
            })
            .catch((e) => {
                console.log(e);
                expect(e).to.be.null;
                expect(isError(e)).to.be.false;
            });
    });

    it('API should error out when missing data', () => {
        return chai.request(app)
            .post('/api/json-patch')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .send({
                original_json: null,
                json_patch: changes,
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

    it('API should error out when request body has a missing key', () => {
        return chai.request(app)
            .post('/api/json-patch')
            .set('Authorization', 'Bearer ' + payload)
            .set('Content-Type', 'application/json')
            .send({
                object: null,
                json_patch: changes,
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
