import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "./../../Store/action/index.js";
import SVGLoading from "../../Components/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ModalVideo from "react-modal-video";
import FullWidthTabs from "../../Components/Home/DetailMoviePage/FullWidthTabs";
import AnchorLink from "react-anchor-link-smooth-scroll";

const DetailMovieDescription = props => (
  <div className="table detail-description">
    <p className="title-description">
      <strong>Tên phim: {props.movie.tenPhim}</strong>
    </p>
    <p className="title-description">
      <strong>
        Ngày chiếu: {new Date(props.movie.ngayKhoiChieu).toLocaleDateString()}
      </strong>
    </p>
    <p className="title-description mt-5">
      <AnchorLink href="#section2" className="book-btn mr-4">
        đặt vé
      </AnchorLink>
    </p>
  </div>
);
class DetailMovie extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      videoid: "",
      bookTicket: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({
      isOpen: true,
      videoid: this.props.movie.trailer.slice(30)
    });
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.setLoading();
    this.props.getdetailMovie(id);
    this.props.getMovieDateTime(id);
  }
  render() {
    let { loading, movie } = this.props;
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    return (
      <div className="container detail-movie">
        <ModalVideo
          channel="youtube"
          videoId={this.state.videoid}
          onClose={() => this.setState({ isOpen: false })}
          isOpen={this.state.isOpen}
        />
        <div className="row">
          <div className="col-sm-3 img-movie ">
            <LazyLoadImage
              src={movie.hinhAnh}
              effect="blur"
              alt="Card"
              height={450}
              width="100%"
              className="trailer"
            />
            <div className="bg-trailer"></div>
            <div className="play-btn" onClick={this.openModal}>
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>
          <div className="col-sm-8">
            <DetailMovieDescription movie={movie}></DetailMovieDescription>
          </div>
        </div>
        <div className="row tabs" id="section2">
          <FullWidthTabs
            movie={movie}
            ticket={this.state.bookTicket}
            id={this.props.match.params.id}
          />
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
    },
    getMovieDateTime: ve => {
      dispatch(Action.actGetDateTimeMovie(ve));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
