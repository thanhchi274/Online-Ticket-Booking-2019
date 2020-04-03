import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenGhe: ""
    };
  }
  setChair = e => {
    let tenGhe = e.target.getAttribute("tenghe");
    this.setState({
      tenGhe
    });
  };
  renderSeatName = () => {
    const Ticket = JSON.parse(localStorage.getItem("Ticket"));
    return Ticket.danhSachVe.map((item, index) => {
      return (
        <AnchorLink
          className="tenGhe"
          href="#seat"
          key={index}
          onClick={this.setChair}
          tenghe={item.tenGhe}
        >
          {item.tenGhe}{" "}
        </AnchorLink>
      );
    });
  };
  renderSeat = () => {
    let Ticket = JSON.parse(localStorage.getItem("Ticket"));
    return Ticket.phongVe.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div className="chair">
            <p>{this.state.tenGhe == item.tenGhe ? item.tenGhe : ""}</p>
          </div>
          {(index + 1) % 16 === 0 ? (
            <div style={{ width: "100%" }}></div>
          ) : null}
        </React.Fragment>
      );
    });
  };
  render() {
    const Ticket = JSON.parse(localStorage.getItem("Ticket"));
    if (Ticket) {
      return (
        <div className="ticket-container">
          <div className="ticket-wrapper">
            <div className="ticket-title">
              <p>Chi tiết vé đã đặt</p>
            </div>
            <div className="ticket-detail">
              <div className="ticket-detail_title">
                <p>Tên phim:</p>
                <p>Tên cụm rạp:</p>
                <p>Tên rạp:</p>
                <p>Ghế đã đặt:</p>
              </div>
              <div className="ticket-detail_content">
                <p>{Ticket.tenPhim}</p>
                <p>{Ticket.tenCumRap}</p>
                <p>{Ticket.tenRap}</p>
                <div>{this.renderSeatName()}</div>
              </div>
            </div>
            <div className="ticket-footer">
              <p>Hình thức thanh toán: {Ticket.payStyle}</p>
              <p>Tổng thanh toán: {Ticket.tienVe}</p>
              <Link to="/">Trở lại trang chủ</Link>
            </div>
          </div>
          <div className="seat-pos">
            <h3>Vị trí ghế đã đặt</h3>
            <div className="monitor">
              <span>SCREEN</span>
            </div>
            <div className="chairList" id="seat">
              {this.renderSeat()}
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
