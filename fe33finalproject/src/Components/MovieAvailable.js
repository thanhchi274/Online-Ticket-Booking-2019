import React, { Component } from "react";
import Slider from "react-slick";
import MovieCarousel from "../Components/movie-carousel";
import { connect } from "react-redux";
class MovieAvailable extends Component {
  renderHTML = () => {
    let { listMovie } = this.props;
    return listMovie.slice(0, 14).map((movie, index) => {
      return <MovieCarousel key={index} movie={movie} />;
    });
  };
  // renderHTML =()=>{
  //    let {listMovie} =this.props;
  //      return listMovie.map((movie, index)=>{
  //          return <MovieCarousel key={index} movie ={movie} />
  //       })
  // }
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "40px",
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
      autoplay: false
    };
    return (
      <div
        className="tab-pane fade show active container mx-auto"
        id="nav-dang-chieu"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <Slider {...settings}>{this.renderHTML()}</Slider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listMovie: state.movieReducer.listMovie
});

export default connect(mapStateToProps, null)(MovieAvailable);
