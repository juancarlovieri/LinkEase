
import logo from './logo.svg';
import './App.css';
import BlockchainView from './components/BlockchainView';
import {getDexChain} from './api';

const mockBlockchainData = [
  { id: 1, data: 'Block 1 Data' },
  { id: 2, data: 'Block 2 Data' },
  // ... Add more mock data as needed
];


function App() {
console.log(BlockchainView);
return (
    <div className="app">
      <h1>Blockchain Presentation</h1>
      <BlockchainView blocks={getDexChain()} />
    </div>
  );
}

export default App;
