import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class TicketFooter extends Component {
  renderSeat = () => {
    return this.props.seat;
  };
  render() {
    return (
      <div className="ticketFooter-container mobile">
        <div className="seat_mobile">{this.renderSeat()}</div>
        <Link className="pay_button" to="/checkout">
          tiếp tục
        </Link>
      </div>
    );
  }
}
