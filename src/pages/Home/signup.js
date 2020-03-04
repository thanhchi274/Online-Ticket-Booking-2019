import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPhone,
  faEnvelope,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as action from "../../Store/action";


const SignUpImage = (props) => (
    <div className="signup-img col-sm-5">
            <img alt="hinhAnh123" src="https://cdn.jotfor.ms/images/podo-login-signup.png" />
            <p>{props.noti}</p>
          </div>
);



const FormSignUp = (props) => (
    <form onSubmit={props.handleSubmit}>
              <div className="row"></div>
              <div className="input-div signup">
                <div className="i">
                  <FontAwesomeIcon icon={faGlobe} />
                </div>
                <div className="input-user">
                  <input type="text" className="input" name="taiKhoan" placeholder="Nhập UserName" onChange={props.handleChange} onBlur={props.handleBlur} />
                </div>
              </div>
              <div className="input-div signup">
                <div className="i ">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div>
                  <input className="input" type="password" name="matKhau" placeholder="Nhập Mật Khẩu" onChange={props.handleChange} onBlur={props.handleBlur} />
                </div>
              </div>
              <div className="input-div signup">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="input-user">
                  <input type="text" className="input" name="hoTen" placeholder="Nhập đầy đủ họ tên" onChange={props.handleChange} onBlur={props.handleBlur} />
                </div>
              </div>
              <div className="input-div signup">
                <div className="i">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="input-user">
                  <input type="text" className="input" name="soDT" placeholder="Nhập số điện thoại" onChange={props.handleChange} onBlur={props.handleBlur} />
                </div>
              </div>
              <div className="input-div signup">
                <div className="i">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="input-user">
                  <input type="text" className="input" name="email" placeholder="Nhập email" onChange={props.handleChange} onBlur={props.handleBlur} />
                </div>
              </div>
              <button className="btn signup-btn">SIGN UP</button>
            </form>
);


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
      emailValid: false,
      noti: "hi there, wanna book your movie tickets, register now"
    };
  }

  handleBlur = e => {
    let { name, value } = e.target;
    let { tkValid, mkValid, tenValid, dtValid, emailValid } = this.state;
    let message = value === "";
    switch (name) {
      case "taiKhoan":
        message = value === "" ? "Tài khoản không được rỗng nha" : "";
        tkValid = message ? false : true;
        if (value && value.length < 8) {
          tkValid = false;
          message = "Tên tài khoản phải có it nhất 8 kí tự bạn nha";
        }
        break;
      case "matKhau":
        message = value === "" ? "Mật khẩu không được rỗng nha" : "";
        break;
      case "hoTen":
        message = value === "" ? "Họ tên không được rỗng nha" : "";
        tenValid = message ? false : true;
        if (value && value.length < 4) {
          tenValid = false;
          message = "Độ dài chuỗi phải có it nhất 4 kí tự";
        }
        break;
      case "soDT":
        message = value === "" ? "Số điện thoại không được rỗng nha" : "";
        dtValid = message ? false : true;
        if (value && value.length < 11) {
          dtValid = false;
          message = "Độ dài số điện thoại phải có it nhất 10 kí tự";
        }
        break;
      case "email":
        message = value === "" ? "email không được rỗng nha" : "";
        emailValid = message ? false : true;
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          emailValid = false;
          message = "Điền đúng định dạng email đi kìa bạn ơi";
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

    if (message !== "") {
      this.setState({
        noti: message
      });
    } else {
      this.setState({
        noti: "OK ^.^"
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
    let user = { ...this.state };
    let { tkValid, mkValid, dtValid, tenValid, emailValid } = this.state;
    user.maNhom = "GP01";
    user.maLoaiNguoiDung = "KhachHang";
    if ((tkValid, mkValid, dtValid, tenValid, emailValid === true)) {
      this.setState({
        noti: "Chúc mừng bạn đã đăng kí thành công"
      });
      setTimeout(() => {
        this.props.signup(user, this.props.history);
      }, 2000);
    }
  };
  renderHTML = () => {
    return (
      <div className="signup-container">
        <div className="signup-content row">
          <SignUpImage noti={this.state.noti}></SignUpImage>
          <div className="signUp-form col-sm-5">
            <h4>Register</h4>
          <FormSignUp handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleBlur={this.handleBlur}></FormSignUp>
          </div>
        </div>
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
