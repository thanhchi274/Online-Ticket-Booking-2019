import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../redux/action/index";
class TabUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      matKhauCu: ""
    };
  }
  handleSubmit = e => {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    e.preventDefault();
    let updatedUser = { ...this.state };
    let taiKhoan = this.state.taiKhoan;
    console.log(updatedUser);

    if (this.state.matKhauCu === UserInfo.matKhau) {
      // this.props.updateUser(updatedUser);
      console.log(updatedUser);
    } else {
      alert("sai mk cũ");
    }
    this.setState(
      {
        ...this.state
      },
      () => {
        this.props.getUserInformation({ taiKhoan });
      }
    );
  };
  handleChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
      }
    );
  };
  componentDidMount() {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    let taiKhoan = UserHome.taiKhoan;
    this.props.getUserInformation({ taiKhoan });
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    this.setState({
      taiKhoan: UserInfo.taiKhoan,
      matKhau: UserInfo.matKhau,
      email: UserInfo.email,
      soDt: UserInfo.soDT,
      hoTen: UserInfo.hoTen,
      maNhom: UserHome.maNhom,
      maLoaiNguoiDung: UserHome.maLoaiNguoiDung
    });
  }
  render() {
    return (
      <>
        <form className="updateUser" onSubmit={this.handleSubmit}>
          <h4>Đổi mật khẩu </h4>
          <hr />
          <div className="form-group">
            <label>Mật khẩu cũ:</label>
            <input
              type="password"
              className="form-control"
              name="matKhauCu"
              onChange={this.handleChange}
              placeholder="Nhập Password"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              className="form-control"
              name="matKhau"
              onChange={this.handleChange}
              placeholder="Nhập Password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-update btn-success"
            onClick={this.handleClick}
          >
            Cập nhật
          </button>
        </form>
      </>
    );
  }
}
const mapStateToProps = state => ({
  userInformation: state.movieReducer.userInformation
});
const mapDispatchToProps = dispatch => {
  return {
    getUserInformation: user => {
      dispatch(Action.actLayThongTinUser(user));
    },
    updateUser: user => {
      dispatch(Action.actUpdateUserInformation(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabUpdateUser);
