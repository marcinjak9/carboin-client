import React from "react";
import Card from "Components/Card";
import Avatar from "Components/Avatar";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";

const Leaderboard = ({ users }) => {
  const medal = index => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        break;
    }
  };
  return (
    <Card>
      <div className="body">
        <h2 className="title-name">Leaderboard</h2>
        <p>Coming soon</p>
        {users.map((u, i) => (
          <div key={u.id}>
            <Avatar src={u.avatar} name={u.displayName} size={60} />
            <span className="tag">
              {medal(i)}
              {u.score || 0}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default compose(
  connect(state => {
    return {
      users: state.firestore.ordered.leaders || []
    };
  }),
  firestoreConnect(() => [
    {
      collection: "profile",
      storeAs: "leaders",
      orderBy: ["score", "desc"],
      limit: 3
    }
  ])
)(Leaderboard);
