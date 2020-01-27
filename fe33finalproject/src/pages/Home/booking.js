import React, { Component } from "react";
import * as action from "../../redux/action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SVGLoading from "../../Components/loading";
import { Redirect } from "react-router-dom";
import CountDown from "../../Components/CountDown";
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chair: ""
    };
  }
  handleClick = e => {
    e.target.classList.toggle("chose");
  };
  renderHTML = () => {
    if (this.props.room.danhSachGhe) {
      return this.props.room.danhSachGhe.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={item.daDat ? "chair m-1 booked" : "chair m-1"}
              style={
                item.loaiGhe === "Thuong"
                  ? { backgroundColor: "#2196f3 " }
                  : { backgroundColor: "yellow" }
              }
              key={index}
              value={item.tenGhe}
              name="chair"
              onClick={item.daDat ? null : this.handleClick}
            >
              {item.daDat ? <FontAwesomeIcon icon={faTimes} /> : item.tenGhe}
            </div>
            {(index + 1) % 16 === 0 ? (
              <div style={{ width: "100%" }}></div>
            ) : null}
          </React.Fragment>
        );
      });
    }
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.setLoading();
    this.props.getRoomList(id);
  }
  handleBookTicket = () => {
    console.log("abc");
  };
  render() {
    let { room, loading } = this.props;
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    if (localStorage.getItem("UserHome") === null) {
      alert("Bạn phải đăng nhập tài khoản trước khi đặt vé");
      return <Redirect to="/login" />;
    }
    return (
      <div className="row">
        <div className="booking-movie col-sm-8">
          <CountDown />
          <div className="row">
            <h3 className="mr-2 tenCumRap">
              Tên cụm rạp:{" "}
              <span>
                {room.thongTinPhim ? room.thongTinPhim.tenCumRap : ""}
              </span>{" "}
            </h3>
          </div>
          <div className="row">
            <h3 className="mr-2 tenRap">
              Tên rạp:{" "}
              <span>{room.thongTinPhim ? room.thongTinPhim.tenRap : ""} </span>
            </h3>
          </div>
          <div className="row">
            <h3 className="mr-2 tenPhim">
              Tên phim:
              <span>{room.thongTinPhim ? room.thongTinPhim.tenPhim : ""}</span>
            </h3>
          </div>
          <div className="row">
            <h3 className="mr-2 suatChieu">
              Suất chiếu:
              <span>{room.thongTinPhim ? room.thongTinPhim.gioChieu : ""}</span>
            </h3>
          </div>
          <div className="seat-choosing">
            <div className="monitor">Màn hình</div>
            <div className="row chairList">{this.renderHTML()}</div>
          </div>
        </div>
        <div className="booking-ticket col-sm-4">
          <div className="total"></div>
          <div className="movie-info">
            <h4 className="tenPhim">
              {room.thongTinPhim ? room.thongTinPhim.tenPhim : ""}{" "}
            </h4>
            <p className="tenCumRap-book">
              {room.thongTinPhim ? room.thongTinPhim.tenCumRap : ""}{" "}
            </p>
            <p className="thoiGian">
              <span>
                {room.thongTinPhim ? room.thongTinPhim.ngayChieu : " "}
                {"-"}
              </span>
              <span>
                {room.thongTinPhim ? room.thongTinPhim.gioChieu : " "}
                {"-"}
              </span>
              <span>{room.thongTinPhim ? room.thongTinPhim.tenRap : ""} </span>
            </p>
          </div>
          <div className="finish-book">
            <p className="chair">Ghế {this.state.chair}</p>
            <p className="combo">Combo</p>
            <p>Phương thức thanh toán</p>
          </div>
          <button className="btnBook" onClick={this.handleBookTicket}>
            Đặt vé
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    room: state.movieReducer.room,
    loading: state.movieReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoomList: id => {
      dispatch(action.actGetRoomList(id));
    },
    setLoading: () => {
      dispatch(action.actLoading());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
