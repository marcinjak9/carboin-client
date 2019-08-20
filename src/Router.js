import React from "react";
import Route from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Wrappers/Home";
import Login from "./Wrappers/Login";
import SignUp from "./Wrappers/SignUp";
import Process from "./Wrappers/Process";
// import Wallets from './Components/Wallets';
// import Wallet from './Wrappers/Wallet';
import Profile from "./Wrappers/Profile";

const Router = () => {
  return (
    <div style={{ minHeight: "80vh" }}>
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/process" component={Process} />
      {/* <PrivateRoute path="/wallet" component={Wallets} />
      <PrivateRoute path="/wallet/:id" exact component={Wallet} />
      <PrivateRoute path="/wallet/:id/edit" exact component={Wallet} /> */}
      <PrivateRoute path="/profile" component={Profile} />
    </div>
  );
};

export default Router;
