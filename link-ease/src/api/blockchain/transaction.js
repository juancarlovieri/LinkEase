class Transaction {
  constructor(sourceAccount, destinationAccount, value, locked = false, completed = false) {
    this.type = 0;
    this.sourceAccount = sourceAccount;
    this.destinationAccount = destinationAccount;
    this.value = value;
    this.locked = locked;
    this.completed = completed;
  }

  // Lock the transaction (prevent double spending)
  lock() {
    if (this.locked) return;
    if (this.sourceAccount.balance >= this.value) {
      this.sourceAccount.debit(this.value);
      this.locked = true;
    } else {
      throw new Error('Insufficient balance to lock transaction.');
    }
  }

  // Execute the transaction
  execute() {
    if (!this.locked) {
      throw new Error('Transaction must be locked before execution.');
    }
    this.destinationAccount.credit(this.value);
    this.locked = false; // Unlock after execution
    this.completed = true;
  }

  abort() {
    if (!this.completed) {
      this.sourceAccount.credit(this.value);
    } else throw new Error(`Transaction already processed.`);
  }

  stringify() {
    return this.type + this.sourceAccount.stringify() + this.destinationAccount.stringify() + this.value;
  }

  clone() {
    const transaction = new Transaction(this.sourceAccount.clone(), this.destinationAccount.clone(), this.value, this.locked, this.completed);
    return transaction;
  }
}

module.exports = Transaction;
