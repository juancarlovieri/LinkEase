

const Blockchain = require('./blockchain/blockchain');
const Account = require('./blockchain/account');
const Transaction = require('./blockchain/transaction');
const DexAccount = require('./account');
const Dex = require('./dex');
{
// Create a blockchain instance
const myBlockchain = new Blockchain();

// Create account instances
const aliceAccount = new Account('Alice', 1000);
const bobAccount = new Account('Bob', 500);

const transaction = new Transaction(aliceAccount, bobAccount, 12);
try {
transaction.lock();

// Process a transaction
myBlockchain.processTransaction(transaction);

// Check balances
console.log(`Alice's balance: ${aliceAccount.getBalance()}`);
console.log(`Bob's balance: ${bobAccount.getBalance()}`);

// Check blockchain
console.log(JSON.stringify(myBlockchain, null, 2));
} catch (error) {
  transaction.abort();
}
}

const bitcoin = new Blockchain();
const eth = new Blockchain();

const bitcoin1 = new Account(`A bitcoin`, 1000);
const bitcoin2 = new Account(`B bitcoin`, 1000);

const eth1 = new Account(`A eth`, 500);
const eth2 = new Account(`B eth`, 500);

const DexAccount1 = new DexAccount(`Ahmad`);
const DexAccount2 = new DexAccount(`Bob`);

DexAccount1.setAccount(bitcoin, bitcoin1);
DexAccount1.setAccount(eth, eth1);

DexAccount2.setAccount(bitcoin, bitcoin2);
DexAccount2.setAccount(eth, eth2);

const order = DexAccount1.makeOrder(bitcoin, 10, eth, 5);
order.lock();
console.log(bitcoin1.getBalance());

const order2 = DexAccount2.makeOrder(eth, 1, bitcoin, 2);
order2.lock();
console.log(eth2.getBalance());


const order3 = DexAccount2.makeOrder(eth, 4, bitcoin, 8);
order3.lock();
console.log(eth2.getBalance());

const dex = new Dex();
dex.pushOrder(order);
dex.pushOrder(order2);
dex.pushOrder(order3);

console.log(bitcoin1.getBalance());
console.log(bitcoin2.getBalance());

console.log(eth1.getBalance());
console.log(eth2.getBalance());

console.log(bitcoin.chain);
console.log(eth.chain);
console.log(dex.blockchain.chain);

function getDexChain() {
  const blocks = dex.blockchain.chain;
  let ret = [];
  for (var i = 0; i < blocks.length; ++i) {
    if (i == 0) {
      ret.push({id: 0, data: `Genesis Block.`});
      continue;
    }
    console.log(blocks[i].data.owner);
    if (blocks[i].data.completed) ret.push({id: i, data: `${blocks[i].data.owner.name} completed order no.${blocks[i].data.id}`});
    else ret.push({id: i, data: `${blocks[i].data.owner.name} placed order no.${blocks[i].data.id}`});
  }

  return ret;
}

console.log(getDexChain());

export default {getDexChain};