import React, { useState, useEffect } from 'react'
import Container from '../Components/Container';
import Transaction from '../Components/Transaction';
import TotalDonaton from '../Components/TotalDonaton';
import WalletHead from '../Components/WalletHead';
// import { Api } from '../utils/request'
import Modal from '../Components/Modal';

const TRANSACTIONS = [
  {
    id: 'ksod64js6ss9fs0k2wowa5ssd5',
    date: '29/01/2019',
    new: true,
    regenerated: false,
    amount: 1,
    selected: false,
  },
  {
    id: 'asjdas7dsa8d9asd8d7as8ad8s9ad',
    date: '29/01/2019',
    new: false,
    regenerated: true,
    amount: 1,
    selected: false,
  },
  {
    id: 'sadasd7as9d9gd9sg09sgx8v8xc7',
    date: '29/01/2019',
    new: false,
    regenerated: true,
    amount: 1,
    selected: false,
  },
]



export default function Wallet({ match: { params: { id }}, history }) {
  const [transactions, /* setTransactions */] = useState(TRANSACTIONS)
  const [wallet, setWallet] = useState(null)
  useEffect(() => {
    // async function fetchData() {
    //   const wallet = await Api().getWallet(id)
    //   setWallet(wallet)
    // }
    // fetchData()
  }, [])
  
  // const handleSelect = (id) => {
  //   const newTransactions = transactions.map(t => {
  //     if (t.id === id) {
  //       t.selected = !t.selected
  //     }
  //     return t
  //   })
  //   setTransactions(newTransactions)
  // }

  return (
    <Modal
      title="Wallet Details"
      onCloseClick={() => history.push('/wallet')}
      onEditClick={() => history.push(`/wallet/${id}/edit`)}
    >
      <Container style={{ marginBottom: 200 }}>
        <WalletHead
          transactions={wallet ? wallet.transactions: []}
          address={wallet ? wallet.address : ''}
        />
          {wallet && wallet.transactions.map((t) => (
            <Transaction
              key={t.id}
              id={t.id}
              date={t.time}
              // newTransaction={t.new}
              co2produced="280 kg"
              co2regenerated={t.regenerated}
              // selected={t.selected}
              // select={handleSelect}
            />
          ))}
        <TotalDonaton transactions={transactions} />
      </Container>
    </Modal>
  );
}

// Post.getInitialProps = async () => {
// 	const res = await fetch(
// 		'https://api.github.com/repos/ooade/NextSimpleStarter'
// 	)
// 	const json = await res.json()
// 	return { stars: json.stargazers_count }
// }