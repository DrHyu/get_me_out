import React from "react";
import { NavLink } from "react-router-dom";

const mainNavigation = (props) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      Get me OUT
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <div className="nav-item">
          <NavLink to="./" className="nav-link">
            To My House
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="./search" className="nav-link">
            To Your House
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);

export default mainNavigation;
