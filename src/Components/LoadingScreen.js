import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    text-align: center;
    p {
      margin-top: 1rem;
      font-weight: 700;
    }
  }
`;

const LoadingScreen = () => {
  return (
    <Loading>
      <div className="inner">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#82277c" />
        <p>Getting ready to save the world 🌲</p>
      </div>
    </Loading>
  );
};

export default LoadingScreen;
