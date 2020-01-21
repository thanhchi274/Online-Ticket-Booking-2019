import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "./../../redux/action/index.js";
import SVGLoading from "../../Components/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ModalVideo from "react-modal-video";
import FullWidthTabs from "../../Components/detailTab";
// import { Link } from "react-router-dom";
import VerticalTabs from "../../Components/lich-chieu";
class DetailMovie extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.setLoading();
    this.props.getdetailMovie(id);
  }

  render() {
    let { movie, loading } = this.props;
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    return (
      <div className="container detail-movie">
        <iframe
          isOpen={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
          src={movie.trailer}
        ></iframe>
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={movie.trailer}
          onClose={() => this.setState({ isOpen: false })}
        />
        <div className="detail-movie-intro">
          <LazyLoadImage
            className="detail-movie-intro-image"
            src={movie.hinhAnh}
            effect="blur"
            alt="Card"
            height={100}
            width={300}
          />
        </div>
        <div className="row">
          <div className="col-sm-4 img-movie ">
            <LazyLoadImage
              src={movie.hinhAnh}
              effect="blur"
              alt="Card"
              height={450}
              width={300}
              className="trailer"
            />
            <a href={movie.trailer}>
              <div className="bg-trailer">
                <div className="play-btn">
                  <FontAwesomeIcon icon={faPlay} />
                </div>
              </div>
            </a>
          </div>
          <div className="col-sm-8">
            <div className="table detail-description">
              <p className="title-description">
                <strong>Tên phim: {movie.tenPhim}</strong>
              </p>
              <p className="title-description">
                <strong>
                  Ngày chiếu:{" "}
                  {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                </strong>
              </p>
              <p className="title-description mt-5">
                <a href="#section2" className="book-btn mr-4">
                  đặt vé
                </a>
                <a
                  href="#abc"
                  onClick={this.openModal}
                  className="book-btn btn-Trailer"
                >
                  Watch Trailer
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="row tabs" id="section2">
          <FullWidthTabs movie={movie} />
          {/*<VerticalTabs />*/}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movie: state.movieReducer.movie,
  loading: state.movieReducer.loading
});
const mapDispatchToProps = dispatch => {
  return {
    getdetailMovie: id => {
      dispatch(Action.actGetDetailMovieAPI(id));
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
