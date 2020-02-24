import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import * as action from "../../redux/action";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SVGAdminLogin from "../../Components/userLoginImage";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        taiKhoan: "",
        matKhau: ""
      },
      errors: {
        taiKhoan: "",
        matKhau: ""
      },
      input1: "input-div",
      input2: "input-div",
      taiKhoan: "",
      matKhau: "",
      formvalid: false,
      tkValid: false,
      mkValid: false
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
    let { name, value } = e.target;
    let message =
      value === ""
        ? (name === "taiKhoan" ? "Tài khoản" : "Mật khẩu") + " không được rỗng"
        : "";

    let { tkValid, mkValid } = this.state;
    switch (name) {
      case "taiKhoan":
        tkValid = message ? false : true;
        if (value && value.length < 4) {
          tkValid = false;
          message = "Độ dài chuỗi phải lớn hơn 4";
        }
        break;
      case "matKhau":
        mkValid = message ? false : true;
        break;
      default:
        message = "Invalid";
        break;
    }

    this.setState({
      errors: { ...this.state.errors, [name]: message },
      tkValid,
      mkValid
    });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
    let message = value === null;
    let { tkValid, mkValid } = this.state;
    switch (name) {
      case "taiKhoan":
        tkValid = message ? false : true;
        // kiểm tra ký tự
        if (value && value.length < 4) {
          tkValid = false;
          message = "Độ dài chuỗi phải lớn hơn 4";
        }
        break;
      case "matKhau":
        mkValid = message ? false : true;
        break;
      default:
        message = "Invalid";
        break;
    }
    this.setState(
      {
        //   Copy lại values trên state và thay đổi [name]: value
        values: { ...this.state.values, [name]: value },
        errors: { ...this.state.errors, [name]: message },
        tkValid,
        mkValid
      },
      () => {
        this.handleFormValid();
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  handleFormValid = () => {
    this.setState({
      formvalid: this.state.tkValid && this.state.mkValid
    });
  };
  renderHTML = () => {
    return (
      <div className="container login-container d-flex">
        <SVGAdminLogin />
        <form onSubmit={this.handleSubmit}>
          <h3>Chào Mừng Bạn</h3>
          <div
            className={this.state.input1}
            onFocus={this.handleClick}
            onBlur={this.handleBlur}
          >
            <div className="i">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="input-user">
              <h5>UserName</h5>
              <input
                type="text"
                className="input"
                name="taiKhoan"
                onChange={this.handleChange}
              />
            </div>
          </div>
          {this.state.errors.taiKhoan ? (
            <div className="warning-text" style={{ color: "red" }}>
              {this.state.errors.taiKhoan}
            </div>
          ) : (
            ""
          )}
          <div
            className={this.state.input2}
            onFocus={this.handleClick}
            onBlur={this.handleBlur}
          >
            <div className="i">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div>
              <h5>Password</h5>
              <input
                className="input"
                type="password"
                name="matKhau"
                onChange={this.handleChange}
              />
            </div>
          </div>
          {this.state.errors.matKhau ? (
            <div className="warning-text" style={{ color: "red" }}>
              {this.state.errors.matKhau}
            </div>
          ) : (
            ""
          )}
          <div className="btnAction d-flex">
            <button
              className="btn signin-btn mb-3"
              disabled={!this.state.formvalid}
            >
              SIGN IN
            </button>
            <Link className="btn signup-btn" to="/sign-up">
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    );
  };

  render() {
    if (localStorage.getItem("UserHome")) {
      return <Redirect to="/" />;
    }
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
