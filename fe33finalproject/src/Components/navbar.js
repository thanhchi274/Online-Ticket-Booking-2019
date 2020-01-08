import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class Navbar extends Component {
  renderHTML() {
    console.log("abc");
    const innerHTML = localStorage.getItem("UserHome");
    const obj = JSON.parse(innerHTML);
    if (localStorage.getItem("UserHome")) {
      return(
        <ul className ="navbar-nav">
          <li className=" nav-item nav-link logined">Welcome {obj.hoTen}</li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/log-up"
            >
              Sign Out
            </NavLink>
          </li> 
        </ul>
      )
    } 
    else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            {/* Nối tới page khác */}
            <NavLink activeClassName="active" className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/sign-up"
            >
              SignUp
            </NavLink>
          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        {/* Brand */}
        <div className="container">
          <div className="col-sm-4  ">
            <div className=" d-flex">
              <img
                className="img-fluid mx-2"
                src="https://i.ibb.co/MMDksvw/icons8-movie-ticket.png"
                alt="icons8-movie-ticket"
                border={0}
                width={50}
                height={100}
              />
              <p className="logo-name">MOVIE THEATER</p>
            </div>
          </div>

          <div className="col-sm-4">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Navbar links */}
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  {/* Nối tới page khác */}
                  <NavLink
                    activeClassName="active"
                    exact
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/list-movie"
                  >
                    Movie
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/theater-movie"
                  >
                    Theater
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4">{this.renderHTML()}</div>
        </div>
        {/* Toggler/collapsibe Button */}
      </nav>
    );
  }
}
