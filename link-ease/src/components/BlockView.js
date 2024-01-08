// BlockView.js
export default function BlockView ({ block }) {
  return <div className="block-view">
    <h3>Block {block.id}</h3>
    <p>Data: {block.data}</p>
    <p className="hash">Hash: {block.hash}</p>
    {/* Add more block details as needed */}
  </div>
}
