import React from 'react'
import _ from 'lodash';
import { Link } from "react-router-dom";
export default function TimeofMovie(props) {
    const renderGioChieu = ()=>{
        if(props.LichChieu){
            const LichChieuPhim = props.LichChieu
            const GioChieuPhim = _.filter(LichChieuPhim,time=>(new Date(time.ngayChieuGioChieu).toLocaleDateString()=== props.ngayChieu))
                return (
                    Object.keys(GioChieuPhim).map((dateMovie,indexDateMovie)=>{
                     return ( 
                         <div key={indexDateMovie}>
                            <Link className="btn btn-danger" to={`/dat-ve/${GioChieuPhim[dateMovie].maLichChieu}`} >
                                {new Date(GioChieuPhim[dateMovie].ngayChieuGioChieu).toLocaleTimeString()}
                            </Link>
                         </div>
                  )})) 
        }
    }
    return (
        <div>
              {renderGioChieu()}   
        </div>
    )
}
