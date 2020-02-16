import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserImage from "../../Components/UserImage";
import ThanhTabInfo from "../../Components/ThanhTabInfo";

class Info extends Component {
  renderHTML = () => {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    return (
      <div className="container info-user">
        <div className="info-cover">
          <div className="detail-info">
            <div className="ava">
              {/*<UserImage />*/}
              <img src="./ava.png" />
            </div>
            <div className="general">
              <h5>{UserHome.hoTen}</h5>
            </div>
          </div>
          <div className="topic-info row">
            <div className="col-sm-5 mr-5 row justify-content-between topic-info_detail">
              <p>Tài khoản: </p>
              <p>{UserHome.taiKhoan}</p>
            </div>
            <div className="col-sm-3 row justify-content-between topic-info_detail2">
              <p>Mã nhóm: </p>
              <p>{UserHome.maNhom}</p>
            </div>
          </div>
        </div>
        <div className="detail-info">
          <ThanhTabInfo />
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
export default Info;
