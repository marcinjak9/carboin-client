import React, { useState } from "react";
import { compose } from "redux";
import withFirestore from "react-redux-firebase/lib/withFirestore";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { connect } from "react-redux";
import classNames from "classnames";
// import CoinbaseCommerceButton from "react-coinbase-commerce";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";
import "rc-slider/assets/index.css";
import { ReactComponent as Bitcoin } from "images/bitcoin.svg";
import { ReactComponent as Forest } from "images/forest.svg";
import { ReactComponent as Carbon } from "images/carbon.svg";
import Container from "Components/Container";
import { Counter, Graphics, StyledSlider, Recap } from "./DecarbStyled";

const MIN = 1;
const MAX = 100;

const Process = ({ auth, firestore, firebase, profile }) => {
  const [value, setValue] = useState(3);
  // const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const modify = by => {
    if (value + by >= MIN && value + by <= MAX) {
      setValue(value + by);
    }
  };

  // const getPaymentUrl = async () => {
  //   setLoading(true);
  //   const data = await fetch(
  //     "http://localhost:5001/carboin-e6b7d/us-central1/helloWorld",
  //     {
  //       method: "POST",
  //       headers: {
  //         "X-Api-Key": auth.stsTokenManager.accessToken,
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ amount: value * 2.8 })
  //     }
  //   );
  //   const json = await data.json();
  //   setLoading(false);
  //   setCode(json.data.code);
  // };

  const createDonationBeta = async () => {
    setLoading(true);
    try {
      await firestore.add("feed", {
        amount: value,
        user: auth.uid,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
      const current = profile.score || 0;
      await firebase.updateProfile({
        score: current + value
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <section className="section">
      <Container small card>
        <h2 className="title">Decarbonize</h2>
        <h3 className="subtitle">
          Select the amount of transactions to decarbonize
        </h3>
        <Counter>
          <button
            className="button is-link is-rounded"
            onClick={() => modify(-1)}
          >
            -
          </button>
          <h3>{value}</h3>
          <button
            className="button is-link is-rounded"
            onClick={() => modify(1)}
          >
            +
          </button>
        </Counter>
        <StyledSlider
          min={MIN}
          max={MAX}
          value={value}
          onChange={e => setValue(e)}
        />
        <Graphics className="columns" size={value}>
          <div className="column has-text-centered	">
            <Forest />
            <h3 className="is-size-3">{value}</h3>
            <h4>Trees ready to plant</h4>
          </div>
          <div className="column has-text-centered">
            <Carbon />
            <h3 className="is-size-3">{value}</h3>
            <h4>CO2 regenerated</h4>
          </div>
          <div className="column has-text-centered">
            <Bitcoin />
            <h3 className="is-size-3">{value}</h3>
            <h4>Transactions cleared</h4>
          </div>
        </Graphics>
        <Recap>
          <div>
            <h3>Your offset value is {Math.floor(value * 2.8)} $</h3>
            <p>Make the donation and show the community!</p>
          </div>
          {/* {!code ? (
            <button
              className={`button is-primary ${loading ? "is-loading" : ""}`}
              onClick={getPaymentUrl}
            >
              Create Charge
            </button>
          ) : (
            <CoinbaseCommerceButton
              className="button is-primary"
              chargeId={code}
            />
          )} */}
          <button
            className={classNames("button is-primary", {
              "is-loading": loading
            })}
            onClick={createDonationBeta}
          >
            Create Donation
          </button>
        </Recap>
      </Container>
    </section>
  );
};

export default compose(
  withFirebase,
  withFirestore,
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(Process);
