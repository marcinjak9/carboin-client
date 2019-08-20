import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import md5 from "md5";

export const AvatarS = styled.img`
  background-color: #fff;
  /* padding: 4px; */
  border: 2px solid #94c53e;
  width: ${props => (props.size ? `${props.size}px` : "28px")};
  color: rgb(97, 97, 97);
  height: ${props => (props.size ? `${props.size}px` : "28px")};
  font-size: 1rem;
  border-radius: 50%;
`;

const Avatar = ({ profile, size }) => {
  let url = "https://www.gravatar.com/avatar/";
  if (isLoaded(profile)) {
    if (profile.avatar) {
      url = profile.avatar;
    } else {
      url = `https://www.gravatar.com/avatar/${md5(profile.email || "")}`;
    }
  }
  return <AvatarS src={url} size={size} />;
};

const mapStateToProps = ({ firebase: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Avatar);
