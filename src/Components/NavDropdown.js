import React from "react";
import { Link } from "react-router-dom";

const NavDropdown = ({ name, dropdown }) => {
  return (
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
              <span className="navbar-item has-text-grey-light	" key={d.name}>
                {d.name} (comingsoon)
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default NavDropdown;
