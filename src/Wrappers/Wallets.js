import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";
import withFirestore from "react-redux-firebase/lib/withFirestore";
import Container from "Components/Container";
import WalletsComp from "Components/Wallets";
import CreateWallet from "Components/CreateWallet";

const Wallets = ({ wallets, firestore, auth: { uid } }) => {
  const deleteItem = async id => {
    var r = window.confirm("Are you sure?");
    if (r === true) {
      await firestore.delete(`users/${uid}/wallets/${id}`);
    }
  };
  return (
    <section className="section">
      <Container small>
        <CreateWallet />
        <WalletsComp wallets={wallets} onDelete={id => deleteItem(id)} />
      </Container>
    </section>
  );
};

export default compose(
  withFirestore,
  connect(({ firebase: { auth }, firestore }) => {
    return {
      wallets: firestore.ordered[`users/${auth.uid}/wallets`] || [],
      auth: auth
    };
  }),
  firestoreConnect(props => [{ collection: `users/${props.auth.uid}/wallets` }])
)(Wallets);
