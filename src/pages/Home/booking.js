import React, { Component } from "react";
import * as action from "../../Store/action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SVGLoading from "../../Components/loading";
import { Redirect } from "react-router-dom";
import CountDown from "../../Components/Home/BookingPage/countDown";
import Success from "../../Components/success";
import Fail from "../../Components/fail";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maLichChieu: "",
      danhSachVe: [],
      taiKhoanNguoiDung: "",
      count: 1,
      tienVe: 0,
      payStyle: "airpay",
      booked: false,
      fail: false,
      bookingClass: "booking-ticket col-sm-4"
    };
  }
  handleChoose = e => {
    let { thongTinPhim } = this.props.room;
    let userName = JSON.parse(localStorage.getItem("UserHome"));
    e.target.classList.toggle("chose");
    let giaVe = e.target.getAttribute("giave");
    let tenGhe = e.target.getAttribute("tenghe");
    let maGhe = e.target.getAttribute("maghe");
    let maLichChieu = thongTinPhim.maLichChieu;
    if (e.target.className === "chair chose") {
      this.setState({
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
      });
    } else {
      this.xoaGhe(maGhe);
      this.setState({
        count: this.state.count - 1,
        tienVe: this.state.tienVe - giaVe
      });
    }
  };
  timViTri = maGhe => {
    let viTri = -1;
    this.state.danhSachVe.map((item, index) => {
      if (item.maGhe === maGhe) {
        return (viTri = index);
      }
    });
    return viTri;
  };

  xoaGhe = maGhe => {
    let viTri = this.timViTri(maGhe);
    if (viTri !== -1) {
      this.state.danhSachVe.splice(viTri, 1);
    }
  };

  handleSubmit = () => {
    let ve = { ...this.state };
    if (
      this.state.danhSachVe.length !== 0 &&
      this.state.danhSachVe.length <= 12 &&
      this.state.payStyle !== "card"
    ) {
      this.setState({
        booked: true
      });
      setTimeout(() => {
        this.props.bookingTicket(ve, this.props.history);
      }, 1000);
    }
  };

  setPay = e => {
    this.setState({
      payStyle: e.target.value
    });
  };

  toggleError = () => {
    this.setState({
      fail: false
    });
  };

  renderChair = () => {
    if (this.props.room.danhSachGhe) {
      return this.props.room.danhSachGhe.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={item.daDat ? "chair booked" : "chair"}
              style={
                item.loaiGhe === "Thuong"
                  ? { backgroundColor: "#922cc9 " }
                  : { backgroundColor: "#cfcfcf" }
              }
              key={index}
              maghe={item.maGhe}
              tenghe={item.tenGhe}
              giave={item.giaVe}
              onClick={item.daDat ? null : this.handleChoose}
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
  renderError = () => {
    if (this.state.danhSachVe.length === 0) {
      return (
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className=" errNoti">
                  <img
                    src="https://tix.vn/app/assets/img/Post-notification.png"
                    alt="Chọn ghế"
                  />
                  <p>Vui lòng chọn ghế</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btnCloseErrForm btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.danhSachVe.length > 12) {
      return (
        <div
          class="errRender modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className=" maxErrNoti">
                  <img
                    src="https://tix.vn/app/assets/img/Post-notification.png"
                    alt="Vượt số ghế cho phép"
                  />
                  <p>
                    Nếu bạn muốn đặt hơn 12 vé, vui lòng liên hệ với chúng tôi
                    qua số hot line: (+84) 123 123 123
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btnCloseErrForm btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
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
      <div>
        {this.state.booked === true ? <Success tab={"Đặt vé"} /> : null}
        <div className=" bookTicket_container">
          <div className="booking-movie">
            <CountDown />
            <h3 className="mr-2 mb-4 tenPhim">
              {room.thongTinPhim ? room.thongTinPhim.tenPhim : ""}
            </h3>
            <div className="mb-3 thongTinSuatChieu">
              <div classList="thongTinSuatChieu_tenPhim">
                <span>
                  {" "}
                  {room.thongTinPhim ? room.thongTinPhim.tenCumRap : ""}
                </span>
              </div>
              <div classList="thongTinSuatChieu_rapChieu">
                <span>
                  {" "}
                  {room.thongTinPhim ? room.thongTinPhim.tenRap : ""} -{" "}
                </span>
                <span>
                  {" "}
                  {room.thongTinPhim ? room.thongTinPhim.ngayChieu : ""} -
                </span>
                <span>
                  {" "}
                  {room.thongTinPhim ? room.thongTinPhim.gioChieu : ""}
                </span>
              </div>
            </div>
            <div className="seat-choosing">
              <div className="monitor">
                <span>SCREEN</span>
              </div>
              <div className="row chairList">{this.renderChair()}</div>
            </div>
            <div className="seat--info d-flex justify-content-center">
              <div className="normalSeat mx-4 d-flex">
                <div className="seat--info_detail"></div>
                <p>NORMAL SEAT</p>
              </div>
              <div className="vipSeat d-flex">
                <div className="seat--info_detail"></div>
                <p>VIP SEAT</p>
              </div>
            </div>
          </div>
          <div className={this.state.bookingClass}>
            <div className="container">
              <div className="img-movie-booking desktop">
                <img
                  alt="Anh Phim"
                  src={room.thongTinPhim ? room.thongTinPhim.hinhAnh : ""}
                ></img>
              </div>
              <div className="total">
                <div
                  className="backButton"
                  onClick={() => {
                    this.setState({ bookingClass: "booking-ticket col-sm-4" });
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <h4>
                  TOTAL:<span> {this.state.tienVe}Đ</span>
                </h4>
              </div>
              <div className="seat-check">
                <h5>
                  GHẾ ĐÃ CHỌN: {""}
                  <span>{this.renderTicket()}</span>
                </h5>
              </div>
              <div className="checkType">
                <h5>Hình thức thanh toán</h5>
                {this.state.danhSachVe.length !== 0 ? (
                  <form className="container" onChange={this.setPay.bind(this)}>
                    <div className="payStyle_container">
                      <div className="row align-items-center payStyle">
                        <input
                          type="radio"
                          name="pay"
                          value="airpay"
                          defaultChecked
                        />
                        <img
                          alt="thanh toan airpay"
                          src="../Asset/airpay_logo.png"
                        ></img>
                        <p>Thanh toán qua Airpay</p>
                      </div>
                      {this.state.payStyle === "airpay" ? (
                        <div className=" payStyle_pay">
                          {" "}
                          <img alt="airpay" src="../asset/airpay_pay.jpg" />
                          <p>Vui lòng quét mã Airpay để hoàn tất thanh toán</p>
                        </div>
                      ) : null}
                    </div>
                    <div className="payStyle_container">
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
                      {this.state.payStyle === "momo" ? (
                        <div className=" payStyle_pay">
                          {" "}
                          <img alt="Momo" src="../asset/momo_pay.jpg" />
                          <p>Vui lòng quét mã MOMO để hoàn tất thanh toán</p>
                        </div>
                      ) : null}
                    </div>
                    <div className="payStyle_container">
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
                      {this.state.payStyle === "card" ? (
                        <div className=" payStyle_pay">
                          {" "}
                          <p>
                            Xin lỗi hiện tại chúng tôi chưa hỗ trợ hình thức
                            thanh toán này, vui lòng chọn phuong thức thanh toán
                            khác
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </form>
                ) : null}
              </div>
              <div className="btnAction_container">
                <button
                  type="button"
                  className="btnBook"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={this.handleSubmit}
                >
                  Đặt vé
                </button>
                {this.renderError()}
              </div>
            </div>
          </div>
        </div>
        <div className="ticketFooter-container mobile">
          <div className="seat_mobile">{this.renderTicket()}</div>
          <a
            className="pay_button"
            onClick={
              this.state.danhSachVe.length !== 0
                ? () => {
                    this.setState({
                      bookingClass: "booking-ticket show col-sm-4"
                    });
                  }
                : () =>
                    this.setState({
                      fail: true
                    })
            }
          >
            tiếp tục
          </a>
        </div>
        {this.state.fail === true ? (
          <Fail tab={"Vui lòng chọn ghế"} fail={this.toggleError} />
        ) : null}
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
    bookingTicket: (user, history) => {
      dispatch(action.actDatVe(user, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
