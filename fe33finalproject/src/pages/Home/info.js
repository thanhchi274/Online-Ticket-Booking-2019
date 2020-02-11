import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserImage from "../../Components/UserImage";
import ThanhTabInfo from "../../Components/ThanhTabInfo";

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
    };
  }
  
  async componentDidMount() {
    try{
     let UserHome = JSON.parse(localStorage.getItem("UserHome"));
     let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
       this.setState({
         taiKhoan:UserHome.taiKhoan,
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
  renderHTML = () => {
    let UserHome = JSON.parse(localStorage.getItem("UserHome"));
    return (
      <div className="container info-user">
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
        <div className="info-cover">
          <div className="detail-info">
            <div className="ava">
              <UserImage />
            </div>
            <div className="general">
              <h5>{UserHome.hoTen}</h5>
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
