import React from "react";
import { Link } from "react-router-dom";
import Card from "Components/Card";
import { AvatarS } from "Components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const FeedItem = ({ amount, user, createdAt }) => {
  if (!user) {
    return null;
  }
  const tweet = `${user.displayName} has planted ${amount} trees throu %23carboin regenerating ${amount} %23bitcoin transactions! Try it now https://carboin.org`;
  const url = `/u/${user.id}`;
  return (
    <Card>
      <div className="header">
        <div className="left">
          <Link to={url}>
            <AvatarS src={user.avatar} name={user.displayName} size={50} />
          </Link>
          <div className="name">
            <Link to={url}>
              <h2 className="title-name">{user.displayName}</h2>
            </Link>
            <p className="has-text-weight-bold is-prumary has-text-primary has-text-left">
              <span role="img" aria-label="leaf">
                🌱
              </span>{" "}
              {user.score || 0}
            </p>
          </div>
        </div>

        <div className="right">
          <div className="is-size-7 has-text-weight-bold">{createdAt}</div>

          <a
            href={`https://twitter.com/intent/tweet?text=${tweet}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ float: "right", marginTop: ".5rem" }}
            />
          </a>
        </div>
      </div>

      <div className="body">
        <b>{user.displayName}</b> has planted {amount} 🌲 offsetting{" "}
        <b>{amount / 2}</b> transactions
      </div>
    </Card>
  );
};

export default FeedItem;
