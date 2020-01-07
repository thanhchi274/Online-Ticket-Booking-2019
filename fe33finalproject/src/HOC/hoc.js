import React, { Component } from 'react'
import ModalKhachHang from "./Modal-KhachHang"
import ModalSanPham from "./Modal-Sanpham"
import WithModal from "./with-modal"
const FormsModal = WithModal( ModalKhachHang)
export default class HOC extends Component {
    render() {
        return (
            <div>
            <FormsModal />
            {/* <ModalNhanVien />
            <ModalSanPham /> */}
            </div>
        )
    }
}
