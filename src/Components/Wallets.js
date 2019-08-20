import React from "react";
// import styled from 'styled-components'
import SingleWallet from "./SingleWallet";

const Wallets = ({ wallets, onDelete }) => {
  return (
    <div>
      {wallets.map(w => (
        <div key={w.id}>
          <SingleWallet
            address={w.address}
            name={w.name}
            id={w.id}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default Wallets;
