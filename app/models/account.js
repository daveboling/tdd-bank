'use strict';

function Account(number, name, type, balance){
  this.number      = number;
  this.name        = name;
  this.type        = type;
  this.balance     = balance;
  this.isSuspended = false;
  this.overdraft   = 0;

  this.deposits   = [];
  this.withdrawls = [];
}
Account.prototype.deposit = function(amount){
  this.deposits.push(amount);
  this.balance += amount;
};

Account.prototype.withdraw = function(amount){
  if(this.balance < 0 && this.overdraft === 3){
    this.isSuspended = true;
  }
  else if(!this.isSuspended) {
    this.withdrawls.push(amount);
    this.balance -= amount;
    if(this.balance < 0){
      this.balance -= 50;
      this.overdraft++;
    }

  }
};


module.exports = Account;
