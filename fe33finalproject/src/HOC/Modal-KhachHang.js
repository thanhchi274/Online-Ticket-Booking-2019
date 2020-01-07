import React, { Component } from 'react'

export default class ModalNhanVien extends Component {
    render() {
        return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Ten Khach Hang</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Moi nhap Ten Khach Hang" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Mat Khau</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Moi nhap mat kahu" />
            </div>
            <a href="index.html" class="btn btn-google btn-user btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>
        </div>
        )
    }
}
