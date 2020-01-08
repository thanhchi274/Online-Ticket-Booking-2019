import React, { Component } from 'react'

export default class ModalSanPham extends Component {
    render() {
        return (
            <div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mọi dữ liệu của bạn sẽ bị xoá khi bạn đăng xuất</label>
                <button type="button" className="btn btn-danger">Đăng xuất</button>
            </div>
            </div>
        )
    }
}
