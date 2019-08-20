import React, { useEffect } from "react";
import withFirebase from "react-redux-firebase/lib/withFirebase";

const Logout = ({ firebase }) => {
  useEffect(() => {
    firebase.logout();
  }, []);
  return <div>Loggin out...</div>;
};

export default withFirebase(Logout);
