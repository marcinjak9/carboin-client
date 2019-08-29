import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Container from "Components/Container";
import Input from "Components/Input";
import { ReactComponent as Logo } from "images/LOGO_verde.svg";
import GoogleButton from "react-google-button";

const SignUp = ({ auth, firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error();
      }
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
          reminders: true,
          score: 0
        }
      );
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  const googleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      const r = await firebase.login({ provider: "google", type: "popup" });
      const p = r.additionalUserInfo.profile;
      const u = {
        email: p.email,
        displayName: p.name,
        avatar: p.picture,
        bio: "",
        publicProfile: true,
        newsletter: true,
        reminders: true,
        score: 0
      };
      await firebase.updateProfile(u);
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
          <h2 className="title has-text-centered">Signup now</h2>
          <h3 className="subtitle has-text-centered">
            Start offsetting your bitcoins
          </h3>
          <form onSubmit={e => e.preventDefault()}>
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
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={({ target: { value } }) => setConfirmPassword(value)}
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
