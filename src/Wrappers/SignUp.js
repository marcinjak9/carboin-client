import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Container from "../Components/Container";
import Input from "../Components/Input";
import { ReactComponent as Logo } from "../images/LOGO_verde.svg";

const SignUp = ({ auth, firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      await firebase.createUser(
        {
          email,
          password
        },
        {
          email,
          displayName: name,
          avatar: "",
          bio: "",
          publicProfile: true,
          newsletter: true,
          reminders: true
        }
      );
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  if (!isLoaded(auth)) {
    return <span>Loading...</span>;
  }
  if (isEmpty(auth)) {
    return (
      <div className="section">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Logo width={150} />
        </div>
        <Container small card>
          <h2 className="title">Signup now</h2>
          <Input
            label="Name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            type="text"
            placeholder="Name"
            error={error ? "something went wrong" : false}
          />
          <Input
            label="Email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            type="email"
            placeholder="Email"
            error={error ? "something went wrong" : false}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            error={error ? "something went wrong" : false}
          />

          <button
            className={classNames("button is-primary is-fullwidth", {
              "is-loading": loading
            })}
            onClick={submit}
          >
            Sign Up
          </button>
          <div className="has-text-centered" style={{ marginTop: "2rem" }}>
            <Link to="/login">Already have an account?</Link>
          </div>
        </Container>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(SignUp);
