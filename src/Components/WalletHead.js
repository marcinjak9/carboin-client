import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  .tags {
    margin: 0 0.5rem;
  }
  margin-bottom: 1rem;
`;

const getPercentage = transactions => {
  let i = 0;
  transactions.forEach(t => {
    if (t.regenerated) {
      i += 1;
    }
  });
  return Math.floor((100 / transactions.length) * i);
};

const getDc = transactions => {
  let i = 0;
  transactions.forEach(t => {
    if (t.regenerated) {
      i += 1;
    }
  });
  return i * 288;
};

const WalletHead = ({ transactions, address }) => {
  const perc = getPercentage(transactions);
  const cf = Math.floor(transactions.length * 288);
  const da = getDc(transactions);

  return (
    <div>
      <Title>Wallet: {address}</Title>
      <progress className="progress is-primary" value={perc} max="100">
        {perc}%
      </progress>
      <Tags>
        <div className="tags has-addons">
          <span className="tag">Carbon footprint</span>
          <span className="tag is-primary">{cf} kg</span>
        </div>
        <div className="tags has-addons">
          <span className="tag">Decarbonized amount</span>
          <span className="tag is-primary">{da} kg</span>
        </div>
        <div className="tags has-addons">
          <span className="tag">Total Transactions</span>
          <span className="tag is-primary">{transactions.length}</span>
        </div>
        <div className="tags has-addons">
          <span className="tag">Decarbonized transactions</span>
          <span className="tag is-primary">
            {transactions.filter(t => t.regenerated).length}
          </span>
        </div>
      </Tags>
      <Title>Transactions:</Title>
    </div>
  );
};

export default WalletHead;
