import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "../../redux/action";
 class ModalEditUser extends Component {
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
    
    componentDidUpdate(){
    console.log(this.props.idUser)
    }
    handleChangeEdit = e => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState(
            {
            [name]:value,
            },()=>console.log(this.state)
          );
      };
      handleSubmitEdit = e => {
        e.preventDefault();
        this.setState(
          {
            ...this.state
          },
          this.props.updateUser(this.state)
        );
      };
    render() {
        let user =this.props.userInformation
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
                        value={user? user.taiKhoan : "Loading"}
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
                        value={user ? user.hoTen : "Loading"}
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
                        value={user? user.matKhau : "Loading"}
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
                        value={user ? user.soDT :"Loading"}
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
                        value={user? user.email : "Loading"}
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
      updateUser: tk => {
        dispatch(action.actUpdateUserInformation(tk));
      },
      getUserInformation: tk => {
        dispatch(action.actLayThongTinUser(tk));
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);