import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as Action from "../../redux/action/index";
import { connect } from "react-redux";
import UserImage from "../../Components/UserImage";
import SVGLoading from "../../Components/loading";
import FullWidthTabs from "../../Components/info-detail";
import _ from "lodash";

class Info extends Component {
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
      movieData: []
    };
  }
  scrollToHistory = () => {
    window.scroll({
      top: 770,
      left: 0,
      behavior: "smooth"
    });
  };
  componentDidUpdate() {
    let user = { ...this.state };
    this.props.getUserInformation(user);
  }
  componentDidMount() {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const group1 = _.groupBy(UserInfo.thongTinDatVe, "ngayDat");
    console.log(group1);
    this.setState(
      {
        movieData: group1
      },
      () => {
        console.log(this.state);
      }
    );
    if (localStorage.getItem("UserHome")) {
      let info = JSON.parse(localStorage.getItem("UserHome"));
      let taiKhoan = info.taiKhoan;
      this.setState({
        taiKhoan
      });
    }
    if (localStorage.getItem("UserInfo")) {
      let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      let UserHome = JSON.parse(localStorage.getItem("UserHome"));
      let matKhau = UserInfo.matKhau;
      let email = UserInfo.email;
      let soDt = UserInfo.soDT;
      let hoTen = UserInfo.hoTen;
      this.setState({
        matKhau,
        email,
        soDt,
        hoTen
      });
    }
  }

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
    return localStorage.getItem("UserHome") ? (
      <div>{this.renderHTML()}</div>
    ) : (
      <Redirect to="/" />
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
export default connect(mapStateToProps, mapDispatchToProps)(Info);
