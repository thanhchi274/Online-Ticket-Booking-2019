import * as action from "../../../Store/action";
import { connect } from "react-redux";
import React, { Component } from "react";

class ModalEditMovie extends Component {
  _edited = false;
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      ngayKhoiChieu: "",
      hinhAnh: "",
      danhGia: "",
      maNhom: "GP01"
    };
  }

  render() {
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content editMovie">
            <div className="modal-body">
              <form
                // onSubmit={this.handleSubmitEdit}
                encType="multipart/form-data"
                action="/upload/image"
              >
                <div className="form-group">
                  <label>Mã Phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maPhim"
                    // value={recevieMovie.maPhim}
                    // onChange={handleChangeEdit}
                    placeholder="Nhập Mã Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Tên Phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenPhim"
                    // onChange={handleChangeEdit}
                    // defaultValue={recevieMovie.tenPhim}
                    placeholder="Nhập Tên Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Bí Danh:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="biDanh"
                    autoComplete="password"
                    // value={this.state.biDanh!=="" ? this.state.biDanh :"loading"}
                    // onChange={this.handleChangeEdit}
                    placeholder="Nhập Bí Danh Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Trailer:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trailer"
                    // value={
                    //   this.state.trailer!=="" ? this.state.trailer : "loading"
                    // }
                    // onChange={this.handleChangeEdit}
                    placeholder="Nhập đường dẫn trailer Youtube"
                  />
                </div>
                <div className="form-group">
                  <label>Ngày Khởi Chiếu:</label>
                  <input
                    type="date"
                    className="datePicker"
                    // onChange={this.handleChangeEdit}
                    // value={
                    //   this.state.ngayKhoiChieu
                    //     ? moment
                    //         .utc(this.state.ngayKhoiChieu)
                    //         .format("YYYY-MM-DD")
                    //     : "Loading"
                    // }
                    name="ngayKhoiChieu"
                    id="ngayKhơiChieu"
                  />
                </div>
                <div className="form-group">
                  <label>Hình Ảnh:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hinhAnh"
                    // value={
                    //   this.state.hinhAnh!=="" ? this.state.hinhAnh : "loading"
                    // }
                    // onChange={this.handleChangeEdit}
                    placeholder="Chỉ được nhập link ảnh từ nguồn Khác"
                  />
                </div>
                <div className="form-group">
                  <label>Đánh Giá:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="danhGia"
                    // value={
                    //   this.state.danhGia!=="" ? this.state.danhGia : "loading"
                    // }
                    // onChange={this.handleChangeEdit}
                    placeholder="Nhập đánh giá từ 1 đến 5"
                  />
                </div>
                <button type="submit" className="btn btn-update btn-success">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movieReducer.movie
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateMovie: tk => {
      dispatch(action.actUpdateMovie(tk));
    },
    addImageMovie: image => {
      dispatch(action.actthemHinhAnhPhim(image));
    },
    detaiMovie: id => {
      dispatch(action.actGetDetailMovieAPI(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMovie);
