import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Card from './Card'

const WalletCard = styled(Card)`
  .address {
    margin-bottom: .5rem;
  }
  .progress {
    margin-top: .5rem;
  }
`

const SingleWallet = ({
  name, address
}) => {
  return (
    <WalletCard>
      <div className="header">
        <div className="left">
          <h2 className="title-name">{name}</h2>
        </div>
        <div className="right">
          actions
        </div>
      </div>
      <div className="body">
        <p className="address">
          <b className="has-text-weight-bold">Address:</b>
          <br />
          {address}
        </p>
        <p className="has-text-weight-bold">Decarbonization:</p>
        <progress
          className="progress is-primary"
          value="15"
          max="100"
        >15%</progress>
        <Link to={`/wallet/${address}`}>See</Link>
      </div>
    </WalletCard>
  )
}

export default SingleWallet
