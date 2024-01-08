class Order {
  static lastId = 0;
  
  constructor(owner, blockChain1, amount1, blockChain2, amount2, id = Order.lastId++, locked = false, completed = false) {
    this.type = 1;
    this.id = id;
    this.owner = owner;         // Owner of the order
    this.blockChain1 = blockChain1;
    this.blockChain2 = blockChain2;
    this.amount1 = amount1;
    this.amount2 = amount2;
    this.locked = locked;
    this.completed = completed;
  }

  clone() {
    const order = new Order(this.owner, this.blockChain1, this.amount1, this.blockChain2, this.amount2, this.id, this.locked, this.completed);
    return order;
  }

  // Lock the order
  lock() {
    console.log(`Locking order.`);
    if (this.locked) return;
    const account = this.owner.accounts.get(this.blockChain1);
    if (!account) throw new Error(`No account found.`);
    if (account.getBalance() >= this.amount1) {
      account.debit(this.amount1);
      this.locked = true;
    } else {
      throw new Error('Insufficient balance to lock transaction.');
    }
  }

  unlock() {
    console.log(`Unlocking order.`);
    const account = this.owner.accounts.get(this.blockChain1);
    account.credit(this.amount1);
  }

  execute() {

  }

  
  stringify() {
    return this.type + this.owner.stringify() + this.blockChain1.stringify() + this.amount1 + this.blockChain2.stringify() + this.amount2 + this.locked + this.completed;
  }

}

module.exports = Order;
