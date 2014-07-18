/* global describe, it */
'use strict';

var expect = require('chai').expect;
var Bank   = require('../../app/models/bank');

describe('Bank', function(){
  describe('constructor', function() {
    it('should create a bank with accounts, have a name', function(){
      var chase = new Bank('Chase');
      expect(chase.name).to.equal('Chase');
      expect(chase).to.be.instanceof(Bank);
      expect(chase.accounts).to.have.length(0);
    });
  });
});
