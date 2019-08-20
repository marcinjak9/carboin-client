import React from "react";
import styled from "styled-components";
import Card from "Components/Card";

const CardStyled = styled(Card)`
  border: ${props => (props.selected ? "1px solid red" : "none")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .title {
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: grey;
      margin-bottom: 1rem;
    }
  }

  .impact {
    li {
      font-weight: 300;
      margin-bottom: 0.5rem;
      span {
        font-weight: 700;
        float: right;
      }
    }
  }

  .action {
    font-weight: 700;
    text-align: center;
    color: green;
    margin-top: 1rem;
  }
`;

const Transaction = ({
  id,
  date,
  // newTransaction,
  co2produced,
  co2regenerated,
  selected,
  select
}) => {
  return (
    <CardStyled selected={selected} onClick={() => select(id)}>
      <div className="header">
        <div className="left">
          <div className="name">
            <h3 className="title-name">Transaction {id.slice(0, 6)}...</h3>
            <p>{new Date(date).toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="body">
        <ul className="impact">
          <li>
            CO2 Produced: <span>{co2produced}</span>
          </li>
          <li>
            CO2 Regenerated: <span>{co2regenerated ? "280 kg" : "0 kg"}</span>
          </li>
          <li>
            Carbon cost: <span>{co2regenerated ? "0 $" : "2.8 $"}</span>
          </li>
        </ul>
        <div className="action">Click to add to decarbonization</div>
      </div>
    </CardStyled>
  );
};

export default Transaction;
