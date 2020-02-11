import React, { Component } from "react";
import UserImage from "./UserImage";
import * as Action from "../redux/action/index";
import { connect } from "react-redux";
import SVGLoading from "./loading";
import FullWidthTabs from "./info-detail";
import { Redirect } from "react-router-dom";

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
    };
  }
 async componentDidMount() {
   try{
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    let taiKhoan = UserHome.taiKhoan;
    this.props.getUserInformation({taiKhoan});
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      this.setState({
        taiKhoan,
        matKhau :UserInfo.matKhau,
        email :UserInfo.email,
        soDt: UserInfo.soDT,
        hoTen:UserInfo.hoTen,
        maNhom:UserHome.maNhom,
        maLoaiNguoiDung: UserHome.maLoaiNguoiDung
      });
   }
   catch(err){
  return <Redirect to ="/" />
}}
  handleChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let updatedUser = { ...this.state };
    this.props.updateUser(updatedUser);
  };
  renderHTML = () => {
    let { loading } = this.props;
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    return (
      <div className="container info-user">
        <div className="info-cover">
          <div className="detail-info">
            <div className="ava">
              <UserImage />
            </div>
            <div className="general">
              <h5>{this.state.hoTen}</h5>
            </div>
          </div>
        </div>
        <div className="detail-info">
          <FullWidthTabs />
        </div>
      </div>
    );
  };
  render() {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"))
    return (
      <>
      <div className="container userInformation">
        <div className="comp">
          <p>
            Tài Khoản:<span>{UserInfo ? UserInfo.taiKhoan : "loading"}</span>
          </p>
        </div>
        <div className="comp ">
          <p>
            Mật Khẩu:<span>{UserInfo ? UserInfo.matKhau : "loading"}</span>
          </p>
        </div>
        <div className="comp">
          <p>
            Họ và tên:<span>{UserInfo ? UserInfo.hoTen : "loading"}</span>
          </p>
        </div>
        <div className="comp">
          <p>
            Email: <span>{UserInfo ? UserInfo.email : "loading"}</span>
          </p>
        </div>
        <div className="comp ">
          <p>
            Số điện thoại:<span>{UserInfo ? UserInfo.soDT : ""}</span>
          </p>
        </div>
        <div className="d-flex comboButtonUser justify-content-between">
          {/* Button to Open the Modal */}
          <button
            type="button"
            className="btn btn-update btn-info "
            data-toggle="modal"
            data-target="#myModal1"
            onClick={this.handleClick}
          >
            Chỉnh Sửa Tài Khoản
          </button>
          {/* The Modal */}
          <div className="modal" id="myModal1">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">UPDATE INFORMATION</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Họ Tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        value={this.state.hoTen}
                        onChange={this.handleChange}
                        placeholder="Nhập Họ và Tên"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        name="matKhau"
                        value={this.state.matKhau}
                        onChange={this.handleChange}
                        placeholder="Nhập Password"
                      />
                    </div>
                    <div className="form-group">
                      <label>Số Điện Thoại:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soDt"
                        value={this.state.soDt}
                        onChange={this.handleChange}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Nhập Email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-update btn-success"
                    >
                      Cập nhật
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userInformation: state.movieReducer.userInformation,
  loading: state.movieReducer.loading
});
const mapDispatchToProps = dispatch => {
  return {
    getUserInformation: user => {
      dispatch(Action.actLayThongTinUser(user));
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    },
    updateUser: user => {
      dispatch(Action.actUpdateUserInformation(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo);
