import React, { useState } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import withFirebase from "react-redux-firebase/lib/withFirebase";
import { ReactComponent as Logo } from "../images/LOGO_verde.svg";
import Avatar from "./Avatar";
import NavDropdown from "./NavDropdown";

const NavWrapper = styled.nav`
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #115757;
  display: flex;
  justify-content: center;

  .nav {
    width: 100%;
    padding: 20px;
    max-width: 960px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-section {
    flex: 1;
    display: flex;
    align-items: center;
    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }

    a {
      color: #fff;
      font-weight: 700;
      padding: 5px 10px;
      text-decoration: none;
      &.active {
        border-bottom: 2px solid #fff;
      }
    }
  }
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
  { name: "Sign out", to: "/logout" }
];

const Navigation = ({ location: { pathname }, firebase }) => {
  const [open, setOpen] = useState(false);

  const toggle = e => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
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
            {NAV.map(n => {
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
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <Avatar />
                </a>
                {/* <a className="navbar-link">More</a> */}

                <div className="navbar-dropdown is-right">
                  {NAV_AVATAR.map(n => (
                    <Link key={n.name} to={n.to} className="navbar-item">
                      {n.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/* <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
    // <NavWrapper>
    //   <div className="nav">
    //     <div className="nav-section left">
    //       {NAV.left.map(n => {
    //         if (n.to) {
    //           return (
    //             <Link
    //               key={n.name}
    //               to={n.to}
    //               className={pathname === n.to ? "active" : ""}
    //             >
    //               {n.name}
    //             </Link>
    //           );
    //         }
    //         if (n.dropdown) {
    //           return (
    //             <NavDropdown key={n.name} name={n.name} dropdown={n.dropdown} />
    //           );
    //         }
    //       })}
    //     </div>
    //     <div className="nav-section center">
    //       <Logo height={30} />
    //     </div>
    //     <div className="nav-section right">
    //       {/* <Link to="/profile">Profile</Link> */}
    //       {NAV.right.map(n => (
    //         <Link
    //           key={n.name}
    //           to={n.to}
    //           className={pathname === n.to ? "active" : ""}
    //         >
    //           {n.name}
    //         </Link>
    //       ))}
    //       <button className="button is-danger" onClick={firebase.logout}>
    //         Logout
    //       </button>
    //       <Avatar />
    //     </div>
    //   </div>
    // </NavWrapper>
  );
};

export default compose(
  withFirebase,
  withRouter
)(Navigation);
