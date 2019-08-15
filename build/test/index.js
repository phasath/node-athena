"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const aws = require("aws-sdk");
const athena = require("../index");
describe('Array', () => {
    describe('#createClientOverWriting()', () => {
        it('should return athenaClient overwriting the aws config', (done) => {
            const client = athena.createClient({ bucketUri: 's3://xxxx' }, { region: 'xxxx' });
            assert.notEqual(client, undefined);
            done();
        });
    });
    describe('#createClientWithoutOverWriting()', () => {
        it('should return athenaClient without overwriting the aws config', (done) => {
            aws.config.update({ region: 'wwww' });
            assert.equal(aws.config.region, 'wwww');
            const client1 = athena.createClient({ bucketUri: 's3://xxxx' }, { region: 'xxxx' });
            assert.equal(aws.config.region, 'xxxx');
            assert.notEqual(client1, undefined);
            const client2 = athena.createClient({ bucketUri: 's3://yyyy' }, { region: 'yyyy' });
            assert.equal(aws.config.region, 'yyyy');
            assert.notEqual(client2, undefined);
            const client3 = athena.createClient({ bucketUri: 's3://zzzz' }, { region: 'zzzz' }, false);
            assert.equal(aws.config.region, 'yyyy');
            assert.notEqual(client3, undefined);
            assert.notEqual(client1, client3);
            done();
        });
    });
    describe('#setConcurrentExecMax()', () => {
        it('should no error', (done) => {
            athena.setConcurrentExecMax(10);
            done();
        });
    });
});
//# sourceMappingURL=index.js.map