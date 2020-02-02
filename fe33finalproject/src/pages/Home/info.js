import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as Action from "../../redux/action/index";
import { connect } from 'react-redux';
import UserImage from "../../Components/UserImage"
import SVGLoading from "../../Components/loading";
class Info extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      taiKhoan:"",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom:"",
      maLoaiNguoiDung:""
    };
  }
  componentDidUpdate(){
    let user ={...this.state}
    this.props.getUserInformation(user)
  }
componentDidMount(){
  if(localStorage.getItem("UserHome")){
    let info = JSON.parse(localStorage.getItem("UserHome"));
    let taiKhoan = info.taiKhoan;
    this.setState({
      taiKhoan,
    })
  }
  if(localStorage.getItem("UserInfo")){
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"))
    let UserHome = JSON.parse(localStorage.getItem("UserHome"))
    let matKhau = UserInfo.matKhau;
    let email = UserInfo.email;
    let soDt = UserInfo.soDT;
    let hoTen = UserInfo.hoTen;
    let maNhom = UserHome.maNhom;
    let maLoaiNguoiDung = UserHome.maLoaiNguoiDung;
    this.setState({
      matKhau,
      email,
      soDt,
      hoTen,
      maNhom,
      maLoaiNguoiDung,
    })
  }
}

handleChange=(e)=>{
  let target = e.target;
  let name  = target.name;
  let value = target.value;
  this.setState({
    [name]:value
  });
};
handleSubmit=(e)=>{
  let updatedUser ={...this.state}
  console.log(updatedUser);
  e.preventDefault();
  this.props.updateUser(updatedUser)
  
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
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"))
    return (
      <div
        className="info--user"
        style={{ backgroundColor: "white", opacity: "1" }}
      >
       <h1>THÔNG TIN TÀI KHOẢN</h1>
      <div className="container row d-flex">
      <div className="avatar col-md-4 ">
          <UserImage />
        </div>
        <div className="info col-md-8">
        <div className="comp">
            <p>Tài Khoản:<span>{UserInfo ?UserInfo.taiKhoan: ""}</span></p>
          </div>
          <div className="comp ">
            <p>Mật Khẩu:<span>{UserInfo ?UserInfo.matKhau: ""}</span></p>
          </div>
          <div className="comp">
            <p>Họ và tên:<span>{UserInfo ?UserInfo.hoTen: ""}</span></p>
          </div>
          <div className="comp">
            <p>Email: <span>{UserInfo ?UserInfo.email:""}</span></p>
          </div>
          <div className="comp ">
            <p>Số điện thoại:<span>{UserInfo ?UserInfo.soDT: ""}</span></p>
          </div>
          <div>
            {/* Button to Open the Modal */}
            <button
              type="button"
              className="btn btn-update btn-info "
              data-toggle="modal"
              data-target="#myModal1"
              onClick ={this.handleClick}
            >
              CHỈNH SỬA TÀI KHOẢN
            </button>
            {/* The Modal */}
            <div className="modal" id="myModal1">
              <div className="modal-dialog">
                <div className="modal-content">
                  {/* Modal Header */}
                  <div className="modal-header">
                    <h4 className="modal-title">UPDATE INFORMATION</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      ×
                    </button>
                    
                  </div>
                  {/* Modal body */}
                  <div className="modal-body">
                    <form onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                    <label>Họ Tên:</label>
                      <input type="text" className="form-control" name="hoTen" value={this.state.hoTen || ""}  onChange={this.handleChange}  placeholder="Nhập Họ và Tên" />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input type="password" className="form-control" name="matKhau" value={this.state.matKhau || ""} onChange={this.handleChange} placeholder="Nhập Password" />
                    </div>
                    <div className="form-group">
                      <label>Số Điện Thoại:</label>
                      <input type="text" className="form-control" name="soDt" value={this.state.soDt || ""} onChange={this.handleChange} placeholder="Nhập số điện thoại" />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input type="email" className="form-control" name="email" value={this.state.email || ""} onChange={this.handleChange} placeholder="Nhập Email" />
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
  loading: state.movieReducer.loading,
});
const mapDispatchToProps = dispatch => {
  return {
    getUserInformation: (user) => {
      dispatch(Action.actLayThongTinUser(user));
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    },
    updateUser:user =>{
     dispatch(Action.actUpdateUserInformation(user))
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Info)