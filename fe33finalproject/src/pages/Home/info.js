import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Info extends Component {
  renderHTML = () => {
    const info = JSON.parse(localStorage.getItem("UserHome"));
    return (
      <div
        className="container row"
        style={{ backgroundColor: "white", opacity: "0.8" }}
      >
        <div className="info">
          <h1>Thông tin tài khoản</h1>
          <div className="row comp">
            <label>Họ và tên: </label>
            <p>{info.hoTen}</p>
          </div>
          <div className="row comp">
            <label>Email: </label>
            <p>{info.email}</p>
          </div>
          <div className="row comp ">
            <label>Số điện thoại: </label>
            <p>{info.soDT}</p>
          </div>
          <div className="row comp">
            <label>Mã nhóm: </label>
            <p>{info.maNhom}</p>
          </div>
          <div>
            {/* Button to Open the Modal */}
            <button
              type="button"
              className="btn btn-info"
              data-toggle="modal"
              data-target="#myModal1"
            >
              Cập nhật
            </button>
            {/* The Modal */}
            <div className="modal" id="myModal1">
              <div className="modal-dialog">
                <div className="modal-content">
                  {/* Modal Header */}
                  <div className="modal-header">
                    <h4 className="modal-title">Modal Heading</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      ×
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body">Modal body..</div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ava ">
          <img src="./ava.jpg" className="img-fluid" alt="avatar" />
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
