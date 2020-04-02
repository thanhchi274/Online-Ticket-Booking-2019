import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class TicketDetail extends Component {
  renderSeat = () => {
    const Ticket = JSON.parse(localStorage.getItem("Ticket"));
    return Ticket.danhSachVe.map((item, index) => {
      return <React.Fragment key={index}>{item.tenGhe + " "} </React.Fragment>;
    });
  };
  render() {
    const Ticket = JSON.parse(localStorage.getItem("Ticket"));
    if (Ticket) {
      return (
        <div className="ticket-wrapper">
          <div className="ticket-title">
            <p>Chi tiết vé đã đặt</p>
          </div>
          <div className="ticket-detail">
            <p>Tên phim: {Ticket.tenPhim}</p>
            <p>Tên cụm rạp: {Ticket.tenCumRap} </p>
            <p>Tên rạp: {Ticket.tenRap}</p>
            <p>Ghế đã đặt: {this.renderSeat()}</p>
          </div>
          <div className="ticket-footer">
            <p>Hình thức thanh toán: {Ticket.payStyle}</p>
            <p>Tổng thanh toán: {Ticket.tienVe}</p>
            <Link to="/">Trở lại trang chủ</Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
