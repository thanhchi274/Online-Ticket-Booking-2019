import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "nav_content mobile"
    };
  }

  scrollToMovie = () => {
    window.scroll({
      top: 100,
      left: 0,
      behavior: "smooth"
    });
    this.setState({
      menu: "nav_content mobile"
    });
  };
  scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    this.setState({
      menu: "nav_content mobile"
    });
  };
  scrollToFooter = () => {
    window.scroll({
      top: 1400,
      left: 0,
      behavior: "smooth"
    });
    this.setState({
      menu: "nav_content mobile"
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
  handleClick = e => {
    e.target.classList.toggle("change");
    if (e.target.classList.value === "mobilecontainer change") {
      this.setState({
        menu: "nav_content mobile menu"
      });
    } else {
      this.setState({
        menu: "nav_content mobile"
      });
    }
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
        <li className=" nav-item">
          <Link className="nav-link" to="/info">
            {obj.hoTen}
          </Link>
        </li>
      );
    } else {
      return (
        <li className="nav-item">
          <NavLink
            activeClassName="active"
            className="mobileSignin_link"
            to="/login"
          >
            <h5 className="mobile_content">Đăng nhập</h5>
          </NavLink>
        </li>
      );
    }
  }
  logout = () => {
    localStorage.clear("token");
    localStorage.removeItem("UserInfo");
    this.setState({ navigate: true });
  };
  render() {
    const home = localStorage.getItem("UserHome");
    return (
      <nav className="mobile_header row align-items-center justify-content-between mobile">
        <div className="logo_mobile mobile col-3">
          <Link className="logo-img" onClick={this.scrollToTop} to="/">
            <img
              className="img-fluid "
              src="../logoMovies.png"
              alt="icons8-movie-ticket"
              border={0}
            />
          </Link>
        </div>
        <div className="container-mobileHeader col-2">
          <div className="mobilecontainer" onClick={this.handleClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>

          <div className={this.state.menu}>
            <ul className="navbar-nav">
              {this.renderHTML()}
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
                <Link className="nav-link" onClick={this.scrollToMovie} to="">
                  Movie
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.scrollToFooter} to="">
                  Subscribe
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  News
                </Link>
              </li>
              {home ? (
                <li className="nav-item">
                  <Link className="nav-link" onClick={this.logout} to="/">
                    Log out
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
