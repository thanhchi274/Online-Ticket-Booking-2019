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
      errors: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        email: ""
      },
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      email: "",
      tkValid: false,
      mkValid: false,
      tenValid: false,
      dtValid: false,
      emailValid: false
    };
  }

  handleBlur = e => {
    let { name, value } = e.target;
    let { tkValid, mkValid, tenValid, dtValid, emailValid } = this.state;
    let message = value === "";
    switch (name) {
      case "taiKhoan":
        message = value === "" ? "Tài khoản không được rỗng" : "";
        tkValid = message ? false : true;
        if (value && value.length < 4) {
          tkValid = false;
          message = "Độ dài chuỗi phải có it nhất 4 kí tự";
        }
        break;
      case "matKhau":
        message = value === "" ? "Mật khẩu không được rỗng" : "";
        break;
      case "hoTen":
        message = value === "" ? "Họ tên không được rỗng" : "";
        tenValid = message ? false : true;
        if (value && value.length < 4) {
          tenValid = false;
          message = "Độ dài chuỗi phải có it nhất 4 kí tự";
        }
        break;
      case "soDT":
        message = value === "" ? "Số điện thoại không được rỗng" : "";
        dtValid = message ? false : true;
        if (value && value.length < 11) {
          dtValid = false;
          message = "Độ dài số điện thoại phải có it nhất 10 kí tự";
        }
        break;
      case "email":
        message = value === "" ? "email không được rỗng" : "";
        emailValid = message ? false : true;
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          emailValid = false;
          message = "Vui lòng điền đúng định dạng email";
        }
        break;
      default:
        message = "not valid";
        break;
    }
    this.setState({
      errors: { ...this.state.errors, [name]: message },
      tkValid,
      mkValid,
      tenValid,
      dtValid,
      emailValid
    });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let user = { ...this.state };
    user.maNhom = "GP01";
    user.maLoaiNguoiDung = "KhachHang";
    this.props.signup(user, this.props.history);
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
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          {this.state.errors.taiKhoan ? (
            <div style={{ color: "red" }}>{this.state.errors.taiKhoan}</div>
          ) : (
            ""
          )}
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
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          {this.state.errors.matKhau ? (
            <div style={{ color: "red" }}>{this.state.errors.matKhau}</div>
          ) : (
            ""
          )}
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
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          {this.state.errors.hoTen ? (
            <div style={{ color: "red" }}>{this.state.errors.hoTen}</div>
          ) : (
            ""
          )}
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
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          {this.state.errors.soDT ? (
            <div style={{ color: "red" }}>{this.state.errors.soDT}</div>
          ) : (
            ""
          )}
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
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          {this.state.errors.email ? (
            <div style={{ color: "red" }}>{this.state.errors.email}</div>
          ) : (
            ""
          )}
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
