'use strict';

function Account(number, name, type, balance){
  this.number  = number;
  this.name    = name;
  this.type    = type;
  this.balance = balance;

  this.deposits   = [];
  this.withdrawls = [];
}
Account.prototype.deposit = function(amount){
  this.deposits.push(amount);
  this.balance += amount;
};


module.exports = Account;
