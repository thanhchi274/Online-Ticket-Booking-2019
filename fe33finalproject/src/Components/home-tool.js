import React, { Component } from "react";
import { connect } from "react-redux";
class HomeTool extends Component {
  render() {
    return (
      <div className="wrapper d-flex home-tool">
        <select className="form-control selectChoice">
          <option>Phim</option>
        </select>
        <select className="form-control selectChoice">
          <option>Rạp</option>
        </select>
        <select className="form-control selectChoice">
          <option>Ngày Xem</option>
        </select>
        <select className="form-control selectChoice">
          <option>Suất Chiếu</option>
        </select>
        <button className="btn-datve btn btn-primary">Mua vé ngay</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movie: state.movieReducer.movie
});
export default connect(mapStateToProps, null)(HomeTool);
