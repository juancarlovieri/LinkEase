const Block = require('./block');

class Genesis {
  stringify() {
    return "Genesis block";
  }
}

class Blockchain {
  static lastId = 0;
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.id = Blockchain.lastId++;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2020", new Genesis(), "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    
    if (newBlock.smartContract) {
      newBlock.smartContract.execute(this, newBlock.data);
    }

    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(currentBlock.hash, currentBlock.data.stringify(), currentBlock.calculateHash());
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  processTransaction(transaction) {
    try {
      if (!transaction.locked) throw new Error(`Transaction not locked.`);
      const newBlock = new Block(this.chain.length, Date.now(), transaction.clone());
      this.addBlock(newBlock);
      transaction.execute();
      console.log('Transaction processed and added to blockchain.');
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  stringify() {
    return this.id.toString();
  }
}

module.exports = Blockchain;
