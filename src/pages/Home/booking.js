import React, { Component } from "react";
import * as action from "../../Store/action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SVGLoading from "../../Components/loading";
import { Redirect } from "react-router-dom";
import CountDown from "../../Components/Home/BookingPage/countDown";
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maLichChieu: "",
      danhSachVe: [],
      taiKhoanNguoiDung: "",
      count: 1,
      tienVe: 0,
      payStyle: "zalopay"
    };
  }
  handleClick = e => {
    let { thongTinPhim } = this.props.room;
    let userName = JSON.parse(localStorage.getItem("UserHome"));
    e.target.classList.toggle("chose");
    let giaVe = e.target.getAttribute("giave");
    let tenGhe = e.target.getAttribute("tenghe");
    let maGhe = e.target.getAttribute("maghe");
    let maLichChieu = thongTinPhim.maLichChieu;
    if (e.target.className === "chair m-1 chose") {
      this.setState(
        {
          maLichChieu,
          danhSachVe: [
            ...this.state.danhSachVe,
            {
              tenGhe,
              maGhe,
              giaVe
            }
          ],
          taiKhoanNguoiDung: userName.taiKhoan,
          tienVe: parseInt(this.state.tienVe) + parseInt(giaVe),
          count: this.state.count + 1
        },
        () => {
          console.log(this.state.danhSachVe);
        }
      );
    } else {
      this.xoaGhe(maGhe);
      this.setState(
        {
          count: this.state.count - 1,
          tienVe: this.state.tienVe - giaVe
        },
        () => {
          console.log(this.state.danhSachVe);
        }
      );
    }
  };

  timViTri = maGhe => {
    let viTri = -1;
   return this.state.danhSachVe.map((item, index) => {
      if (item.maGhe === maGhe) {
      return viTri = index;
      }
      else{
        return viTri;
      }
    });
  };

  xoaGhe = maGhe => {
    let viTri = this.timViTri(maGhe);
    if (viTri !== -1) {
      this.state.danhSachVe.splice(viTri, 1);
    }
  };

  handleSubmit = () => {
    let ve = { ...this.state };
    if (this.state.danhSachVe.length !== 0) {
      this.props.bookingTicket(ve);
    }
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
              tenghe={item.tenGhe}
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
  renderTicket = () => {
    return this.state.danhSachVe.map((item, index) => {
      return <React.Fragment key={index}>{item.tenGhe} </React.Fragment>;
    });
  };
  renderRemindHTML = () => {
    if (this.state.danhSachVe.length === 0) {
      return (
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className=" errNoti row">
                  <FontAwesomeIcon className="circleTimes" icon={faTimes} />
                  <h4>Vui lòng chọn ghế</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      switch (this.state.payStyle) {
        case "zalopay":
          return (
            <div
              className="modal fade"
              id="modelId"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content payStyles">
                  <div className="modal-header">
                    <h5>Thanh toán zalopay</h5>
                  </div>
                  <div className="modal-body">
                    <div className=" errNoti row">
                      <img alt="ZaloPay" src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/86977583_2651059108511383_5143827256606457856_n.jpg?_nc_cat=107&_nc_ohc=ogOA-E8yXMkAX9UhCFk&_nc_ht=scontent.fsgn3-1.fna&oh=4b7dc1aa1e1dc90e2fb2e48d56116c92&oe=5EF560CC" />
                      <h4>Vui lòng quét mã zalopay để hoàn tất thanh toán</h4>
                      <h4>Tổng số tiền cần thanh toán: {this.state.tienVe}</h4>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-success"
                      onClick={this.handleSubmit}
                    >
                      Hoàn tất
                    </button>
                    <button className="btn btn-danger" data-dismiss="modal">
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        case "momo":
          return (
            <div
              className="modal fade"
              id="modelId"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content payStyles">
                  <div className="modal-header">
                    <h5>Thanh toán momo</h5>
                  </div>
                  <div className="modal-body">
                    <div className=" errNoti row">
                      <img alt="Momo" src="https://scontent-hkg3-2.xx.fbcdn.net/v/t1.15752-9/86969607_2592060907738901_7392232684623233024_n.jpg?_nc_cat=111&_nc_ohc=rXRWI-3efysAX9x72Jn&_nc_ht=scontent-hkg3-2.xx&oh=2514b0089c43a46c313103dab319d42c&oe=5EC2AC9A" />
                      <h4>Vui lòng quét mã momo để hoàn tất thanh toán</h4>
                      <h4>Tổng số tiền cần thanh toán: {this.state.tienVe}</h4>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-success"
                      onClick={this.handleSubmit}
                    >
                      Hoàn tất
                    </button>
                    <button className="btn btn-danger" data-dismiss="modal">
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        case "card":
          return (
            <div
              className="modal fade"
              id="modelId"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content payStyles">
                  <div className="modal-header">
                    <h5>Thanh toán bằng thẻ VISA/MASTERCARD</h5>
                  </div>
                  <div className="modal-body">
                    <div className=" errNoti row">
                      <h4>Mã card</h4>
                      <h4>Tổng số tiền cần thanh toán: {this.state.tienVe}</h4>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-success"
                      onClick={this.handleSubmit}
                    >
                      Hoàn tất
                    </button>
                    <button className="btn btn-danger" data-dismiss="modal">
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          default:
          return console.log("Do not Touch")
      }
    }
  };
  handleRemind = () => {
    return (
      <div>
        <button
          type="button"
          className=" btnBook"
          data-toggle="modal"
          data-target="#modelId"
        >
          Đặt vé
        </button>
        {this.renderRemindHTML()}
      </div>
    );
  };
  setPay = e => {
    this.setState({
      payStyle: e.target.value
    });
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
              <span>
                {room.thongTinPhim ? room.thongTinPhim.tenCumRap : ""}
              </span>{" "}
            </h3>
          </div>
          <div className="row">
            <h3 className="mr-2 tenPhim">
              <span>{room.thongTinPhim ? room.thongTinPhim.tenPhim : ""}</span>
            </h3>
          </div>
          <div className="row">
            <h3 className="mr-2 suatChieu">
              <span>
                {room.thongTinPhim ? room.thongTinPhim.ngayChieu : ""} -{" "}
              </span>
              <span>
                {room.thongTinPhim ? room.thongTinPhim.gioChieu : ""} -{" "}
              </span>
              <span>{room.thongTinPhim ? room.thongTinPhim.tenRap : ""}</span>
            </h3>
          </div>
          <div className="seat-choosing">
            <div className="monitor">Màn hình</div>
            <div className="row chairList">{this.renderHTML()}</div>
          </div>
        </div>
        <div className="booking-ticket col-sm-4">
          <div className="container">
            <div className="total">
              <h2>GIÁ TIỀN</h2>
              <h2>{this.state.tienVe}đ</h2>
            </div>
            <hr />
            <div className="info-ticket">
              <h5>
                Tên Phim:{" "}
                <span>
                  {room.thongTinPhim ? room.thongTinPhim.tenPhim : ""}
                </span>
              </h5>
              <h5>
                Địa Điểm:{" "}
                <span>
                  {room.thongTinPhim ? room.thongTinPhim.tenCumRap : ""}
                </span>
              </h5>
              <h5>
                {room.thongTinPhim ? room.thongTinPhim.ngayChieu : ""} -{" "}
                {room.thongTinPhim ? room.thongTinPhim.gioChieu : ""} -{" "}
                {room.thongTinPhim ? room.thongTinPhim.tenRap : ""}
              </h5>
            </div>
            <hr />

            <div className="seat-check">
              <h5>
                GHẾ ĐÃ CHỌN: {""}
                {this.renderTicket()}
              </h5>
            </div>
            <hr />
            <div className="checkType">
              <h5>Hình thức thanh toán</h5>
              <form className="container" onChange={this.setPay.bind(this)}>
                <div className="row align-items-center payStyle">
                  <input
                    type="radio"
                    name="pay"
                    value="zalopay"
                    defaultChecked
                  />
                  <img
                    className="paymentMethod--img"
                    src="https://lh3.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI=s180-rw"
                    srcSet="https://lh3.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI=s360-rw 2x"
                    aria-hidden="true"
                    alt="Ảnh bìa"
                    itemProp="image"
                    data-atf="false"
                    data-iml="1314.2249999946216"
                  ></img>
                  <p>Thanh toán qua Zalo PAY</p>
                </div>
                <div className="row align-items-center payStyle">
                  <input type="radio" name="pay" value="momo" />
                  <img
                    className="paymentMethod--img"
                    src="https://lh3.googleusercontent.com/MrBpQdI1sB8c2LUomM6wQfpIx3yuV2usmHY-rVM6J5jiQ_VXEm81vuv7sHPfi78SwQM=s180-rw"
                    srcSet="https://lh3.googleusercontent.com/MrBpQdI1sB8c2LUomM6wQfpIx3yuV2usmHY-rVM6J5jiQ_VXEm81vuv7sHPfi78SwQM=s360-rw 2x"
                    aria-hidden="true"
                    alt="Ảnh bìa"
                    itemProp="image"
                    data-atf="false"
                    data-iml="37830.04499999515"
                  ></img>
                  <p>Thanh toán bằng ví điện tử MOMO</p>
                </div>
                <div className="row align-items-center payStyle">
                  <input type="radio" name="pay" value="card" />
                  <img
                    className="paymentMethod--img"
                    src="https://anh4.com/images/2020/02/02/OfruP.png"
                    alt="OfruP.png"
                    border={0}
                  />
                  <p>Thanh toán qua thẻ VISA/MASTERCARD</p>
                </div>
              </form>
            </div>
            {this.handleRemind()}
          </div>
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
    },
    bookingTicket: user => {
      dispatch(action.actDatVe(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
