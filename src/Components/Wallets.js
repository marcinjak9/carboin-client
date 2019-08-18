import React from 'react'
// import styled from 'styled-components'
import SingleWallet from './SingleWallet';


const Wallets = ({ wallets }) => {
  return (
    <div>
      {wallets.map(w => (
        <div key={w.id}>
          <SingleWallet address={w.address} name={w.name} />
        </div>
      ))}
    </div>
  )
}

export default Wallets
