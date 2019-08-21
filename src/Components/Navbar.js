import React, { useState } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Link, withRouter } from "react-router-dom";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { ReactComponent as Logo } from "images/LOGO_verde.svg";
import Avatar from "Components/Avatar";
import NavDropdown from "Components/NavDropdown";

const NavWrapper = styled.nav`
  font-weight: 700;
`;

const NAV = [
  { name: "Feed", to: "/" },
  // { name: 'Wallets', to: '/wallet' },
  {
    name: "Decarbonize",
    dropdown: [
      { name: "with Wallet", comingsoon: true },
      { name: "with Api", comingsoon: true },
      { name: "Custom", to: "/process/custom" }
    ]
  },
  { name: "History", to: "/history" },
  { name: "Projects", to: "/projects" }
];

const NAV_AVATAR = [
  { name: "Profile", to: "/profile" },
  { name: "Settings", to: "/settings" },
  { name: "Contact us", to: "/contact" },
  { name: "Feedback", to: "/feedback" },
  { name: "Sign out", action: "logout" }
];

const Navigation = ({ auth, profile, firebase }) => {
  const [open, setOpen] = useState(false);

  const toggle = e => {
    e.preventDefault();
    setOpen(!open);
  };

  const logout = e => {
    e.preventDefault();
    firebase.logout();
  };

  const isLogged = isLoaded(auth) && !isEmpty(auth);
  return (
    <NavWrapper
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <Logo width="55" />
          </Link>

          <a
            className={`navbar-burger burger ${open ? "is-active" : ""}`}
            aria-label="menu"
            onClick={toggle}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div className={`navbar-menu ${open ? "is-active" : ""}`}>
          <div className="navbar-start">
            {isLogged &&
              NAV.map(n => {
                if (n.to) {
                  return (
                    <Link key={n.name} to={n.to} className="navbar-item">
                      {n.name}
                    </Link>
                  );
                }
                if (n.dropdown) {
                  return (
                    <NavDropdown
                      key={n.name}
                      name={n.name}
                      dropdown={n.dropdown}
                    />
                  );
                }
              })}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isLogged ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    <Avatar src={profile ? profile.avatar : null} />
                  </a>

                  <div className="navbar-dropdown is-right">
                    {NAV_AVATAR.map(n => {
                      if (n.to) {
                        return (
                          <Link key={n.name} to={n.to} className="navbar-item">
                            {n.name}
                          </Link>
                        );
                      }
                      if (n.action === "logout") {
                        return (
                          <a href="#" onClick={logout} className="navbar-item">
                            Logout
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
              ) : (
                <div className="buttons">
                  <Link className="button is-primary" to="/signup">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-light" to="/login">
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
};

export default compose(
  withFirebase,
  withRouter,
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(Navigation);
