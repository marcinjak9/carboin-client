import React from "react";
import styled from "styled-components";

const AvatarStyled = styled.img`
  background-color: #fff;
  /* padding: 4px; */
  border: 2px solid #94c53e;
  width: ${props => (props.size ? `${props.size}px` : "28px")};
  color: rgb(97, 97, 97);
  height: ${props => (props.size ? `${props.size}px` : "28px")};
  font-size: 1rem;
  border-radius: 50%;
`;

const Avatar = ({ src, size, name }) => {
  if (!src) {
    src = `https://api.adorable.io/avatars/285/${name || "carboin"}.png`;
  }
  return <AvatarStyled src={src} size={size} />;
};

export const AvatarS = Avatar;

export default Avatar;
