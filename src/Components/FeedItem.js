import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { AvatarS } from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const FeedItem = ({ amount, user }) => {
  const tweet = `${
    user.displayName
  } has planted ${amount} trees throu %23carboin regenerating ${amount} %23bitcoin transactions! Try it now https://carboin.org`;
  const url = `/u/${user.id}`;
  return (
    <Card>
      <div className="header">
        <div className="left">
          <Link to={url}>
            <AvatarS src={user.avatar} size={50} />
          </Link>
          <div className="name">
            <Link to={url}>
              <h2 className="title-name">{user.displayName}</h2>
            </Link>
            <p className="has-text-weight-bold is-prumary has-text-primary">
              🌱 20
            </p>
          </div>
        </div>

        <div className="right">
          <a
            href={`https://twitter.com/intent/tweet?text=${tweet}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>

      <div className="body">
        <b>{user.displayName}</b> has planted {amount} 🌲 decarbonizing{" "}
        <b>{amount / 2}</b> transactions
      </div>
    </Card>
  );
};

export default FeedItem;
