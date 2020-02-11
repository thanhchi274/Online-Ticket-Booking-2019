import React, { Component } from "react";
import * as Action from "../redux/action/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';

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
  handleSubmit = e => {
    e.preventDefault();
    let updatedUser = { ...this.state };
    this.props.updateUser(updatedUser);
  };
  render() {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"))
    return (
      <>
      <div className="container userInformation">
        <div className="comp">
          <p>
            Tài Khoản:<span>{UserInfo ? UserInfo.taiKhoan : <Skeleton animation="wave" variant="text" width="250px" />}</span>
          </p>
        </div>
        <div className="comp ">
          <p>
            Mật Khẩu:<span>{UserInfo ? UserInfo.matKhau : <Skeleton animation="wave" variant="text" width="250px" />}</span>
          </p>
        </div>
        <div className="comp">
          <p>
            Họ và tên:<span>{UserInfo ? UserInfo.hoTen : <Skeleton  animation="wave" variant="text" width="250px" />}</span>
          </p>
        </div>
        <div className="comp">
          <p>
            Email: <span>{UserInfo ? UserInfo.email : <Skeleton  animation="wave" variant="text" width="250px" />}</span>
          </p>
        </div>
        <div className="comp ">
          <p>
            Số điện thoại:<span>{UserInfo ? UserInfo.soDT : <Skeleton variant="text" width="250px" />}</span>
          </p>
        </div>
        <div className="d-flex comboButtonUser justify-content-between">
          <button
            type="button"
            className="btn btn-update btn-info "
            data-toggle="modal"
            data-target="#myModal1"
            onClick={this.handleClick}
          >
            Chỉnh Sửa Tài Khoản
          </button>
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