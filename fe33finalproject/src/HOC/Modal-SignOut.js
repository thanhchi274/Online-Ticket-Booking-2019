import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ModalSanPham extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false
    };
  }
  logout = () => {
    localStorage.clear("token");
    this.setState({ navigate: true });
  };
  render() {
    const { navigate } = this.state;
    if (navigate) {
      return window.location.reload();
    }
    return (
      <div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            Bạn có chắc chắn muốn đăng xuất ?
          </label>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.logout}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }
}
