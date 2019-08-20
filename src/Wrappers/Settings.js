import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import Container from "../Components/Container";
import Input from "../Components/Input";
import { toast } from "react-toastify";

const Setting = ({ auth, firebase }) => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const updatePassword = async () => {
    if (!newPassword) {
      return setPasswordError(true);
    }
    try {
      console.log(auth.email);
      await firebase.login({ email: auth.email, password: oldPassword });
      const d = await firebase.auth().currentUser.updatePassword(newPassword);
      console.log(d);
      setPasswordError(false);
      toast("Password updated!");
    } catch (error) {
      console.log(error);
      setPasswordError(error.message);
    }
  };
  const updateEmail = async () => {
    if (!newEmail) {
      return setEmailError(true);
    }
    try {
      const d = await firebase.updateEmail(newEmail);
      console.log(d);
      setEmailError(false);
      toast("Email changed!");
    } catch (error) {
      console.log(error);
      setEmailError(error.message);
    }
  };

  return (
    <div className="section">
      <Container small paddingVertical="5rem" card>
        <h2 className="title">Security</h2>
        <div className="columns">
          <div className="column">
            <h2 className="subtitle">Change password</h2>
            <Input
              value={oldPassword}
              onChange={({ target: { value } }) => setOldPassword(value)}
              label="Old Password"
              type="password"
              placeholder="old super secret"
            />
            <Input
              value={newPassword}
              onChange={({ target: { value } }) => setNewPassword(value)}
              label="New password"
              type="password"
              placeholder="new super secret"
              error={passwordError}
            />
            <button
              className="button is-primary is-fullwidth"
              onClick={updatePassword}
            >
              Save Password
            </button>
          </div>
          <div className="column">
            <h2 className="subtitle">Change email</h2>
            <Input
              value={newEmail}
              onChange={({ target: { value } }) => setNewEmail(value)}
              label="New Email"
              type="email"
              placeholder="new awesome email"
              error={emailError}
            />
            <button
              className="button is-primary is-fullwidth"
              onClick={updateEmail}
            >
              Change email
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ firebase: { auth, profile } }) => ({
  auth,
  profile
});

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Setting);
