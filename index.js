{const Blockchain = require('./src/blockchain');
const Block = require('./src/block');
const SmartContract = require('./src/smartContract');

let myBlockchain = new Blockchain();
const mySmartContract = new SmartContract();

myBlockchain.addBlock(new Block(1, "10/07/2020", { amount: 4 }));
myBlockchain.addBlock(new Block(2, "12/07/2020", { amount: 10 }, '', mySmartContract));

console.log('Blockchain valid? ' + myBlockchain.isChainValid());

myBlockchain.chain[1].data = { amount: 100 }; // Attempt to tamper with the chain
console.log('Blockchain valid? ' + myBlockchain.isChainValid());
}
{
const Blockchain = require('./src/blockchain');
const Account = require('./src/account');

// Create a blockchain instance
const myBlockchain = new Blockchain();

// Create account instances
const aliceAccount = new Account('Alice', 1000);
const bobAccount = new Account('Bob', 500);

// Process a transaction
myBlockchain.processTransaction(aliceAccount, bobAccount, 200);

// Check balances
console.log(`Alice's balance: ${aliceAccount.getBalance()}`);
console.log(`Bob's balance: ${bobAccount.getBalance()}`);

// Check blockchain
console.log(JSON.stringify(myBlockchain, null, 2));
}