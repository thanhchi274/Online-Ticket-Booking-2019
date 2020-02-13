import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        };
      }
      handleSubmit = e => {
        e.preventDefault();
        let updatedUser = { ...this.state };
        let taiKhoan = this.state.taiKhoan;
        this.props.updateUser(updatedUser);
        this.setState({
            ...this.state
        },()=>{this.props.getUserInformation({taiKhoan})})
      };
      handleChange=(e)=>{
        let target = e.target;
        let name  = target.name;
        let value = target.value;
        this.setState({
            [name]:value,
        })
      }
      componentDidMount() {
         let UserHome = JSON.parse(localStorage.getItem("UserHome"));
         let taiKhoan = UserHome.taiKhoan;
         this.props.getUserInformation({taiKhoan});
         let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
           this.setState({
             taiKhoan:UserInfo.taiKhoan,
             matKhau :UserInfo.matKhau,
             email :UserInfo.email,
             soDt: UserInfo.soDT,
             hoTen:UserInfo.hoTen,
             maNhom:UserHome.maNhom,
             maLoaiNguoiDung: UserHome.maLoaiNguoiDung
           });
     }
    render() {
        return (
            <>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Họ Tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        value={this.state.hoTen ? this.state.hoTen :""}
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
                      onClick={this.handleClick}
                    >
                      Cập nhật
                    </button>
                  </form>
            </>
        )
    }
}
const mapStateToProps = state => ({
    userInformation: state.movieReducer.userInformation,
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