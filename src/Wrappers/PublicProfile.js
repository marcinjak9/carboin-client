import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";
import Container from "Components/Container";
import { AvatarS } from "Components/Avatar";
import LoadingScreen from "Components/LoadingScreen";
import FeedItem from "Components/FeedItem";
import moment from "moment";

const PublicProfile = ({ user, feed }) => {
  if (!user) {
    return <LoadingScreen />;
  }
  return (
    <div className="section">
      <Container small card className="has-text-centered">
        <AvatarS src={user.avatar} size={100} name={user.displayName} />
        <h2 className="title has-text-centered">{user.displayName}</h2>
        <p>{user.bio || ""}</p>
        <div style={{ marginTop: "5rem" }}>
          {feed &&
            feed.map(f => (
              <FeedItem
                key={f.id}
                amount={f.amount}
                user={user}
                createdAt={moment(f.createdAt.toDate()).fromNow()}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ firestore }) => ({
  user: firestore.data.user,
  feed: firestore.ordered.feed
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
  },
  {
    collection: "feed",
    where: ["user", "==", id],
    orderBy: ["createdAt"]
  }
];

export default compose(
  // withFirestore,
  connect(mapStateToProps),
  firestoreConnect(mapFirestore)
)(PublicProfile);
