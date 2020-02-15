import React, { Component } from "react";
import { connect } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Date } from "prismic-reactjs";
import Rating from "./RatingMovie";
import * as Moment from "moment";
import { Link } from "react-router-dom";

import Swiper from "swiper";

class MovieAvailable extends Component {
  componentDidMount() {
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }
  renderHTML = () => {
    let { listMovie } = this.props;
    return listMovie.slice(0, 14).map((movie, index) => {
      const date = Date(movie.ngayKhoiChieu);
      const formattedDate = Moment(date).format("LL");
      return (
        <div key={index} className="swiper-slide">
          <div className="imgBx">
            <img className="container-fluid" src={movie.hinhAnh} />
          </div>
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
    });
  };
  render() {
    return (
      <div>
        <div className="swiper-container ">
          <div className="swiper-wrapper">{this.renderHTML()}</div>
          {/* Add Pagination */}
          <div className="swiper-pagination" />
          {/* Add Arrows */}
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listMovie: state.movieReducer.listMovie
});

export default connect(mapStateToProps, null)(MovieAvailable);
