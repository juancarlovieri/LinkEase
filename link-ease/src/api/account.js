const Order = require(`./Order`);

class DexAccount {
  static lastId = 0;
  constructor(name) {
    this.name = name;
    this.accounts = new Map();
    this.id = DexAccount.lastId++;
  }

  setAccount(blockChain, account) {
    this.accounts.set(blockChain, account);
  }

  getAccount(blockChain) {
    return this.accounts.get(blockChain);
  }

  makeOrder(blockChain1, value1, blockChain2, value2, fee) {
    return new Order(this, blockChain1, value1, blockChain2, value2, fee);
  }

  stringify() {
    return this.id;
  }

  backup() {
    return JSON.stringify({name: this.name, id: this.id, accounts: this.accounts.map(a => a.backup())});
  }
}

module.exports = DexAccount;
