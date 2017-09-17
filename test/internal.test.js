'use strict';

/* global suite: false, setup: false, test: false,
    teardown: false, suiteSetup: false, suiteTeardown: false */

const assert = require('assert');
const werist = require('../');
const util = require('util');

suite('internal', function() {
  this.timeout(5000);
  suiteSetup((done) => done());
  suiteTeardown((done) => done());

  test('init Class', () => {
    const weristClass = new werist.Werist();
    assert.strictEqual(weristClass instanceof werist.Werist, true);
  });

  test('google.com via whois.iana.org', (done) => {
    werist.lookup('google.com', {server: 'whois.iana.org', verbose: true}, (err, data) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(data.length, 2);
      assert.strictEqual(util.isObject(data[0].server), true);
      assert.notStrictEqual(data[0].server.host, 'whois.iana.org');
      done();
    });
  });

  test('google.net via whois.iana.org:43', (done) => {
    werist.lookup('google.net', {server: 'whois.iana.org:43', verbose: true}, (err, data) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(data.length, 2);
      assert.strictEqual(util.isObject(data[0].server), true);
      assert.notStrictEqual(data[0].server.host, 'whois.iana.org');
      done();
    });
  });

  test('invalid server', (done) => {
    werist.lookup('google.com', {server: 'whois.iana.org:43:', verbose: true}, (err, data) => {
      assert.strictEqual(data, undefined);
      assert.strictEqual(err.message, 'invalid server');
      done();
    });
  });
});
