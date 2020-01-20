import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import Rating from "./RatingMovie"
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
                    <Rating danhGia ={movie.danhGia}/>
                    <div className="movie-detail">
                        <Link className="btn btn-success btn-booking" to={`/detail-movie/${movie.maPhim}`}>Chi tiết</Link>
                    </div>
                </div>
                {/* muon them thong tin phim thi them duong link */}
                </div>
            </div>
            
        )
    }
}
