import React, { Component } from "react";
import { connect } from "react-redux";
import SVGLoading from "../../Components/loading";
import * as Action from "../../Store/action/index";
import Carousel from "../../Components/Home/MainPage/carousel";
import HomeTool from "../../Components/Home/Home-tool/home-tool";
import MovieAvailable from "../../Components/Home/MainPage/MovieAvailable";
import Footer from "../../Components/footer";
import LazyLoad from "react-lazyload";
import SmallSpinner from "../../Components/Home/DetailMoviePage/smallSpinner";
import MobileMovieSlider from "../../Components/Home/Mobile/mobile-movieSlider";
class Home extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.props.getListMovie();
  }
  render() {
    let { loading } = this.props;
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    return (
      <>
        <div>
          <div className="carousel">
            <Carousel />
            <HomeTool movieDate={this.props.movieDate} />
          </div>
          <div className="availableMovie">
            <h3 className="now_title">Now available</h3>
            <div className="tab-content nav-tabContent desktop" id="section1">
              <LazyLoad className="desktop" once={true} height="600">
                {loading ? <SmallSpinner /> : <MovieAvailable />}
              </LazyLoad>
            </div>
            <div className="tab-content nav-tabContent mobile" id="section1">
              {loading ? <SmallSpinner /> : <MobileMovieSlider />}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => ({
  listMovie: state.movieReducer.listMovie,
  loading: state.movieReducer.loading,
  listMovieUpcoming: state.movieReducer.listMovieUpcoming
});
const mapDispatchToProps = dispatch => {
  return {
    getListMovie: () => {
      dispatch(Action.actGetListMovieAPI());
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
