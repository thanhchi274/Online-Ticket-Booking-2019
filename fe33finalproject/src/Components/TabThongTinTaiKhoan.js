import React, { Component } from "react";
import Skeleton from '@material-ui/lab/Skeleton';

class DetailInfo extends Component {
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
      </div>
      </>
    );
  }
}

export default (DetailInfo);