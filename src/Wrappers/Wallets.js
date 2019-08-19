import React, { useState, useEffect } from 'react'
import Container from '../Components/Container'
import WalletsComp from '../Components/Wallets';
// import { Api } from '../utils/request'

const Wallets = () => {
  const [wallets, setWallets] = useState([])
  useEffect(() => {
    // async function fetchWallets() {
    //   const w = await Api().getWallets()
    //   setWallets(w)
    // }
    // fetchWallets()
  }, wallets.length)

  return (
    <section className="section">
      <Container small>
        <WalletsComp wallets={wallets} />
      </Container>
    </section>
  )
}

export default Wallets
