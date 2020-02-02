import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      visibleNavBar: true
    };
  }
  
  scrollToMovie = () => {
    window.scroll({
      top: 970, 
      left: 0, 
      behavior: 'smooth'
    });
  };
  scrollToTop=()=>{
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos <= currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  logout = () => {
    localStorage.clear("token");
    this.setState({ navigate: true });
  };

  renderHTML() {
    const innerHTML = localStorage.getItem("UserHome");
    const obj = JSON.parse(innerHTML);
    const { navigate } = this.state;
    if (navigate) {
      return window.location.reload();
    }
    if (localStorage.getItem("UserHome")) {
      return (
        <ul className="navbar-nav ">
          <li className=" nav-item nav-link">
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                <FontAwesomeIcon className="user_icon" icon={faUser} />
                {obj.hoTen}
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/info">
                  Information
                </Link>
                <Link
                  data-toggle="modal"
                  data-target="#myModal"
                  className="dropdown-item"
                  onClick={this.logout}
                  to="/"
                >
                  Log out
                </Link>
              </div>
            </div>
          </li>
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
        <nav className="navbar-expand-md">
          <div
            className={
              !this.state.visible
                ? " header navbar"
                : "header navbar--hidden row"
            }
          >
            <div className="col-sm-4  ">
              <Link className="logo-title d-flex" onClick={this.scrollToTop} to="/">
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
              <div
                className="collapse navbar-collapse d-flex justify-content-center"
                id="collapsibleNavbar"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
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
                    <Link
                      activeClassName="active"
                      className="nav-link"
                      onClick={this.scrollToMovie}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      Movie
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-3 d-flex justify-content-center nav-logout">
              {this.renderHTML()}
            </div>
          </div>
          {/* Toggler/collapsibe Button */}
        </nav>
      </>
    );
  }
}
