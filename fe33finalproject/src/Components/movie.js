import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
export default class Movie extends Component {
    render() {
        let {movie} =this.props
        return (
            <div className="col-sm-3 movie">
                <div className="card">
                <LazyLoadImage src={movie.hinhAnh} effect="black-and-white" alt="Card" height={350} width={250}/> 
                {/* <img className="card-img-top" src={movie.hinhAnh} alt="Card" /> */}
                <div className="card-body">
                    <p className="card-text">{movie.tenPhim}</p> 
                    <p className="card-text danhGiaPhim">Danh Gia phim :{movie.danhGia} /5</p>
                    <div className="movie-detail">
                        <Link className="btn btn-success btn-booking" to={`/detail-movie/${movie.maPhim}`}>Detail</Link>
                    </div>
                </div>
                {/* muon them thong tin phim thi them duong link */}
                </div>
            </div>
            
        )
    }
}
