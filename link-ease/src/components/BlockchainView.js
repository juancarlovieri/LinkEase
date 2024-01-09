// BlockchainView.js
import BlockView from './BlockView';
import Arrow from './Arrow';
import React from 'react';

export default function BlockchainView({blocks, name}) {
  return (<div className="blockchainView">
    <h2 className="chainTitle">{name}</h2>
    {blocks.map((block, index) => (
      <React.Fragment key={block.id}>
        <BlockView block={block} />
        {index < blocks.length - 1 && <Arrow />}
      </React.Fragment>
    ))}
  </div>);
};
