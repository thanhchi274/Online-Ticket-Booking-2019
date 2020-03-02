import React, { Component } from "react";
import * as Action from "../redux/action/index.js";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
class HomeTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      maHeThongRap: "",
      homeToolData: [],
      ngayChieu: [],
      maPhim: ""
    };
  }
  renderDanhSachPhim = () => {
    return this.props.listMovie.map((MovieList, index) => {
      return (
        <option key={index} value={MovieList.maPhim}>
          {" "}
          {MovieList.tenPhim}
        </option>
      );
    });
  };
  renderDanhSachRap = () => {
    if (this.props.movieDate.heThongRapChieu) {
      return this.props.movieDate.heThongRapChieu.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <option value={item.maHeThongRap}>{item.tenHeThongRap}</option>
          </React.Fragment>
        );
      });
    }
    if (this.state.id !== "") {
      this.props.getMovieDateTime(this.state.id);
    }
  };
  renderNgayXem = () => {
    if (this.props.movieDate) {
      let data = this.state.homeToolData.heThongRapChieu;
      const renderData = _.filter(data, {
        maHeThongRap: this.state.maHeThongRap
      });
      return typeof renderData == "object"
        ? Object.keys(renderData).map((value, index) => {
            return typeof renderData[value].cumRapChieu == "object" ? (
              <React.Fragment key={index}>
                {" "}
                {Object.keys(renderData[value].cumRapChieu).map(
                  (item1, indexTheater) => {
                    const objLichChieu =
                      renderData[value].cumRapChieu[item1].lichChieuPhim;
                    const filteredArr = objLichChieu.reduce(
                      (arrayDuplicated, current) => {
                        const duplicatedItem = arrayDuplicated.find(
                          movie =>
                            new Date(
                              movie.ngayChieuGioChieu
                            ).toLocaleDateString() ===
                            new Date(
                              current.ngayChieuGioChieu
                            ).toLocaleDateString()
                        );
                        if (!duplicatedItem) {
                          return arrayDuplicated.concat([current]);
                        } else {
                          return arrayDuplicated;
                        }
                      },
                      []
                    );
                    return (
                      <React.Fragment key={indexTheater}>
                        {Object.keys(filteredArr).map(
                          (dateMovie, indexDateMovie) => {
                            return (
                              <option key={dateMovie}>
                                {new Date(
                                  filteredArr[dateMovie].ngayChieuGioChieu
                                ).toLocaleDateString()}
                              </option>
                            );
                          }
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </React.Fragment>
            ) : null;
          })
        : null;
    }
  };
  renderGioChieu = () => {
    if (this.props.movieDate) {
      let data = this.state.homeToolData.heThongRapChieu;
      const renderData = _.filter(data, {
        maHeThongRap: this.state.maHeThongRap
      });
      return typeof renderData == "object"
        ? Object.keys(renderData).map((value, index) => {
            return typeof renderData[value].cumRapChieu == "object" ? (
              <React.Fragment key={index}>
                {" "}
                {Object.keys(renderData[value].cumRapChieu).map(
                  (item1, indexTheater) => {
                    const objLichChieu =
                      renderData[value].cumRapChieu[item1].lichChieuPhim;
                    const filteredArr = objLichChieu.reduce(
                      (arrayDuplicated, current) => {
                        const duplicatedItem = arrayDuplicated.find(
                          time =>
                            new Date(
                              time.ngayChieuGioChieu
                            ).toLocaleTimeString() ===
                            new Date(
                              current.ngayChieuGioChieu
                            ).toLocaleTimeString()
                        );
                        if (!duplicatedItem) {
                          return arrayDuplicated.concat([current]);
                        } else {
                          return arrayDuplicated;
                        }
                      },
                      []
                    );
                    return (
                      <React.Fragment key={indexTheater}>
                        {Object.keys(filteredArr).map(
                          (dateMovie, indexDateMovie) => {
                            return (
                              <option
                                key={indexDateMovie}
                                value={filteredArr[dateMovie].maLichChieu}
                              >
                                {new Date(
                                  filteredArr[dateMovie].ngayChieuGioChieu
                                ).toLocaleTimeString()}
                              </option>
                            );
                          }
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </React.Fragment>
            ) : null;
          })
        : null;
    }
  };
  handlingChange = event => {
    this.setState(
      {
        id: event.target.value
      },
      () => {
        this.props.getMovieDateTime(this.state.id);
      }
    );
  };
  handlingChangeTheater = event => {
    this.setState({
      maHeThongRap: event.target.value,
      homeToolData: this.props.movieDate
    });
  };
  handlinTest = e => {
    this.setState({
      ngayChieu: e.target.value
    });
  };
  handlinTest2 = e => {
    this.setState({
      maPhim: e.target.value
    });
  };
  render() {
    return (
      <div className="wrapper home-tool desktop">
        <select
          value={this.movieName}
          className="form-control selectChoice"
          onChange={this.handlingChange}
        >
          <option>Chọn phim </option>
          {this.renderDanhSachPhim()}
        </select>
        <select
          className="form-control selectChoice"
          onChange={this.handlingChangeTheater}
        >
          <option>Chọn Rạp</option>
          {this.renderDanhSachRap()}
        </select>
        <select
          className="form-control selectChoice"
          onChange={this.handlinTest}
        >
          <option>Ngày Xem</option>
          {this.renderDanhSachRap() ? this.renderNgayXem() : null}
        </select>
        <select
          className="form-control selectChoice"
          onChange={this.handlinTest2}
        >
          <option>Suất Chiếu</option>
          {this.renderNgayXem() ? this.renderGioChieu() : null}
        </select>
        {this.state.maPhim !== "" ? (
          <Link
            className="btn-datve btn btn-primary"
            to={`/dat-ve/${this.state.maPhim}`}
          >
            Mua vé ngay
          </Link>
        ) : (
          <Link className="btn-datve btn btn-primary" disabled to={"/"}>
            Mua vé ngay
          </Link>
        )}
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  listMovie: state.movieReducer.listMovie,
  movieDate: state.movieReducer.movieDate
});
const mapDispatchToProps = dispatch => {
  return {
    getMovieDateTime: ve => {
      dispatch(Action.actGetDateTimeMovie(ve));
    }
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(HomeTool);
