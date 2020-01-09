import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import ModalSanPham from "../HOC/Modal-SignOut";
import WithModal from "./../HOC/with-modal.js";
import UserLogo from "./userLoginImage"
export default class Navbar extends Component {
  renderHTML() {
    const innerHTML = localStorage.getItem("UserHome");
    const obj = JSON.parse(innerHTML);
    const FormsModal = WithModal(ModalSanPham);
    if (localStorage.getItem("UserHome")) {
      return (
        <ul className="navbar-nav ">
          <li className=" nav-item nav-link logined">
          <div className ="nav-user-login"> 
          <UserLogo /> 
          <p>
          {obj.hoTen}
          </p>
          </div>
          <Link
            data-toggle="modal"
            data-target="#myModal"
            className=" btn-SignOut"
            to="/"
          >
            Log out
          </Link>
          </li>
          <FormsModal />
          {/*<li className="nav-item">
            <button
              activeClassName="active"
              className="nav-link btn-SignOut"
              data-toggle="modal"
              data-target="#myModal"
            >
              Sign Out
            </button>
            <FormsModal />
      </li>*/}
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <NavLink activeClassName="active" className="btn-login" to="/login">
            Login
          </NavLink>
        </ul>
      );
    }
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="header navbar">
            <div className="col-sm-4  ">
              <Link className="logo-title d-flex" to="/">
                <img
                  className="img-fluid mx-4"
                  src="https://i.ibb.co/MMDksvw/icons8-movie-ticket.png"
                  alt="icons8-movie-ticket"
                  border={0}
                  width={50}
                  height={100}
                />
                <p className="logo-name">MOVIE THEATER</p>
              </Link>
            </div>

            <div className="col-sm-4 nav-menu ">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <span className="navbar-toggler-icon" />
              </button>
              {/* Navbar links */}
              <div className="collapse navbar-collapse d-flex justify-content-center" id="collapsibleNavbar">
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
                </ul>
              </div>
            </div>

            <div className="col-sm-3 d-flex justify-content-center nav-logout">{this.renderHTML()}</div>
          </div>
          {/* Toggler/collapsibe Button */}
        </nav>
      </>
    );
  }
}
