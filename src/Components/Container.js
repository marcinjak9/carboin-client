import React from "react";
import classNames from "classnames";
import styled, { css } from "styled-components";

const card = css`
  padding: 2rem;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  max-width: 700px;
`;

const C = styled.div`
  max-width: ${props => (props.small ? "600px" : "")} !important;
  padding: ${props =>
    props.paddingVertical ? `${props.paddingVertical} 0` : "0"};

  ${props => (props.card ? card : "")}
`;

const Container = props => (
  <C
    className={classNames("container", props.className)}
    small={props.small}
    paddingVertical={props.paddingVertical}
    card={props.card}
  >
    {props.children}
  </C>
);

export default Container;
