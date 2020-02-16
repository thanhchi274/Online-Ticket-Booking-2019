import React, { Component } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import * as Action from "../redux/action/index";
class DetailInfo extends Component {
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
      clicked: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    let updatedUser = { ...this.state };
    let taiKhoan = this.state.taiKhoan;
    this.props.updateUser(updatedUser);
    this.setState(
      {
        ...this.state
      },
      () => {
        this.props.getUserInformation({ taiKhoan });
        window.location.reload();
      }
    );
  };
  handleChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
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
  renderButton = () => {
    if (this.state.clicked === true) {
      return (
        <div className="editButton">
          <button
            type="submit"
            className="btn btn-update btn-success"
            onClick={this.handleClick}
          >
            Cập nhật
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.setState({
                clicked: false
              });
            }}
          >
            Hủy bỏ
          </button>
        </div>
      );
    }
  };
  render() {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    return (
      <>
        <div className="info_cover">
          <div className=" userInformation">
            <form className="updateUser" onSubmit={this.handleSubmit}>
              <h4>Thông tin cá nhân</h4>
              <hr />
              <div className="comp row align-items-center justify-content-between">
                <p className="col-sm-3">Tài Khoản:</p>
                <span>
                  {UserInfo ? (
                    UserInfo.taiKhoan
                  ) : (
                    <Skeleton animation="wave" variant="text" width="250px" />
                  )}
                </span>
              </div>
              <div className="comp row align-items-center justify-content-between">
                <p className="col-sm-3">Họ và tên:</p>
                {this.state.clicked === false ? (
                  <span>
                    {UserInfo ? (
                      UserInfo.hoTen
                    ) : (
                      <Skeleton animation="wave" variant="text" width="250px" />
                    )}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="form-control col-sm-8"
                    name="hoTen"
                    value={this.state.hoTen ? this.state.hoTen : ""}
                    onChange={this.handleChange}
                    placeholder="Nhập Họ và Tên"
                  />
                )}
              </div>
              <div className="comp row align-items-center justify-content-between">
                <p className="col-sm-1">Email:</p>
                {this.state.clicked === false ? (
                  <span>
                    {UserInfo ? (
                      UserInfo.email
                    ) : (
                      <Skeleton animation="wave" variant="text" width="250px" />
                    )}
                  </span>
                ) : (
                  <input
                    type="email"
                    className="form-control col-sm-8"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Nhập Email"
                  />
                )}
              </div>
              <div className="comp row align-items-center justify-content-between">
                <p className="col-sm-3">Số điện thoại:</p>
                {this.state.clicked === false ? (
                  <span>
                    {UserInfo ? (
                      UserInfo.soDT
                    ) : (
                      <Skeleton variant="text" width="250px" />
                    )}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="form-control col-sm-8"
                    name="soDt"
                    value={this.state.soDt}
                    onChange={this.handleChange}
                    placeholder="Nhập số điện thoại"
                  />
                )}
              </div>
              {this.renderButton()}
            </form>
          </div>
          <div className="updateInfo">
            {this.state.clicked === false ? (
              <p
                className="updateButton"
                onClick={() => {
                  this.setState({
                    clicked: true
                  });
                }}
              >
                Cập nhật
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
