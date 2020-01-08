import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPhone,
  faEnvelope,
  faIdCard,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as action from "../../redux/action";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      email: "",
      maNhom: ""
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signup(this.state, this.props.history);
  };
  renderHTML = () => {
    return (
      <div className="container login-container">
        <form onSubmit={this.handleSubmit}>
          <h3>sign up</h3>
          <div className="input-div signup">
            <div className="i">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="input-user">
              <h5>username</h5>
              <input
                type="text"
                className="input"
                name="taiKhoan"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="input-div signup">
            <div className="i">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div>
              <h5>password</h5>
              <input
                className="input"
                type="password"
                name="matKhau"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="input-div signup">
            <div className="i">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="input-user">
              <h5>fullname</h5>
              <input
                type="text"
                className="input"
                name="hoTen"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="input-div signup">
            <div className="i">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="input-user">
              <h5>phone</h5>
              <input
                type="text"
                className="input"
                name="soDT"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="input-div signup">
            <div className="i">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="input-user">
              <h5>email</h5>
              <input
                type="text"
                className="input"
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="input-div signup">
            <div className="i">
              <FontAwesomeIcon icon={faIdCard} />
            </div>
            <div className="input-user">
              <h5>groupid</h5>
              <input
                type="text"
                className="input"
                name="maNhom"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button className="btn signup-btn">SIGN UP</button>
        </form>
        ;
      </div>
    );
  };

  render() {
    return <div>{this.renderHTML()}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (user, history) => {
      dispatch(action.actSignupHome(user, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(Signup);
