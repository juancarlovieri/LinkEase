// BlockchainView.js
import BlockchainView from './BlockchainView';
import Arrow from './Arrow';
import React from 'react';

export default function BlockchainCollection({chains}) {
  return (<div className="blockchainCollection">
    {chains.map((chain, index) => (
      <React.Fragment key={index}>
        <BlockchainView blocks={chain.blocks} name={chain.name} />
      </React.Fragment>
    ))}
  </div>);
};
