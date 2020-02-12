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
      taiKhoanDelete: "",
      taiKhoan: "",
      matKhau: "",
      email:"",
      soDt:"",
      hoTen:"",
      sumbitData:{
      taiKhoan: "",
      matKhau: "",
      email:"",
      soDt:"",
      hoTen:""
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
    if(this.state.keyWord ===""){
      let keyWord = e.target.value;
      this.setState({
        keyWord,
        searchData:""
      })
    }
    else{
      let keyWord = e.target.value
      this.setState({
        keyWord,
        searchData: this.props.keyWord
      },this.props.searchUser(keyWord))
    }
  };
  handleChangeEdit =e =>{
    let target = e.target;
    let name  = target.name;
    let value = target.value;
    this.setState({
      [name]:value,
      sumbitData:{
        taiKhoan : this.state.taiKhoan,
        hoTen : this.state.hoTen,
        email: this.state.email,
        soDt : this.state.soDt,
        matKhau: this.state.matKhau,
        maLoaiNguoiDung: this.state.maLoaiNguoiDung,
        maNhom:"GP01",
        [name]: value,
      }
    },()=>{
      console.log(this.state);
    });
  }
  handleDelete = e => {
    this.setState(
      {
        taiKhoanDelete: e.target.value
      },
      () => {
        this.props.deleteUser(this.state.taiKhoanDelete);
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
    // let hoTen = e.target.getAttribute("hoten");
    // let email = e.target.getAttribute("email");
    // let soDt = e.target.getAttribute("sodt");
    // let matKhau = e.target.getAttribute("matkhau");
    // let taiKhoan = e.target.value;
    // let maLoaiNguoiDung = e.target.getAttribute("maloainguoidung");
    //   this.setState({
    //     taiKhoan,
    //     email,
    //     soDt,
    //     matKhau,
    //     hoTen,
    //     maLoaiNguoiDung,
    //     sumbitData:{
    //         maNhom:"GP01",
    //         taiKhoan,
    //         email,
    //         soDt,
    //         matKhau,
    //         hoTen,
    //         maLoaiNguoiDung,
    //     }
    //   },console.log(this.state)
    //   )
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
                      <td className="cell100 column5">{pd.ngayKhoiChieu}</td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.maPhim}
                          className="btn btnEdit btn-success"
                          maloainguoidung = {pd.maLoaiNguoiDung}
                          // hoten = {pd.hoTen}
                          // email = {pd.email}
                          // sodt ={pd.soDt}
                          // matkhau ={pd.matKhau}
                          data-toggle="modal" data-target="#myModal"
                        >
                           <FontAwesomeIcon icon={faUserEdit} />
                        </button>
                        <button
                          // onClick={this.handleDelete}
                          // value={pd.taiKhoan}
                          // maloainguoidung = {pd.maLoaiNguoiDung}  
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
                      <td className="cell100 column5">{pd.ngayKhoiChieu}</td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          // value={pd.taiKhoan}
                          className="btn btnEdit btn-success"
                          // maloainguoidung = {pd.maLoaiNguoiDung}
                        >
                           <FontAwesomeIcon icon={faUserEdit} />
                        </button>
                        <button
                          onClick={this.handleDelete}
                          value={pd.taiKhoan}
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
        <div className="limiter">
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-2 my-2 my-md-0 col-md-10 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0 small"
                onChange={this.handleChangeSearch}
                placeholder="Search for..."
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
                <h4 className="modal-title">Edit User</h4>
              </div>
              <div className="modal-body">
              <form onSubmit={this.handleSubmitEdit}>
                        <div className="form-group">
                          <label>Tài Khoản:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="taiKhoan"
                            value={this.state.taiKhoan ? this.state.taiKhoan: ""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập Họ và Tên"
                          />
                        </div>
                        <div className="form-group">
                          <label>Họ Tên:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="hoTen"
                            value={this.state.hoTen ? this.state.hoTen: ""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập Họ và Tên"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            name="matKhau"
                            autoComplete="password"
                            value={this.state.matKhau ? this.state.matKhau :""}
                            onChange={this.handleChangeEdit }
                            placeholder="Nhập Password"
                          />
                        </div>
                        <div className="form-group">
                          <label>Số Điện Thoại:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="soDt"
                            value={this.state.soDt ? this.state.soDt :""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập số điện thoại"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={this.state.email ? this.state.email :""}
                            onChange={this.handleChangeEdit}
                            placeholder="Nhập Email"
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
const mapStateToProps = state => {
  return {
    keyWord: state.movieReducer.keyWord,
    loading: state.movieReducer.loading,
    userInformation: state.movieReducer.userInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(action.actGetUserList());
    },
    searchUser: id => {
      dispatch(action.actSearchUser(id));
    },
    deleteUser: tk => {
      dispatch(action.actDeleteUser(tk));
    },
    getUserInformation: tk =>{
      dispatch(action.actLayThongTinUser(tk))
    },
    updateUser: tk =>{
      dispatch(action.actUpdateUserInformation(tk))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginition);
