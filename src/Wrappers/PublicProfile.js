import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";
import Container from "Components/Container";
import { AvatarS } from "Components/Avatar";
import LoadingScreen from "Components/LoadingScreen";

const PublicProfile = ({ user }) => {
  if (!user) {
    return <LoadingScreen />;
  }
  return (
    <div className="section">
      <Container small card className="has-text-centered">
        <AvatarS src={user.avatar} size={100} name={user.displayName} />
        <h2 className="title has-text-centered">{user.displayName}</h2>
        <p>{user.bio || ""}</p>
        <br />
        <br />
        <br />
        <p>Coming soon scoring</p>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ firestore }) => ({
  user: firestore.data.user
});

const mapFirestore = ({
  match: {
    params: { id }
  }
}) => [
  // { collection: `users/${auth.uid}/wallets`, doc: id}
  {
    collection: "profile",
    doc: id,
    storeAs: "user"
  }
];

export default compose(
  // withFirestore,
  connect(mapStateToProps),
  firestoreConnect(mapFirestore)
)(PublicProfile);
