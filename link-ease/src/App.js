
import logo from './logo.svg';
import './App.css';
import BlockchainView from './components/BlockchainView';
import BlockchainCollection from './components/BlockchainCollection';
import {getDexChain, getBlockchains, getUsers, getChains, exchange, getOrders} from './api';
import UserGrid from './components/UserGrid';
import OrdersQueue from './components/OrdersQueue';

const mockBlockchainData = [
  { id: 1, data: 'Block 1 Data' },
  { id: 2, data: 'Block 2 Data' },
  // ... Add more mock data as needed
];


function App() {
console.log(BlockchainView);
return (
    <div className="app">
      <UserGrid users={getUsers()} chains={getChains()} exchange={exchange} />
      <h1>Current Offers</h1>
      <OrdersQueue orders={getOrders()} />
      <h1>Blockchain Representation</h1>
      <BlockchainView blocks={getDexChain()} name={"LinkEase"} />
      <BlockchainCollection chains={getBlockchains()} />
    </div>
  );
}

export default App;
