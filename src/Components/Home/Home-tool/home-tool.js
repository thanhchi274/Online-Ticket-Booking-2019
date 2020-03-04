import React, { Component } from "react";
import * as Action from "../../../Store/action/index";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

const ButtonBooking = (props) => (
    <Link className="btn-datve btn btn-primary" to={`/dat-ve/${props.maPhim}`}>
            Mua vé ngay
          </Link>
);
const DanhSachRap = (props) => (
    <select className="form-control selectChoice" onChange={props.handlingChangeTheater}>
          <option>Chọn Rạp</option>
          {props.renderDanhSachRap()}
        </select>
);
const DanhSachPhim = (props) => (
    <select value={props.movieName} className="form-control selectChoice" onChange={props.handlingChange}>
          <option>Chọn phim </option>
          {props.renderDanhSachPhim()}
        </select>
);
const DanhSachNgayXem = (props) => (
    <select className="form-control selectChoice" onChange={props.handlinTest}>
          <option>Ngày Xem</option>
          {props.renderDanhSachRap() ? props.renderNgayXem() : null}
        </select>
);
const DanhSachLichChieu = (props) => (
    <select className="form-control selectChoice" onChange={props.handlinTest2}>
          <option>Suất Chiếu</option>
          {props.renderNgayXem() ? props.renderGioChieu() : null}
        </select>
);
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
        <DanhSachPhim movieName={this.movieName} handlingChange={this.handlingChange} renderDanhSachPhim={this.renderDanhSachPhim}></DanhSachPhim>
        <DanhSachRap handlingChangeTheater={this.handlingChangeTheater} renderDanhSachRap={this.renderDanhSachRap}></DanhSachRap>
        <DanhSachNgayXem handlinTest={this.handlinTest} renderDanhSachRap={this.renderDanhSachRap} renderNgayXem={this.renderNgayXem}></DanhSachNgayXem>
        <DanhSachLichChieu handlinTest2={this.handlinTest2} renderNgayXem={this.renderNgayXem} renderGioChieu={this.renderGioChieu}></DanhSachLichChieu>
        {this.state.maPhim !== "" ? (
        <ButtonBooking maPhim={this.state.maPhim}></ButtonBooking>
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
