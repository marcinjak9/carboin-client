import React from "react";
import Container from "../Components/Container";
import Transaction from "../Components/Transaction";
import WalletHead from "../Components/WalletHead";
import Modal from "../Components/Modal";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";
import withFirestore from "react-redux-firebase/lib/withFirestore";

function Wallet({
  wallet,
  transactions,
  history,
  match: {
    params: { id }
  },
  firestore: { update },
  auth
}) {
  const handleSelect = id =>
    update(`users/${auth.uid}/transactions/${id}`, { selected: true });

  if (!wallet) {
    return null;
  }

  return (
    <Modal
      title="Wallet Details"
      onCloseClick={() => history.push("/wallet")}
      onEditClick={() => history.push(`/wallet/${id}/edit`)}
      open
    >
      <Container style={{ marginBottom: 200 }}>
        <WalletHead transactions={transactions} address={wallet.address} />
        {transactions.map(t => (
          <Transaction
            key={t.id}
            id={t.id}
            date={t.time}
            // newTransaction={t.new}
            co2produced="280 kg"
            co2regenerated={t.regenerated}
            selected={t.selected}
            select={handleSelect}
          />
        ))}
      </Container>
    </Modal>
  );
}

const mapStateToProps = ({ firebase: { auth }, firestore }) => ({
  auth,
  f: firestore,
  wallet: firestore.data.wallet || null,
  transactions: firestore.ordered.transactions || []
});

const mapFirestore = ({
  match: {
    params: { id }
  },
  auth
}) => [
  // { collection: `users/${auth.uid}/wallets`, doc: id}
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "wallets", doc: id }],
    storeAs: "wallet"
  },
  {
    collection: `users/${auth.uid}/transactions`,
    where: [["walletId", "==", id]],
    storeAs: "transactions"
  }
];

export default compose(
  withFirestore,
  connect(mapStateToProps),
  firestoreConnect(mapFirestore)
)(Wallet);
