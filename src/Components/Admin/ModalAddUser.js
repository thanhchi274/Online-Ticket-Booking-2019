import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "../../redux/action";
import {  Alert, AlertTitle } from "@material-ui/lab/";
class ModalAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDt: "",
          hoTen: "",
        };
      }
      handleOnAddNew = e => {
        if (this.state.addNewUserData.maLoaiNguoiDung === "") {
          e.preventDefault();
          return (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              Chọn Người Dùng Trước
            </Alert>
          );
        } else {
          e.preventDefault();
          this.props.addUser(this.state.addNewUserData);
        }
      };
      handleAddUser = e => {
        let { name, value } = e.target;
        this.setState(
          {
            [name]: value,
            addNewUserData: {
              maNhom: "GP01",
              taiKhoan: this.state.taiKhoan,
              email: this.state.email,
              soDt: this.state.soDt,
              matKhau: this.state.matKhau,
              hoTen: this.state.hoTen
            }
          },
          () => {
            console.log(this.state);
          }
        );
      };
    
      chooseMLND = e => {
        this.setState({
          addNewUserData: {
            ...this.state.addNewUserData,
            maLoaiNguoiDung: e.target.value
          }
        });
      };
    render() {
        return (
            <div id="myModalAdd" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  {/* <form onSubmit={this.handleOnAddNew}> */}
                    <div className="form-group">
                      <label htmlFor="">Tài Khoản</label>
                      <input
                        type="text"
                        className="form-control"
                        name="taiKhoan"
                        // onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="matKhau"
                        // onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Họ Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        // onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        // onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Số Điện Thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soDt"
                        // onChange={this.handleAddUser}
                      />
                    </div>

                    <div className="form-group choiceTypeUser">
                      <label>Mã Loại Người Dùng:</label>
                      <select 
                    //   onChange={this.chooseMLND}
                      >
                        <option value="">Mời Bạn Chọn</option>
                        <option value="KhachHang">Khách Hàng</option>
                        <option value="QuanTri">Quản Trị</option>
                      </select>
                    </div>
                    <button type="submit" className="SumbitAddUser">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btnCloseAddUser"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  {/* </form> */}
                </div>
              </div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    keyWord: state.movieReducer.keyWord,
    userList: state.movieReducer.userList,
    loading: state.movieReducer.loading,
    userInformation: state.movieReducer.userInformation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchUser: id => {
      dispatch(action.actSearchUser(id));
    },
    deleteUser: tk => {
      dispatch(action.actDeleteUser(tk));
    },
    getUserInformation: tk => {
      dispatch(action.actLayThongTinUser(tk));
    },
    addUser: user => {
      dispatch(action.actThemNguoiDung(user));
    },
    getUserList: () => {
      dispatch(action.actGetUserList());
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ModalAddUser)