import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { compose } from "redux";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { isLoaded, isEmpty } from "react-redux-firebase";
import GoogleButton from "react-google-button"; // optional
import classNames from "classnames";
import Container from "Components/Container";
import Input from "Components/Input";

import { ReactComponent as Logo } from "images/LOGO_verde.svg";

const Login = props => {
  const { auth, firebase } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await firebase.login({ email, password });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      await firebase.login({ provider: "google", type: "popup" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

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
          <h2 className="title">Login</h2>
          <form>
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
            <Link to="/forgot">Forgot your password?</Link>

            <button
              className={classNames("button is-primary is-fullwidth", {
                "is-loading": loading
              })}
              style={{ marginTop: "1rem" }}
              onClick={submit}
            >
              Login
            </button>
            <div
              className="has-text-centered"
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <GoogleButton onClick={googleLogin} />
            </div>
          </form>
          <div className="has-text-centered" style={{ marginTop: "2rem" }}>
            <Link to="/signup">Don{"'"}t have an account?</Link>
          </div>
        </Container>
      </div>
    );
  }
  return <Redirect to="/" />;
};

const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Login);
