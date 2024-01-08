class Account {
  constructor(owner, initialBalance = 0, transactionHistory = []) {
    this.owner = owner;
    this.balance = initialBalance;
    this.transactionHistory = transactionHistory;
  }

  // Method to add funds to the account
  credit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.transactionHistory.push({ type: 'credit', amount });
      console.log(`${amount} credited to ${this.owner}'s account.`);
    }
  }

  // Method to withdraw funds from the account
  debit(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.transactionHistory.push({ type: 'debit', amount });
      console.log(`${amount} debited from ${this.owner}'s account.`);
    } else {
      console.log(`Insufficient balance for the transaction.`);
    }
  }

  // Method to get the current balance
  getBalance() {
    return this.balance;
  }

  // Method to get the transaction history
  getTransactionHistory() {
    return this.transactionHistory;
  }

  stringify() {
    return this.owner + this.balance;
  }

  clone() {
    return new Account(this.owner, this.balance, this.transactionHistory);
  }
}

module.exports = Account;
