import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "../../../Store/action";
 class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDt: "",
          hoTen: "",
          maLoaiNguoiDung:"",
          maNhom:"GP01"
        };
      }
    componentWillReceiveProps(nextProps){
      if(nextProps.idUser !==""){
        let user = nextProps.userInformation
        this.setState({
          maLoaiNguoiDung:nextProps.typeUser,
          taiKhoan: nextProps.idUser,
          matKhau :user.matKhau,
          email: user.email,
          soDt: user.soDT,
          hoTen: user.hoTen,
          maNhom:"GP01"
        })
      }
    }
    handleChangeEdit = e => {
        let {name, value}= e.target
        this.setState(
            {
            [name]:value,
            }
          );
      };
      handleSubmitEdit =async e => {
        e.preventDefault();
        let user = this.state
        this.props.updateUserAdminOnly(user)
        await this.props.getUserList()
      };
      componentDidUpdate(){
        console.log(this.state)
      }
    render() {
        return (
            <div id="myModal" className="modal modalEditUser fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <form 
                  onSubmit={this.handleSubmitEdit}
                  >
                    <div className="form-group">
                      <label>Tài Khoản:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="taiKhoan"
                        value={this.state.taiKhoan}
                        onChange={this.handleChangeEdit}
                        placeholder="Nhập Họ và Tên"
                      />
                    </div>
                    <div className="form-group">
                      <label>Họ Tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        value={this.state.hoTen}
                        onChange={this.handleChangeEdit}
                        placeholder="Nhập Họ và Tên"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        name="matKhau"
                        autoComplete="password"
                        value={this.state.matKhau}
                        onChange={this.handleChangeEdit}
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
                        onChange={this.handleChangeEdit}
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
                        onChange={this.handleChangeEdit}
                        placeholder="Nhập Email"
                      />
                    </div>
                    <button type="submit" className="btn btn-update btnADDEdit">
                      Submit
                    </button>
                    <button
                    type="button"
                    className="btn btnCloseEditUser"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      userInformation: state.movieReducer.userInformation
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      updateUserAdminOnly: tk => {
        dispatch(action.actUpdateUserAdminOnly(tk));
      },
      getUserInformation: tk => {
        dispatch(action.actLayThongTinUser(tk));
      },
      getUserList: () => {
        dispatch(action.actGetUserList());
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);