import React, { Component } from 'react'
// import SearchBar from "../../Components/Admin/Search"
import UserNavBar from "../../Components/Admin/UserInformation"

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          navigate: false,
          visibleNavBar: true
        };
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
        window.removeEventListener("scroll", this.handleScroll);
      }
    render() {
        return (
            <>
            <nav id="collapsibleNavbar" 
             className={
              !this.state.visible
                ? " navbar-expand row navbar-light bg-white topbar  shadow"
                : " navbar--hidden row navbar-light bg-white topbar  shadow"
            }
            >
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars" />
          </button>
          {/* <SearchBar /> */}
          <UserNavBar />
        </nav>
        </>
        )
    }
}
