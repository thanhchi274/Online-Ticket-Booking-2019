import React, { Component } from 'react'
import ModalKhachHang from "./Modal-KhachHang"
import ModalSanPham from "./Modal-SignOut"
import WithModal from "./with-modal"
const FormsModal = WithModal( ModalSanPham)
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
