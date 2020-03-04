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
  scrollTo = (top,left)=>{
    window.scroll({
      top: top,
      left: left,
      behavior: "smooth"
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
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollTo);
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
                onClick={()=>this.scrollTo(0,0)}
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
                      onClick={()=>this.scrollTo(0,0)}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={()=>this.scrollTo(750,0)}
                      to=""
                    >
                      Movie
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={()=>this.scrollTo(1400,0)}
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
