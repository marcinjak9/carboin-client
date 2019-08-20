import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavDropdown = ({ name, dropdown }) => {
  const [open, setOpen] = useState(false);
  return (
    // <div className="navbar-item has-dropdown is-hoverable">
    //   <a className="navbar-link">More</a>

    //   <div className="navbar-dropdown">
    //     <a className="navbar-item">About</a>
    //     <a className="navbar-item">Jobs</a>
    //     <a className="navbar-item">Contact</a>
    //     <hr className="navbar-divider" />
    //     <a className="navbar-item">Report an issue</a>
    //   </div>
    // </div>
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">{name}</a>

      <div className="navbar-dropdown">
        {dropdown.map(d => {
          if (d.to) {
            return (
              <Link className="navbar-item" key={d.name} to={d.to}>
                {d.name}
              </Link>
            );
          }
          if (d.comingsoon) {
            return (
              <span className="navbar-item" key={d.name}>
                {d.name} (comingsoon)
              </span>
            );
          }
        })}
      </div>
    </div>
    // <div className={`dropdown ${open ? "is-active" : ""}`}>
    //   <div className="dropdown-trigger">
    //     <button
    //       className="button"
    //       aria-haspopup="true"
    //       aria-controls="dropdown-menu"
    //       onClick={() => setOpen(!open)}
    //     >
    //       <span>{name}</span>
    //       <span className="icon is-small">
    //         <i className="fas fa-angle-down" aria-hidden="true" />
    //       </span>
    //     </button>
    //   </div>
    //   <div className="dropdown-menu" id="dropdown-menu" role="menu">
    //     <div className="dropdown-content">
    //       {dropdown.map(d => {
    //         if (d.to) {
    //           return (
    //             <Link className="dropdown-item" key={d.name} to={d.to}>
    //               {d.name}
    //             </Link>
    //           );
    //         }
    //         if (d.comingsoon) {
    //           return (
    //             <span className="dropdown-item" key={d.name}>
    //               {d.name} (comingsoon)
    //             </span>
    //           );
    //         }
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
};

export default NavDropdown;
