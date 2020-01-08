import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlayButton from "./playButton"
export default class Movie extends Component {
    render() {
        let {movie} =this.props
        return (
            <div className="movie-carousel">
                <div className="carousel-image">
                <LazyLoadImage src={movie.hinhAnh} className="img-fluid" effect="blur" height={400} width={250}/> 
                <div className="carousel-trailer" >
                <div>
                </div>
                <PlayButton movie={this.props.movie}/> 
                </div>
                {/* </NavLink> */}
                {/* <div className="carousel-body">
                    <p className="carousel-text">{movie.tenPhim}</p> 
                </div> */}
                <div className="carousel-detail">
                    <p>{movie.tenPhim}</p>
                    <p>Đánh Giá: {movie.danhGia} /5</p>
                </div>
                </div>
            </div>
            
        )
    }
    
}
