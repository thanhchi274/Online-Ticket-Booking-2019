import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../redux/action";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit,faTrash,faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class Paginition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      pageCount: 0,
      searchData: [],
      keyWord: "",
      maPhimDelete: "",
      maPhim:"",
      tenPhim: "",
      biDanh: "",
      trailer:"",
      hinhAnh:"",
      ngayKhoiChieu:"",
      sumbitDataMovie:{
      maPhim:"",
      tenPhim: "",
      biDanh: "",
      trailer:"",
      hinhAnh:"",
      moTa:"",
      maNhom:"GP01",
      ngayKhoiChieu:"",
      danhGia:0
      }
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      this.receivedData();
    }, 100);
  }

  handleChangeSearch=(e)=>{
  };
  handleChangeEdit =e =>{
    let target = e.target;
    let name  = target.name;
    let value = target.value;
    this.setState({
      [name]:value,
      sumbitDataMovie:{
        maPhim: this.state.maPhim,
        tenPhim: this.state.tenPhim,
        biDanh: this.state.biDanh,
        trailer: this.state.trailer,
        [name]:value,
      }
    },()=>{
      console.log(this.state);
    })
  }
  handleDelete = e => {
    this.setState(
      {
        maPhimDelete: e.target.value
      },
      () => {
        this.props.deleteMovie(this.state.maPhimDelete);
      }
    );
  };
  handleSubmitEdit = e=>{
    this.setState({
      ...this.state.sumbitData,
    }, this.props.updateUser(this.state.sumbitData))
    e.preventDefault();
  }
  handleEdit= (e)=>{
    let tenPhim = e.target.getAttribute("tenphim");
    let biDanh = e.target.getAttribute("bidanh");
    let trailer = e.target.getAttribute("trailer");
    let danhGia = e.target.getAttribute("danhgia");
    let maPhim = e.target.value;
      this.setState({
        maPhim,
        tenPhim,
        biDanh,
        trailer,
        danhGia,
        sumbitDataMovie:{
          maPhim: this.state.maPhim,
          tenPhim: this.state.tenPhim,
          biDanh: this.state.biDanh,
          trailer: this.state.trailer,
          hinhAnh:"",
          moTa:"",
          maNhom:"GP01",
          ngayKhơiChieu:"",
          danhGia:0
          }
      },console.log(this.state)
      )
  }
  receivedData() {
    axios
      .get(
        `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`
      )
      .then(res => {
        if (this.state.keyWord === "") {
          const data = res.data;
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          let postData = slice.map((pd, index) => 
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
                      <td className="cell100 column5">{new Date(pd.ngayKhoiChieu).toDateString()}</td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.maPhim}
                          className="btn btnEdit btn-success"
                          tenphim = {pd.tenPhim}
                          bidanh = {pd.biDanh}
                          trailer ={pd.trailer}
                          hinhanh ={pd.hinhAnh}
                          ngaykhoichieu={pd.ngayKhoiChieu}
                          danhgia ={pd.danhGia}
                          data-toggle="modal" data-target="#myModal"
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
                        <Link
                          to="/quan-ly-ve"
                          value={pd.taiKhoan}
                          className="btn btnTicket btn-info"
                        >
                          <FontAwesomeIcon icon={faTicketAlt} />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>)
              this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                postData
              });
        }
        if (this.state.keyWord !== "") {
          const data = this.props.keyWord;
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          let postData = slice.map((pd, index) => 
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
                      <td className="cell100 column5">{new Date(pd.ngayKhoiChieu).toDateString()}</td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.maPhim}
                          className="btn btnEdit btn-success"
                          tenphim = {pd.tenPhim}
                          bidanh = {pd.biDanh}
                          trailer ={pd.trailer}
                          hinhanh ={pd.hinhAnh}
                          ngaykhoichieu={pd.ngayKhoiChieu}
                          danhgia ={pd.danhGia}
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
                        <button
                          to="/quan-ly-ve"
                          value={pd.taiKhoan}
                          className="btn btnTicket btn-info"
                          data-toggle="modal" data-target="#myModal"
                        >
                         <FontAwesomeIcon icon={faTicketAlt} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>)
          this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData
          });
        }
      });
  }
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
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-2 my-2 my-md-0 col-md-10 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0 small"
                onChange={this.handleChangeSearch}
                placeholder="Search movie by name"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
            </div>
          </form>
          <div className="selectEntries d-flex">
            <span>Choose Display Entries</span>
            <select onChange={this.handlingChange}>
              <option value={10}>Select entries:</option>
              <option value={10}>10 </option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button className="btnAddPhim btn btn-success">Add Phim</button>
          </div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver2 m-b-110">
                <div className="table100-head">
                  <table>
                    <thead>
                      <tr className="row100 head MovieManagement">
                        <th className="cell100 column1">Mã Phim</th>
                        <th className="cell100 column2">Tên Phim</th>
                        <th className="cell100 column6">Bí Danh</th>
                        <th className="cell100 column3">Trailer</th>
                        <th className="cell100 column4">Hình Ảnh</th>
                        <th className="cell100 column5">Ngày Khởi Chiếu</th>
                        <th className="cell100 column7">Action</th>
                      </tr>
                    </thead>
                  </table>
                </div>
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
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Phim</h4>
              </div>
              <div className="modal-body">
              <form onSubmit={this.handleSubmitEdit}>
                        <div className="form-group">
                          <label>Mã Phim:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="taiKhoan"
                            value={this.state.maPhim ? this.state.maPhim: ""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập Mã Phim"
                          />
                        </div>
                        <div className="form-group">
                          <label>Tên Phim:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="hoTen"
                            value={this.state.tenPhim ? this.state.tenPhim: ""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập Tên Phim"
                          />
                        </div>
                        <div className="form-group">
                          <label>Bí Danh:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="matKhau"
                            autoComplete="password"
                            value={this.state.biDanh ? this.state.biDanh :""}
                            onChange={this.handleChangeEdit }
                            placeholder="Nhập Bí Danh Phim"
                          />
                        </div>
                        <div className="form-group">
                          <label>Trailer:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="soDt"
                            value={this.state.trailer ? this.state.trailer :""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập đường dẫn trailer Youtube"
                          />
                        </div>
                        <div className="form-group">
                          <label>Ngày Khởi Chiếu:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="soDt"
                            value={this.state.ngayKhơiChieu ? this.state.ngayKhơiChieu :""}
                            onChange={this.handleChangeEdit}
                            placeholder="Thêm Ngày Khởi Chiếu"
                          />
                        </div>
                        <div className="form-group">
                          <label>Hình Ảnh:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={this.state.email ? this.state.email :""}
                            onChange={this.handleChangeEdit}
                            placeholder="Chỉ được nhập link ảnh từ nguồn Khác"
                          />
                        </div>
                        <div className="form-group">
                          <label>Đánh Giá:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={this.state.email ? this.state.email :""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập đánh giá từ 1 đến 5"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-update btn-success"
                        >
                          Cập nhật
                        </button>
                      </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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
    searchUser: id => {
      dispatch(action.actSearchUser(id));
    },
    deleteMovie: movie => {
      dispatch(action.actDeleteMovie(movie));
    },
    updateUser: tk =>{
      dispatch(action.actUpdateUserInformation(tk))
    }
  };
};
export default connect(null, mapDispatchToProps)(Paginition);
