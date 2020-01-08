import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default class Movie extends Component {
    render() {
        let {movie} =this.props
        return (
            <div className="movie-carousel">
                <div className="carousel-image">
                {/* <NavLink to={} > */}
                <LazyLoadImage src={movie.hinhAnh} className="img-fluid" effect="blur" height={400} width={250}/> 
                {/* </NavLink> */}
                {/* <div className="carousel-body">
                    <p className="carousel-text">{movie.tenPhim}</p> 
                </div> */}
                </div>
            </div>
            
        )
    }
}
