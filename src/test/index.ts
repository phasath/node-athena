import * as assert from 'assert'
import * as aws from 'aws-sdk'
import * as athena from '../index'

describe('Array', () => {
  describe('#createClientOverWriting()', () => {
    it('should return athenaClient overwriting the aws config', (done: any) => {
      const client = athena.createClient(
        { bucketUri: 's3://xxxx' },
        { region: 'xxxx' },
      )
      assert.notEqual(client, undefined)
      done()
    })
  })

  describe('#createClientWithoutOverWriting()', () => {
    it('should return athenaClient without overwriting the aws config', (done: any) => {
      aws.config.update({ region: 'wwww' })

      assert.equal(aws.config.region, 'wwww')

      const client1 = athena.createClient(
        { bucketUri: 's3://xxxx' },
        { region: 'xxxx' },
      )
      assert.equal(aws.config.region, 'xxxx')

      const client2 = athena.createClient(
        { bucketUri: 's3://yyyy' },
        { region: 'yyyy' },
        false,
      )
      assert.equal(aws.config.region, 'xxxx')

      assert.notEqual(client1, undefined)
      assert.notEqual(client2, undefined)
      assert.notEqual(client1, client2)
      done()
    })
  })

  describe('#setConcurrentExecMax()', () => {
    it('should no error', (done: any) => {
      athena.setConcurrentExecMax(10)
      done()
    })
  })
})
