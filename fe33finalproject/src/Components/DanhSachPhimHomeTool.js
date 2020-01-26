import React from 'react'

export default function DanhSachPhimHomeTool(props) {
    let {MovieList}=props
    return (
        <>
         <option value={MovieList.maPhim} > {MovieList.tenPhim}</option>
        </>
    )
}
