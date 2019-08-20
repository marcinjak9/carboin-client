import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "Components/Card";

const WalletCard = styled(Card)`
  .address {
    margin-bottom: 0.5rem;
  }
  .progress {
    margin-top: 0.5rem;
  }
`;

const SingleWallet = ({ name, address, id, onDelete }) => {
  return (
    <WalletCard>
      <div className="header">
        <div className="left">
          <h2 className="title-name">{name}</h2>
        </div>
        <div className="right">
          <button className="button is-danger" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
      <div className="body">
        <p className="address">
          <b className="has-text-weight-bold">Address:</b>
          <br />
          {address}
        </p>
        <p className="has-text-weight-bold">Decarbonization:</p>
        <progress className="progress is-primary" value="15" max="100">
          15%
        </progress>
        <Link to={`/wallet/${id}`}>See</Link>
      </div>
    </WalletCard>
  );
};

export default SingleWallet;
