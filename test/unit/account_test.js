
/* global describe, it */
'use strict';

var expect = require('chai').expect;
var Account   = require('../../app/models/account');

describe('Account', function(){
  describe('constructor', function() {
    it('should create an account with acct number, name, type, balance, deposits and withdrawls', function(){
      var acct1 = new Account(1234, 'bob', 'savings', 1500);
      expect(acct1.name).to.equal('bob');
      expect(acct1).to.be.instanceof(Account);
      expect(acct1.deposits).to.have.length(0);
      expect(acct1.withdrawls).to.have.length(0);
      expect(acct1.number).to.equal(1234);
      expect(acct1.balance).to.equal(1500);
      expect(acct1.type).to.equal('savings');
    });
  });
  describe('#deposit', function() {
    it('should add to balance and add 1 to deposits array', function(){
      var acct1 = new Account(1234, 'bob', 'savings', 1500);
      acct1.deposit(1000);

      expect(acct1.deposits[0]).to.equal(1000);
      expect(acct1.deposits).to.have.length(1);
      expect(acct1.balance).to.equal(2500);
    });
  });
  describe('#withdrawl', function() {
    it('should decrease balance and add 1 to withdrawl array', function(){
      var acct1 = new Account(1234, 'bob', 'savings', 1500);
      acct1.withdraw(500);

      expect(acct1.withdrawls[0]).to.equal(500);
      expect(acct1.balance).to.equal(1000);
    });
    it('should penalize acct holder for over draft', function(){
      var acct1 = new Account(1234, 'bob', 'savings', 1500);
      acct1.withdraw(5000);

      expect(acct1.withdrawls[0]).to.equal(5000);
      expect(acct1.balance).to.equal(-3550);
      expect(acct1.overdraft).to.equal(1);
    });
    it('should suspend the acct holder if three withdrawls while overdrafted', function(){
      var acct1 = new Account(1234, 'bob', 'savings', 1500);
      acct1.withdraw(2000);
      acct1.withdraw(1);
      acct1.withdraw(1);
      acct1.withdraw(1);
      expect(acct1.withdrawls[0]).to.equal(2000);
      expect(acct1.withdrawls[1]).to.equal(1);
      expect(acct1.withdrawls[2]).to.equal(1);
      expect(acct1.balance).to.equal(-652);
      expect(acct1.isSuspended).to.equal(true);
    });
  });
});
