import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ThanhTabInfo from "../../Components/ThanhTabInfo";
import Skeleton from "@material-ui/lab/Skeleton";
class Info extends Component {
  renderHTML = () => {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    return (
      <div className="container info-user">
        <div className="info-cover">
          <div className="detail-info">
            <div className="ava">
              <img
                alt="avatar"
                src="https://divineshop.vn/image/avatar/default.png?rand=963987"
              />
            </div>
            <div className="general">
              <h5>
                {UserHome ? (
                  UserHome.hoTen
                ) : (
                  <Skeleton animation="wave" variant="text" width="250px" />
                )}
              </h5>
            </div>
          </div>
          <div className="topic-info row">
            <div className="col-sm-5 mr-5 row justify-content-between topic-info_detail">
              <p>Tài khoản: </p>
              <span>
                {UserHome ? (
                  UserHome.taiKhoan
                ) : (
                  <Skeleton animation="wave" variant="text" width="100px" />
                )}
              </span>
            </div>
            <div className="col-sm-3 row justify-content-between topic-info_detail2">
              <p>Mã nhóm: </p>
              <span>
                {UserHome ? (
                  UserHome.maNhom
                ) : (
                  <Skeleton animation="wave" variant="text" width="50px" />
                )}
              </span>
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
