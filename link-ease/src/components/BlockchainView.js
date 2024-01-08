// BlockchainView.js
import BlockView from './BlockView';
import Arrow from './Arrow';
import React from 'react';

export default function BlockchainView({blocks}) {
  return (<div className="blockchainView">
    {blocks.map((block, index) => (
      <React.Fragment key={block.id}>
        <BlockView block={block} />
        {index < blocks.length - 1 && <Arrow />}
      </React.Fragment>
    ))}
  </div>);
};
