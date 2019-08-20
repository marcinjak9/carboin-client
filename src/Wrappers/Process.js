import React, { useState } from "react";
import { compose } from "redux";
import styled from "styled-components";
import withFirestore from "react-redux-firebase/lib/withFirestore";
import Slider from "rc-slider";
import { connect } from "react-redux";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";
import "rc-slider/assets/index.css";
import { ReactComponent as Bitcoin } from "../images/bitcoin.svg";
import { ReactComponent as Forest } from "../images/forest.svg";
import { ReactComponent as Carbon } from "../images/carbon.svg";
import Container from "../Components/Container";

const MIN = 1;
const MAX = 100;

const Graphics = styled.div`
  margin-top: 4rem !important;
  margin-bottom: 4rem !important;
  svg {
    height: ${props => (props.size ? 100 + props.size / 2 + "px" : "150px")};
    width: ${props => (props.size ? 100 + props.size / 2 + "px" : "150px")};
  }
  h3 {
    font-weight: 700;
    margin-top: 1rem;
  }
  h4 {
    font-weight: 700;
  }
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  h3 {
    font-size: 2rem;
    margin: 0 1rem;
    font-weight: 700;
  }

  .button {
    font-weight: 700;
    height: 40px;
    width: 40px;
  }
`;

const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    height: 10px;
  }
  .rc-slider-track {
    height: 10px;
    background-color: #94c53e;
  }

  .rc-slider-step {
    height: 10px;
  }

  .rc-slider-handle {
    border: solid 5px #94c53e;
    width: 24px;
    height: 24px;
    margin-top: -7px;
    &:active,
    &:hover,
    &:focus {
      border-color: #94c53e;
      box-shadow: 0 0 0 5px #c3ea7d;
    }
  }
`;

const Recap = styled.div`
  padding: 2rem;
  background-color: #115757;
  color: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  h3 {
    font-weight: 700;
    color: #fff;
    font-size: 1.3rem;
  }
`;

const Process = ({ auth, firestore }) => {
  const [value, setValue] = useState(3);
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const modify = by => {
    if (value + by >= MIN && value + by <= MAX) {
      setValue(value + by);
    }
  };

  const getPaymentUrl = async () => {
    setLoading(true);
    const data = await fetch(
      "http://localhost:5001/carboin-e6b7d/us-central1/helloWorld",
      {
        method: "POST",
        headers: {
          "X-Api-Key": auth.stsTokenManager.accessToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: value * 2.8 })
      }
    );
    const json = await data.json();
    setLoading(false);
    setCode(json.data.code);
  };

  const createDonationBeta = async () => {
    setLoading(true);
    try {
      await firestore.add("feed", {
        amount: value,
        user: auth.uid,
        createdAt: new Date().toISOString()
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
          <button className="button is-primary" onClick={createDonationBeta}>
            Create Donation
          </button>
        </Recap>
      </Container>
    </section>
  );
};

export default compose(
  withFirestore,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Process);
