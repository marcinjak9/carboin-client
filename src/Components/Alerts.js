import React, { useState } from "react";
import { compose } from "redux";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import styled from "styled-components";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  color: #fff;
`;

const Alerts = ({ auth, firebase }) => {
  const [sent, setSent] = useState(false);
  const send = async () => {
    try {
      await firebase.auth().currentUser.sendEmailVerification();
      toast.success("Email successefully sent");
      setSent(true);
    } catch (error) {
      toast.success("Error sending email");
    }
  };

  return (
    <Wrapper className="has-background-danger has-text-centered">
      Currently carboin is only a preview app, you can register and try it, and
      if you want provide a{" "}
      <a
        className="has-text-white has-text-bold"
        style={{ fontWeight: "bold" }}
        href="mailto:carboinapp@gmail.com"
      >
        feedback
      </a>
      !
    </Wrapper>
  );

  if (sent) {
    return null;
  }

  if (!isLoaded(auth) || isEmpty(auth)) {
    return null;
  }
  if (!auth.emailVerified) {
    return (
      <Wrapper className="has-background-danger has-text-centered">
        For security reasons you need to verify your email, check your inbox or{" "}
        <button className="button is-small" onClick={send}>
          Send it again
        </button>
      </Wrapper>
    );
  }
  return null;
};
const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Alerts);
