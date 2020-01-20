import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "./../../redux/action/index.js";
import SVGLoading from "../../Components/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ModalVideo from 'react-modal-video'
// import { Link } from "react-router-dom";
import VerticalTabs from "../../Components/lich-chieu";
class DetailMovie extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }
 
  openModal () {
    this.setState({isOpen: true})
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.setLoading();
    this.props.getdetailMovie(id);
  }
  // renderTable = () => {
  //   if (this.props.movie.lichChieu) {
  //     return this.props.movie.lichChieu.map((item, index) => {
  //       return (
  //         <tr key={index}>
  //           <td>{item.thongTinRap.tenCumRap}</td>
  //           <td>{item.thongTinRap.tenRap}</td>
  //           <td>{new Date(item.ngayChieuGioChieu).toLocaleTimeString()}</td>
  //           <td>{new Date(item.ngayChieuGioChieu).toLocaleDateString()}</td>
  //           <td>
  //             <Link
  //               className="btn btn-success"
  //               to={`/dat-ve/${item.maLichChieu}`}
  //             >
  //               Đặt vé
  //             </Link>
  //           </td>
  //         </tr>
  //       );
  //     });
  //   }
  // };

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
      <iframe isOpen={this.state.isOpen} onClose={() => this.setState({isOpen: false})} src={movie.trailer}></iframe>
      <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={movie.trailer}  onClose={() => this.setState({isOpen: false})} />
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
                <strong>Movie: {movie.tenPhim}</strong>
              </p>
              <p className="title-description">
                <strong>Description: {movie.moTa}</strong>
              </p>
              <p className="title-description">
                <a href="#section2" className="book-btn mr-4">
                  đặt vé
                </a>
              <a href="#section2"  onClick={this.openModal} className="book-btn btn-Trailer">
                  Watch Trailer
              </a>  
              </p>
            </div>
          </div>
        </div>
        <div className="row tabs" id="section2">
          {/*<table className="table">
            <thead>
              <tr>
                <th>Tên Cụcm Rạp</th>
                <th>Tên Rạp</th>
                <th>Giờ Chiếu</th>
                <th>Ngày Chiếu</th>
              </tr>
            </thead>
            <tbody>{this.renderTable()}</tbody>
    </table>*/}
          <VerticalTabs movie={movie} />
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
