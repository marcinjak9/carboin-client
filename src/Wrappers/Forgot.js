import React, { useState } from "react";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import Container from "Components/Container";
import Input from "Components/Input";
import { toast } from "react-toastify";

const Forgot = ({ firebase, history }) => {
  const [email, setEmail] = useState("");
  const resetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      toast.success(`Your reset password was sent to ${email}!`);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="section has-text-centered">
      <Container small card>
        <h2 className="title">Forgot password</h2>
        <p>
          If you have forgot your password type your email click the button
          below to receive an email to reset it
        </p>
        <Input
          label="Email address"
          placeholder="foo@bar.com"
          onChange={({ target: { value } }) => setEmail(value)}
          value={email}
        />
        <button className="button is-primary" onClick={resetPassword}>
          Reset
        </button>
      </Container>
    </section>
  );
};

export default withFirebase(Forgot);
