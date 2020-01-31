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
      maLichChieu: "",
      danhSachVe: [],
      taiKhoanNguoiDung: "",
      count: null
    };
  }
  handleClick = e => {
    let { thongTinPhim } = this.props.room;
    let userName = JSON.parse(localStorage.getItem("UserHome"));
    if (e.target.classList.toggle("chose")) {
      let giaVe = e.target.getAttribute("giave");
      let maGhe = e.target.getAttribute("maghe");
      let maLichChieu = thongTinPhim.maLichChieu;
      this.setState({
        maLichChieu,
        danhSachVe: [
          ...this.state.danhSachVe,
          {
            maGhe,
            giaVe
          }
        ],
        taiKhoanNguoiDung: userName.taiKhoan
        // count: this.state.count + 1
      });
    }
    // else {
    //   this.setState({
    //     count: this.state.count - 1
    //   });
    // }
  };
  handleSubmit = () => {
    let ve = { ...this.state };
    this.props.bookingTicket(ve);
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
              maghe={item.maGhe}
              giave={item.giaVe}
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
      <>
        <div className="booking-movie">
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
          <button
            className="btnBook"
            data-toggle="modal"
            data-target="#BookingModal"
            onClick={this.handleSubmit}
          >
            Đặt vé
          </button>
        </div>
      </>
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
    },
    bookingTicket: user => {
      dispatch(action.actDatVe(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
