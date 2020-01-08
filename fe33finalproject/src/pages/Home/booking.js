import React, { Component } from "react";
import * as action from "../../redux/action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SVGLoading from "../../Components/loading";
class Booking extends Component {
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
    return (
      <div className="container">
        <div className="row">
          <h3 className="mr-2">Tên cụm rạp: </h3>
          <h3>{room.thongTinPhim ? room.thongTinPhim.tenCumRap : ""}</h3>
        </div>
        <div className="row">
          <h3 className="mr-2">Tên rạp:</h3>
          <h3> {room.thongTinPhim ? room.thongTinPhim.tenRap : ""}</h3>
        </div>
        <div className="row">
          <h3 className="mr-2">Tên phim:</h3>
          <h3> {room.thongTinPhim ? room.thongTinPhim.tenPhim : ""}</h3>
        </div>
        <div className="row">
          <h3 className="mr-2">Suất chiếu:</h3>
          <h3> {room.thongTinPhim ? room.thongTinPhim.gioChieu : ""}</h3>
        </div>
        <div className="seat-choosing">
          <div className="monitor">Màn hình</div>
          <div className="row chairList">{this.renderHTML()}</div>
        </div>
        <div className="book">
          <button
            className="book btn btn-success"
            onClick={this.handleBookTicket}
          >
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
