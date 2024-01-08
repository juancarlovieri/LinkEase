const Order = require(`./Order`);

class DexAccount {
  static lastId = 0;
  constructor() {
    this.accounts = new Map();
    this.id = DexAccount.lastId++;
  }

  setAccount(blockChain, account) {
    this.accounts.set(blockChain, account);
  }

  getAccount(blockChain) {
    return this.accounts.get(blockChain);
  }

  makeOrder(blockChain1, value1, blockChain2, value2) {
    return new Order(this, blockChain1, value1, blockChain2, value2);
  }

  stringify() {
    return this.id;
  }
}

module.exports = DexAccount;
