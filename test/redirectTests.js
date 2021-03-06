'use strict';

var assert = require('assertthat');

var redirect = require('../lib/redirect');

suite('redirect', function () {
  suite('returns undefined', function () {
    test('for localhost.', function (done) {
      assert.that(redirect('http', 'localhost', '/foo/bar', {
        protocol: 'https',
        hostname: 'www.thenativeweb.io',
        port: 4000
      })).is.undefined();
      done();
    });

    test('for localhost:3000.', function (done) {
      assert.that(redirect('http', 'localhost:3000', '/foo/bar', {
        protocol: 'https',
        hostname: 'www.thenativeweb.io',
        port: 4000
      })).is.undefined();
      done();
    });

    test('for the forced domain with the correct port.', function (done) {
      assert.that(redirect('http', 'www.thenativeweb.io:4000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000
      })).is.undefined();
      done();
    });
  });

  suite('returns a temporary redirect', function () {
    test('for the forced domain with another port.', function (done) {
      assert.that(redirect('http', 'www.thenativeweb.io:3000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000
      })).is.equalTo({
        type: 'temporary',
        url: 'http://www.thenativeweb.io:4000/foo/bar'
      });
      done();
    });

    test('for another domain with the correct port.', function (done) {
      assert.that(redirect('http', 'thenativeweb.io:4000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000
      })).is.equalTo({
        type: 'temporary',
        url: 'http://www.thenativeweb.io:4000/foo/bar'
      });
      done();
    });

    test('for another domain with another port.', function (done) {
      assert.that(redirect('http', 'thenativeweb.io:3000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000
      })).is.equalTo({
        type: 'temporary',
        url: 'http://www.thenativeweb.io:4000/foo/bar'
      });
      done();
    });
  });

  suite('returns a permanent redirect', function () {
    test('for the forced domain with another port.', function (done) {
      assert.that(redirect('http', 'www.thenativeweb.io:3000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000,
        type: 'permanent'
      })).is.equalTo({
        type: 'permanent',
        url: 'http://www.thenativeweb.io:4000/foo/bar'
      });
      done();
    });

    test('for another domain with the correct port.', function (done) {
      assert.that(redirect('http', 'thenativeweb.io:4000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000,
        type: 'permanent'
      })).is.equalTo({
        type: 'permanent',
        url: 'http://www.thenativeweb.io:4000/foo/bar'
      });
      done();
    });

    test('for another domain with another port.', function (done) {
      assert.that(redirect('http', 'thenativeweb.io:3000', '/foo/bar', {
        hostname: 'www.thenativeweb.io',
        port: 4000,
        type: 'permanent'
      })).is.equalTo({
        type: 'permanent',
        url: 'http://www.thenativeweb.io:4000/foo/bar'
      });
      done();
    });
  });
});
