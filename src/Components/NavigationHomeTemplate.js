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
      top: 750,
      left: 0,
      behavior: "smooth"
    });
  };
  scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  scrollToFooter = () => {
    window.scroll({
      top: 1400,
      left: 0,
      behavior: "smooth"
    });
  };
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
    localStorage.removeItem("UserInfo");
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
        <ul className="navbar-nav">
          <li className=" nav-item nav-drop">
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle logined_button"
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
        <NavLink
          activeClassName="active"
          className="signin_link row align-items-center"
          to="/login"
        >
          <div className="userIcon desktop">
            <FontAwesomeIcon className="login_icon" icon={faUser} />
          </div>
          {/*<h5 className="signin_content">Đăng nhập</h5>*/}
        </NavLink>
      );
    }
  }
  render() {
    return (
      <>
        <nav className="navbar-expand-md justify-content-between desktop">
          <div
            className={
              !this.state.visible
                ? " header navbar"
                : "header navbar--hidden-main row"
            }
          >
            <div className="logo">
              <Link
                className="logo-title d-flex align-items-center"
                onClick={this.scrollToTop}
                to="/"
              >
                <img
                  className="img-fluid "
                  src="../logoMovies.png"
                  alt="icons8-movie-ticket"
                  border={0}
                  width="50%"
                />
              </Link>
            </div>

            <div className="col-sm-7 nav-menu ">
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
                      onClick={this.scrollToTop}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={this.scrollToMovie}
                      to=""
                    >
                      Movie
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={this.scrollToFooter}
                      to=""
                    >
                      Subscribe
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      News
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {this.renderHTML()}
          </div>
        </nav>
      </>
    );
  }
}
