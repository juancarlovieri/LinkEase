import { useReducer } from 'react';
import Blockchain from './api/blockchain/blockchain';
import Dex from './api/dex';

const Account = require('./api/blockchain/account');
const Transaction = require('./api/blockchain/transaction');
const DexAccount = require('./api/account');
let orders = [];
const dex = new Dex();

const chains = [new Blockchain(`IndoCoin`), new Blockchain(`Slaycoin`), new Blockchain(`EusoffCoin`), dex.blockchain];


const users = [new DexAccount(`Ahmad`), new DexAccount(`Bob`), new DexAccount(`Oreo`), new DexAccount(`xaea12`)];
for (const user of users) {
  for (const chain of chains) {
    user.setAccount(chain, new Account(user.name, 100));
  }
}

let matching = true;

if (sessionStorage.getItem(`orders`)) {
  orders = JSON.parse(sessionStorage.getItem(`orders`));
  console.log(orders);
  for (const order of orders) {
    exchangeOnly(users[order.user], chains[order.blockchain1], order.amount1, chains[order.blockchain2], order.amount2);
  }
  matching = false;
} else matching = false;

// const bitcoin = new Blockchain(`IndoCoin`);
// const eth = new Blockchain(`SlayCoin`);

// const bitcoin1 = new Account(`A bitcoin`, 1000);
// const bitcoin2 = new Account(`B bitcoin`, 1000);

// const eth1 = new Account(`A eth`, 500);
// const eth2 = new Account(`B eth`, 500);

// const DexAccount1 = new DexAccount(`Ahmad`);
// const DexAccount2 = new DexAccount(`Bob`);

// DexAccount1.setAccount(bitcoin, bitcoin1);
// DexAccount1.setAccount(eth, eth1);

// DexAccount2.setAccount(bitcoin, bitcoin2);
// DexAccount2.setAccount(eth, eth2);

// console.log(users[0]);

// const order = users[0].makeOrder(chains[0], 10, chains[1], 5);
// order.lock();


// const order2 = users[1].makeOrder(chains[1], 1, chains[0], 2);
// order2.lock();


// const order3 = users[2].makeOrder(chains[1], 4, chains[0], 8);
// order3.lock();

// const order4 = users[3].makeOrder(chains[2], 100, chains[0], 2);
// order4.lock();

// const order5 = users[2].makeOrder(chains[1], 1, chains[2], 50);
// order5.lock();

// const dex = new Dex();
// dex.pushOrder(order);
// dex.pushOrder(order2);
// dex.pushOrder(order3);
// dex.pushOrder(order4);
// dex.pushOrder(order5);

// console.log(bitcoin1.getBalance());
// console.log(bitcoin2.getBalance());

// console.log(eth1.getBalance());
// console.log(eth2.getBalance());

// console.log(bitcoin.chain);
// console.log(eth.chain);
// console.log(dex.blockchain.chain);


function getDexChain() {
  const blocks = dex.blockchain.chain;
  let ret = [];
  for (var i = 0; i < blocks.length; ++i) {
    if (i == 0) {
      ret.push({id: 0, data: `Genesis Block.`, hash: blocks[i].hash});
      continue;
    }
    if (blocks[i].data.type == 0) {
      ret.push({id: i, data: `Transfer of ${blocks[i].data.value} from ${blocks[i].data.sourceAccount.owner} to ${blocks[i].data.destinationAccount.owner}`, hash: blocks[i].hash});
      continue;
    }
    console.log(blocks[i].data.type)
    if (blocks[i].data.completed) ret.push({id: i, data: `${blocks[i].data.owner.name} completed order no.${blocks[i].data.id}`, hash: blocks[i].hash});
    else ret.push({id: i, data: `${blocks[i].data.owner.name} placed order no.${blocks[i].data.id}`, hash: blocks[i].hash});
  }
  return ret;
}

function getBlockchains() {
  const ret = [];
  for (let i = 0; i < chains.length; ++i) {
    const chain = chains[i];
    if (chain == dex.blockchain) continue;

    const res = [];
    for (const block of chain.chain) {
      if (res.length == 0) {
        res.push({id: 0, data: `Genesis Block.`, hash: block.hash});
        continue;
      }
      res.push({id: res.length, data: `Transfer of ${block.data.value} from ${block.data.sourceAccount.owner} to ${block.data.destinationAccount.owner}.`, hash: block.hash})
    }
    ret.push({name: chain.name, blocks: res});
  }

  return ret;
}

function exchange(user, chain1, amount1, chain2, amount2) {
  const order = user.makeOrder(chain1, amount1, chain2, amount2);
  order.lock();

  dex.pushOrder(order);
  // console.log(({user: users.indexOf(user), blockchain1: chains.indexOf(chain1), blockchain2: chains.indexOf(chain2), amount1, amount2}));
  orders.push({id: order.id, user: users.indexOf(user), blockchain1: chains.indexOf(chain1), blockchain2: chains.indexOf(chain2), amount1, amount2});
  console.log(JSON.stringify(orders));
  sessionStorage.setItem(`orders`, JSON.stringify(orders));
}

function exchangeOnly(user, chain1, amount1, chain2, amount2) {
  const order = user.makeOrder(chain1, amount1, chain2, amount2);
  order.lock();

  dex.pushOrder(order);
}

function getUsers() {
  return users;
}

function getChains() {
  return chains;
}

function getOrders() {
  while (matching);
  return dex.orders.map(order => ({id: order.id, owner: order.owner, blockchain1: order.blockChain1, amount1: order.amount1, blockchain2: order.blockChain2, amount2: order.amount2}));
}

export {getDexChain, getBlockchains, getUsers, getChains, exchange, getOrders};