import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../redux/action";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Skeleton from '@material-ui/lab/Skeleton';
import TableMovieHead from "./TableHead";
import SelectEntriesOption from "./SelectEntriesOption"
class Paginition extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      pageCount: 0,
      keyWord: "",
      maPhimDelete: "",
      maPhim: 0,
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      danhGia: 0,
      hinhAnh: "",
      ngayKhoiChieu: "",
      sumbitDataMovie: {
        maPhim: 0,
        tenPhim: "",
        biDanh: "",
        trailer: "",
        moTa: "",
        hinhAnh: "",
        maNhom: "GP01",
        ngayKhoiChieu: "",
        danhGia: 0
      }
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.receivedData();
    if(this.handleDelete){
      this.receivedData();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeEdit = async e => {
    let target = e.target;
    let name = target.name;
    let value = await target.value;
    this.setState(
      {
        [name]: value,
        sumbitDataMovie: {
          maPhim: this.state.maPhim,
          tenPhim: this.state.tenPhim,
          biDanh: this.state.biDanh,
          hinhAnh: this.state.hinhAnh,
          trailer: this.state.trailer,
          maNhom: "GP01",
          ngayKhoiChieu: this.state.ngayKhoiChieu,
          danhGia: this.state.danhGia,
          moTa: this.state.moTa,
          [name]: value
        }
      },
      () => {
        console.log(this.state);
      }
    );
  };
  handleChangeAdd = async e => {
    let target = e.target;
    let name = target.name;
    let value = await target.value;
    this.setState(
      {
        [name]: value,
        sumbitDataMovie: {
          maPhim: this.state.maPhim,
          tenPhim: this.state.tenPhim,
          biDanh: this.state.biDanh,
          hinhAnh: this.state.hinhAnh,
          trailer: this.state.trailer,
          maNhom: "GP01",
          ngayKhoiChieu: this.state.ngayKhoiChieu,
          danhGia: this.state.danhGia,
          moTa: this.state.moTa
        }
      },
      () => {
        console.log(this.state.hinhAnh);
      }
    );
  };
  handleDelete = e => {
   this.setState(
        {
          maPhimDelete: e.target.value
        },
        () => {
          this.props.deleteMovie(this.state.maPhimDelete);
        });}

  handleSubmitEdit = e => {
    if (this.state.sumbitDataMovie.ngayKhoiChieu === this.state.ngayKhoiChieu) {
      this.setState(
        {
          sumbitDataMovie: {
            ...this.state.sumbitDataMovie,
            ngayKhoiChieu: moment
              .utc(this.state.ngayKhoiChieu)
              .format("DD/MM/YYYY")
          }
        },
        () => {
          this.props.updateMovie(this.state.sumbitDataMovie);
        }
      );
    }
    e.preventDefault();
  };
  handleSubmitAdd = e => {
    if (this.state.sumbitDataMovie.ngayKhoiChieu === this.state.ngayKhoiChieu) {
      this.setState(
        {
          sumbitDataMovie: {
            ...this.state.sumbitDataMovie,
            ngayKhoiChieu: moment
              .utc(this.state.ngayKhoiChieu)
              .format("DD/MM/YYYY")
          }
        },
        () => {
          this.props.addMovie(this.state.sumbitDataMovie);
          this.props.addImageMovie(this.state.hinhAnh);
        }
      );
    }
    e.preventDefault();
  };
  handleEdit = async e => {
    await this.setState({
      maPhim: e.target.value,
      tenPhim: e.target.getAttribute("tenphim"),
      biDanh: e.target.getAttribute("bidanh"),
      trailer: e.target.getAttribute("trailer"),
      danhGia: e.target.getAttribute("danhgia"),
      hinhAnh: e.target.getAttribute("hinhanh"),
      moTa: e.target.getAttribute("moTa"),
      ngayKhoiChieu: new Date(e.target.getAttribute("ngayKhoiChieu"))
        .toISOString()
        .slice(0, 10),
      sumbitDataMovie: {
        maPhim: this.state.maPhim,
        tenPhim: this.state.tenPhim,
        biDanh: this.state.biDanh,
        trailer: this.state.trailer,
        hinhAnh: this.state.hinhAnh,
        maNhom: "GP01",
        moTa: this.state.moTa,
        ngayKhoiChieu: moment
          .utc(e.target.getAttribute("ngayKhoiChieu"))
          .format("DD-MM-YYYY"),
        danhGia: this.state.danhGia
      }
    });
  };
  receivedData = async () => {
    await axios
      .get(
        `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`
      )
      .then(async res => {
        if (this.state.keyWord === "") {
          const data = await res.data;
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          let postData = slice.map((pd, index) => (
            <React.Fragment key={index}>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    <tr className="row100 body MovieBody">
                      <td className="cell100 column1">{pd.maPhim}</td>
                      <td className="cell100 column2">{pd.tenPhim}</td>
                      <td className="cell100 column6">{pd.biDanh}</td>
                      <td className="cell100 column3">{pd.trailer}</td>
                      <td className="cell100 column4">{pd.hinhAnh}</td>
                      <td className="cell100 column5">
                        {new Date(pd.ngayKhoiChieu).toDateString()}
                      </td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.maPhim}
                          className="btn btnEdit mx-1 btn-success"
                          tenphim={pd.tenPhim}
                          bidanh={pd.biDanh}
                          trailer={pd.trailer}
                          hinhanh={pd.hinhAnh}
                          mota={pd.moTa}
                          ngaykhoichieu={pd.ngayKhoiChieu}
                          danhgia={pd.danhGia}
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <FontAwesomeIcon icon={faUserEdit} />
                        </button>
                        <button
                          onClick={this.handleDelete}
                          value={pd.maPhim}
                          className="btn btnDelete btn-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ));
          if (this._isMounted) {
            this.setState({
              pageCount: Math.ceil(data.length / this.state.perPage),
              postData
            });
          }
        }
        if (this.state.keyWord !== "") {
          const data = await this.props.keyWord;
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          let postData = slice.map((pd, index) => (
            <React.Fragment key={index}>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    <tr className="row100 body MovieBody">
                      <td className="cell100 column1">{pd.maPhim}</td>
                      <td className="cell100 column2">{pd.tenPhim}</td>
                      <td className="cell100 column6">{pd.biDanh}</td>
                      <td className="cell100 column3">{pd.trailer}</td>
                      <td className="cell100 column4">{pd.hinhAnh}</td>
                      <td className="cell100 column5">
                        {new Date(pd.ngayKhoiChieu).toISOString().slice(0, 10)}
                      </td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.maPhim}
                          className="btn btnEdit mx-1 btn-success"
                          tenphim={pd.tenPhim}
                          bidanh={pd.biDanh}
                          trailer={pd.trailer}
                          hinhanh={pd.hinhAnh}
                          mota={pd.moTa}
                          ngaykhoichieu={pd.ngayKhoiChieu}
                          danhgia={pd.danhGia}
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <FontAwesomeIcon icon={faUserEdit} />
                        </button>
                        <button
                          onClick={this.handleDelete}
                          value={pd.maPhim}
                          className="btn btnDelete btn-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ));
          if (this._isMounted) {
            this.setState({
              pageCount: Math.ceil(data.length / this.state.perPage),
              postData
            });
          }
        }
      });
  };
  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset
      },
      () => {
        this.receivedData();
      }
    );
  };
  handlingChange = e => {
    let perPage = e.target.value;
    this.setState(
      {
        perPage
      },
      () => {
        this.receivedData();
      }
    );
  };
  render() {
    return (
      <div>
        <div className="limiter MovieComponent">
          <div className="selectEntries d-flex">
            <select onChange={this.handlingChange}>
            <SelectEntriesOption />
            </select>
            <button
              onClick={this.handleAdd}
              data-toggle="modal"
              data-target="#ModalAdd"
              className="btnAddPhim btn"
            >
              Add Phim
            </button>
          </div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver2 m-b-110">
                <TableMovieHead column1 ={"Mã Phim"} column2 ={"Tên Phim"} column6 ={"Bí Danh"} column3 ={"Trailer"}
                  column4 = {"Hình Ảnh"} column5 ="Ngày khởi Chiếu"
                />
                {this.state.postData}
              </div>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content editMovie">
              <div className="modal-body">
                <form
                  onSubmit={this.handleSubmitEdit}
                  encType="multipart/form-data"
                  action="/upload/image"
                >
                  <div className="form-group">
                    <label>Mã Phim:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="maPhim"
                      value={this.state.maPhim!=="" ? this.state.maPhim :<Skeleton animation="wave" variant="text" width="400px" />}
                      onChange={this.handleChangeEdit}
                      placeholder="Nhập Mã Phim"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên Phim:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tenPhim"
                      value={
                        this.state.tenPhim!=="" ? this.state.tenPhim : <Skeleton animation="wave" variant="text" width="400px" />
                      }
                      onChange={this.handleChangeEdit}
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
                      value={this.state.biDanh!=="" ? this.state.biDanh :<Skeleton animation="wave" variant="text" width="400px" />}
                      onChange={this.handleChangeEdit}
                      placeholder="Nhập Bí Danh Phim"
                    />
                  </div>
                  <div className="form-group">
                    <label>Trailer:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="trailer"
                      value={
                        this.state.trailer!=="" ? this.state.trailer : <Skeleton animation="wave" variant="text" width="400px" />
                      }
                      onChange={this.handleChangeEdit}
                      placeholder="Nhập đường dẫn trailer Youtube"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày Khởi Chiếu:</label>
                    <input
                      type="date"
                      className="datePicker"
                      onChange={this.handleChangeEdit}
                      value={
                        this.state.ngayKhoiChieu
                          ? moment
                              .utc(this.state.ngayKhoiChieu)
                              .format("YYYY-MM-DD")
                          : "Loading"
                      }
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
                      value={
                        this.state.hinhAnh!=="" ? this.state.hinhAnh : <Skeleton animation="wave" variant="text" width="400px" />
                      }
                      onChange={this.handleChangeEdit}
                      placeholder="Chỉ được nhập link ảnh từ nguồn Khác"
                    />
                  </div>
                  <div className="form-group">
                    <label>Đánh Giá:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="danhGia"
                      value={
                        this.state.danhGia!=="" ? this.state.danhGia : <Skeleton animation="wave" variant="text" width="250px" />
                      }
                      onChange={this.handleChangeEdit}
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
        <div id="ModalAdd" className="modal fade" role="dialog">
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content editMovie">
              <div className="modal-body">
                <form onSubmit={this.handleSubmitAdd}>
                  <div className="form-group">
                    <label>Mã Phim:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="maPhim"
                      onChange={this.handleChangeAdd}
                      placeholder="Nhập Mã Phim"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên Phim:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tenPhim"
                      onChange={this.handleChangeAdd}
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
                      onChange={this.handleChangeAdd}
                      placeholder="Nhập Bí Danh Phim"
                    />
                  </div>
                  <div className="form-group">
                    <label>Trailer:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="trailer"
                      onChange={this.handleChangeAdd}
                      placeholder="Nhập đường dẫn trailer Youtube"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày Khởi Chiếu:</label>
                    <input
                      type="date"
                      className="datePicker"
                      onChange={this.handleChangeAdd}
                      value={
                        this.state.ngayKhoiChieu ? this.state.ngayKhoiChieu : ""
                      }
                      name="ngayKhoiChieu"
                      id="ngayKhoiChieu"
                    />
                  </div>
                  <div className="form-group">
                    <label>Hình Ảnh:</label>
                    <input
                      type="file"
                      className="form-control"
                      name="hinhAnh"
                      onChange={this.handleChangeAdd}
                      placeholder="Chỉ được nhập link ảnh từ nguồn Khác"
                    />
                  </div>
                  <div className="form-group">
                    <label>Đánh Giá:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="danhGia"
                      onChange={this.handleChangeAdd}
                      placeholder="Nhập đánh giá từ 1 đến 5"
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô Tả:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="moTa"
                      onChange={this.handleChangeAdd}
                      placeholder="Nhập Mô Tả Phim"
                    />
                  </div>
                  <button type="submit" className="btn btn-update btnADDMovie">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btnCloseMovie"
                    data-dismiss="modal"
                  >
                    Cancle
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteMovie: movie => {
      dispatch(action.actDeleteMovie(movie));
    },
    updateMovie: tk => {
      dispatch(action.actUpdateMovie(tk));
    },
    addMovie: tk => {
      dispatch(action.actThemMovie(tk));
    },
    addImageMovie: image => {
      dispatch(action.actthemHinhAnhPhim(image));
    }
  };
};
export default connect(null, mapDispatchToProps)(Paginition);
