import React, {useState} from 'react';
import Toast from './toast';

const ExchangeForm = ({ user, chains, exchange }) => {
  const [sourceChain, setSourceChain] = useState(1);
  const [targetChain, setTargetChain] = useState(2);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [fee, setFee] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (amount1 <= 0 || amount2 <= 0) {
      setToastMessage('Non-positive numbers are not allowed.');
      setShowToast(true);
      return;
    }
    if (sourceChain == targetChain) {
      setToastMessage('Same-chain exchange is not allowed.');
      setShowToast(true);
      return;
    }
    exchange(user, chains[sourceChain], parseInt(amount1), chains[targetChain], parseInt(amount2), parseInt(fee));

    window.location.reload(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="block-select">
        <select value={sourceChain} onChange={(e) => {setSourceChain(e.target.value)}}>
          {chains.map((chain, index) => <option value={index}>{chain.name}</option>)}
        </select>
        <input type="number" value={amount1} onChange={(e) => setAmount1(e.target.value)} placeholder="Amount" />
      </div>
      <div className="block-select">
        <select value={targetChain} onChange={(e) => {setTargetChain(e.target.value)}}>
          {chains.map((chain, index) => <option value={index}>{chain.name}</option>)}
        </select>
        <input type="number" value={amount2} onChange={(e) => setAmount2(e.target.value)} placeholder="Amount" />
      </div>
      {/* <div className="gas-bid">
        <label htmlFor={`bid-${user.id}`}>Gas Fee Bid:</label>
        <input type="number" id={`bid-${user.id}`} value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Enter bid" />
      </div> */}
      <button type="submit">Exchange</button>
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default function UserGrid({ users, chains, exchange }) {
  return <div className="user-grid">
    {users.map(user => (
      <div className="user-row">
        <div className="user-info">{user.name}</div>
        {chains.map(chain => (
          <div key={chain} className="balance-info">
            <span className="chain-name">{chain.name}</span>
            <span key={chain}>{user.getAccount(chain).getBalance() || 0}</span>
          </div>
        ))}
        <ExchangeForm user={user} chains={chains} exchange={exchange} />
      </div>
    ))}
  </div>;
}