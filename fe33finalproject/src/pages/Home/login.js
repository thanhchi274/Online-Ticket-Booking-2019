import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import * as action from "../../redux/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: "input-div",
      input2: "input-div",
      taiKhoan: "",
      matKhau: ""
    };
  }
  handleClick = e => {
    e.target.name === "taiKhoan"
      ? this.setState({
          input1: "input-div focus"
        })
      : this.setState({
          input2: "input-div focus"
        });
  };
  handleBlur = e => {
    if (e.target.value === "") {
      e.target.name === "taiKhoan"
        ? this.setState({
            input1: "input-div"
          })
        : this.setState({
            input2: "input-div"
          });
    }
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  };
  renderHTML = () => {
    return (
      <div className="container login-container">
        <form onSubmit={this.handleSubmit}>
          <h3>đăng nhập</h3>
          <div
            className={this.state.input1}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
          >
            <div className="i">
              <FontAwesomeIcon icon={faUser} />
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
          <div
            className={this.state.input2}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
          >
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
              abcdfgh
            </div>
          </div>
          <button className="btn signin-btn">SIGN IN</button>
        </form>
        <h5 style={{ color: "white", textTransform: "uppercase" }}>Hoặc</h5>
        <Link className="btn signup-btn" to="/sign-up">
          SIGN UP
        </Link>
      </div>
    );
  };

  render() {
    return <div>{this.renderHTML()}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user, history) => {
      dispatch(action.actLoginHome(user, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
