import React, { Component } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Date } from "prismic-reactjs";
import Rating from "./RatingMovie";
import * as Moment from "moment";
import { Link } from "react-router-dom";

export default class MovieCarousel extends Component {
  render() {
    let { movie } = this.props;
    const date = Date(movie.ngayKhoiChieu);
    const formattedDate = Moment(date).format("LL");
    return (
      <div className="movie-carousel">
        {/*
          <div className="carousel-image">
            <Link to={`/detail-movie/${movie.maPhim}`}>
              <LazyLoadImage
                src={movie.hinhAnh}
                style={{ border: "1px solid black", borderRadius: "20px" }}
                className="img-fluid carousel-image-home"
                effect="blur"
                height={350}
                width={250}
              />
            </Link>
          </div>
        
        {/* </NavLink> 
        {/* <div className="carousel-body">
                    <p className="carousel-text">{movie.tenPhim}</p> 
                </div> */}
        <div
          className="carousel-detail"
          style={{ border: "1px solid black", borderRadius: "20px" }}
        >
          <Link to={`/detail-movie/${movie.maPhim}`}>{movie.tenPhim}</Link>
          <p>Premiere Date: {formattedDate}</p>
          <Rating danhGia={movie.danhGia} />
        </div>
      </div>
    );
  }
}
