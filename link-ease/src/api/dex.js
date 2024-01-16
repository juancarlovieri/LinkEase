import * as crypto from 'crypto-js';
import Blockchain from './blockchain/blockchain.js';

const Transaction = require(`./blockchain/transaction`);

export default class Dex {
  constructor() {
    this.blockchain = new Blockchain(`LinkEase`);
    this.orders = [];
  }

  pushOrder(order) {
    this.blockchain.processTransaction(order.clone());
    this.orders.push(order.clone());
    this.matchOrders();
  }

  pushOrderOnly(order) {
    this.blockchain.processTransaction(order.clone());
  }

  completeOrders(l, r, source, dest, rate) {
    const orderA = [], orderB = [];
    for (let i = r; i >= l; --i) {
      if (this.orders[i].blockChain1 == source && this.orders[i].blockChain2 == dest && JSON.stringify(this.simplify(this.orders[i].amount1, this.orders[i].amount2)) == JSON.stringify(rate)) {
        orderA.push(this.orders[i]);
        this.orders[i].unlock();
      }
      if (this.orders[i].blockChain1 == dest && this.orders[i].blockChain2 == source && JSON.stringify(this.simplify(this.orders[i].amount2, this.orders[i].amount1)) == JSON.stringify(rate)) {
        orderB.push(this.orders[i]);
        this.orders[i].unlock();
      }
    }

    let lastA = (orderA.at(-1)).clone();
    let lastB = (orderB.at(-1)).clone();

    while (orderA.length != 0) {
      const amount = Math.min(lastA.amount1, lastB.amount2);
      const transaction1 = new Transaction(lastA.owner.getAccount(source), lastB.owner.getAccount(source), amount);
      const transaction2 = new Transaction(lastB.owner.getAccount(dest), lastA.owner.getAccount(dest), this.calc(rate, amount));

      transaction1.lock();
      transaction2.lock();

      source.processTransaction(transaction1);
      dest.processTransaction(transaction2);

      lastA.amount1 -= amount;
      lastB.amount2 -= amount;

      if (lastA.amount1 == 0) {
        orderA.at(-1).completed = true;
        this.pushOrderOnly(orderA.at(-1).clone());
        orderA.pop();
        if (orderA.length) lastA = orderA.at(-1);
      }

      if (lastB.amount2 == 0) {
        orderB.at(-1).completed = true;
        this.pushOrderOnly(orderB.at(-1).clone());
        orderB.pop();
        if (orderB.length) lastB = orderB.at(-1);
      }
    }
    if (orderB.length != 0 || !this.blockchain.isChainValid() || !source.isChainValid() || !dest.isChainValid()) {
      throw new Error(`Checksum fail.`);
    }
  }

  matchOrders() {
    const market = new Map();
    for (let i = 0; i < this.orders.length; ++i) {
      const order = this.orders[i];
      const source = order.blockChain1, dest = order.blockChain2;
      const rate = this.simplify(order.amount1, order.amount2);
      if (market.has(this.calculateHash(source, dest, rate))) {
        market.set(this.calculateHash(source, dest, rate), market.get(this.calculateHash(source, dest, rate)) + order.amount1);
      } else {
        market.set(this.calculateHash(source, dest, rate), order.amount1);
      }

      const onw = market.get(this.calculateHash(source, dest, rate));
      const opp = this.calc(this.invert(rate), market.get(this.calculateHash(dest, source, this.invert(rate))));
      console.log(onw, opp, rate, this.calculateHash(source, dest, rate));
      if (onw == opp) {
        this.completeOrders(0, i, source, dest, rate);
        market.delete(this.calculateHash(source, dest, rate));
        market.delete(this.calculateHash(dest, source, this.invert(rate)));
      }
    }
    const newOrders = [];
    for (let i = 0; i < this.orders.length; ++i) {
      if (this.orders[i].completed) continue;
      else newOrders.push(this.orders[i]);
    }

    this.orders = newOrders;
  }

  calculateHash(source, dest, rate) {
    // const hash = crypto.createHash('sha256');
    // hash.update(source.stringify() + dest.stringify() + this.rate).end();
    // return hash.digest('hex');
    return crypto.SHA256(source.stringify() + dest.stringify() + JSON.stringify(rate)).toString();
  }

  simplify(a, b) {
     var gcd = function(a, b) {
       if (!b) {
         return a;
       }

       return gcd(b, a % b);
     }

    const GCD = gcd(a, b);
    a /= GCD;
    b /= GCD;
    return {a, b};
  }

  invert(rate) {
    return {a: rate.b, b: rate.a};
  }

  calc(rate, x) {
    return x * rate.b / rate.a;
  }
}

// module.exports = Dex;
// export default Dex;
