const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '', smartContract = null) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.smartContract = smartContract;
    this.hash = this.calculateHash();
    console.log(this.data.stringify(), this.hash);
  }

  calculateHash() {
    const hash = crypto.createHash('sha256');
    hash.update(this.index + this.previousHash + this.timestamp + this.data.stringify()).end();
    return hash.digest('hex');
  }
}

module.exports = Block;
