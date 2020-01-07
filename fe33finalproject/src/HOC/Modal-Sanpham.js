import React, { Component } from 'react'

export default class ModalSanPham extends Component {
    render() {
        return (
            <div>

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Ma SP</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter MANV" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Ten SP</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="TEN NV" />
            </div>
        
            </div>
        )
    }
}
