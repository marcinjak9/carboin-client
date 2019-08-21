import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Reset } from "styled-reset";
import { Provider } from "react-redux";
import ReactReduxFirebaseProvider from "react-redux-firebase/lib/ReactReduxFirebaseProvider";
import Home from "Wrappers/Home";
import Login from "Wrappers/Login";
import Navbar from "Components/Navbar";
import Wallet from "Wrappers/Wallet";
import Wallets from "Wrappers/Wallets";

import store, { rrfProps } from "store";
import Profile from "Wrappers/Profile";
import "styles/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "Components/Footer";
import SignUp from "Wrappers/SignUp";
import Process from "Wrappers/Process";
import Settings from "Wrappers/Settings";
import Logout from "Wrappers/Logout";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "Components/AuthUtilis";
import History from "Wrappers/History";
import Projects from "Wrappers/Projects";
import PublicProfile from "Wrappers/PublicProfile";
import Forgot from "./Wrappers/Forgot";
import Alerts from "./Components/Alerts";

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Reset />
        <Router>
          <Alerts />
          <Navbar />
          <div style={{ minHeight: "80vh" }}>
            <Route path="/" exact component={UserIsAuthenticated(Home)} />
            <Route path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route path="/forgot" component={UserIsNotAuthenticated(Forgot)} />
            <Route path="/signup" component={SignUp} />
            <Route path="/u/:id" component={PublicProfile} />
            <Route path="/logout" component={UserIsAuthenticated(Logout)} />
            <Route path="/process" component={UserIsAuthenticated(Process)} />
            <Route path="/history" component={UserIsAuthenticated(History)} />
            <Route path="/projects" component={UserIsAuthenticated(Projects)} />
            <Route path="/wallet" component={UserIsAuthenticated(Wallets)} />
            <Route
              path="/wallet/:id"
              exact
              component={UserIsAuthenticated(Wallet)}
            />
            <Route
              path="/wallet/:id/edit"
              exact
              component={UserIsAuthenticated(Wallet)}
            />
            <Route path="/profile" component={UserIsAuthenticated(Profile)} />
            <Route path="/settings" component={UserIsAuthenticated(Settings)} />
          </div>
          <Footer />
        </Router>
      </ReactReduxFirebaseProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
