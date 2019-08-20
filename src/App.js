import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Reset } from "styled-reset";
import { Provider } from "react-redux";
import ReactReduxFirebaseProvider from "react-redux-firebase/lib/ReactReduxFirebaseProvider";
import Home from "./Wrappers/Home";
import Login from "./Wrappers/Login";
import Navbar from "./Components/Navbar";
import Wallet from "./Wrappers/Wallet";
import Wallets from "./Wrappers/Wallets";
import PrivateRoute from "./Components/PrivateRoute";

import store, { rrfProps } from "./store";
import Profile from "./Wrappers/Profile";
import "./styles/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import SignUp from "./Wrappers/SignUp";
import Process from "./Wrappers/Process";
import Settings from "./Wrappers/Settings";
import Logout from "./Wrappers/Logout";

// export const firebase = new Firebase()

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Reset />
        {/* <Auth /> */}
        <Router>
          <Navbar />
          <div style={{ minHeight: "80vh" }}>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/logout" component={Logout} />
            <PrivateRoute path="/process" component={Process} />
            <PrivateRoute path="/wallet" component={Wallets} />
            <PrivateRoute path="/wallet/:id" exact component={Wallet} />
            <PrivateRoute path="/wallet/:id/edit" exact component={Wallet} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/settings" component={Settings} />
          </div>
          <Footer />
        </Router>
      </ReactReduxFirebaseProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
