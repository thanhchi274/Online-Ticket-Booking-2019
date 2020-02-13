import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../redux/action";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from '@material-ui/lab/Skeleton';
import {
  faUserEdit,
  faTrash,
  faTicketAlt
} from "@fortawesome/free-solid-svg-icons";
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
      email: "",
      soDt: "",
      hoTen: "",
      sumbitData: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        hoTen: ""
      },
      addNewUserData: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDT: "",
        hoTen: "",
        maLoaiNguoiDung: ""
      }
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      this.receivedData();
    }, 100);
  }
  handleChangeSearch = e => {
    if (this.state.keyWord === "") {
      let keyWord = e.target.value;
      this.setState({
        keyWord,
        searchData: ""
      });
    } else {
      let keyWord = e.target.value;
      this.setState(
        {
          keyWord,
          searchData: this.props.keyWord
        },
        this.props.searchUser(keyWord)
      );
    }
  };
  handleChangeEdit = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState(
      {
        [name]: value,
        sumbitData: {
          taiKhoan: this.state.taiKhoan,
          hoTen: this.state.hoTen,
          email: this.state.email,
          soDt: this.state.soDt,
          matKhau: this.state.matKhau,
          maLoaiNguoiDung: this.state.maLoaiNguoiDung,
          maNhom: "GP01",
          [name]: value
        }
      },
      () => {
        console.log(this.state);
      }
    );
  };
  handleDelete = async e => {
    console.log(e.target.value);
    try {
      await this.setState(
        {
          taiKhoanDelete: e.target.value
        },
        () => {
          this.props.deleteUser(this.state.taiKhoanDelete);
        }
      );
    } catch (err) {
      alert("Bạn thao tác quá nhanh, Xin thử lại");
    }
  };
  handleSubmitEdit = e => {
    this.setState(
      {
        ...this.state.sumbitData
      },
      this.props.updateUser(this.state.sumbitData)
    );
    e.preventDefault();
  };
  handleEdit = e => {
    let hoTen = e.target.getAttribute("hoten");
    let email = e.target.getAttribute("email");
    let soDt = e.target.getAttribute("sodt");
    let matKhau = e.target.getAttribute("matkhau");
    let taiKhoan = e.target.value;
    let maLoaiNguoiDung = e.target.getAttribute("maloainguoidung");
    this.setState(
      {
        taiKhoan,
        email,
        soDt,
        matKhau,
        hoTen,
        maLoaiNguoiDung,
        sumbitData: {
          maNhom: "GP01",
          taiKhoan,
          email,
          soDt,
          matKhau,
          hoTen
        }
      },
      console.log(this.state)
    );
  };
  receivedData() {
    axios
      .get(
        `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`
      )
      .then(res => {
        if (this.state.keyWord === "") {
          const data = res.data;
          const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          let postData = slice.map((pd, index) => (
            <React.Fragment key={index}>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    <tr className="row100 body">
                      <td className="cell100 column1">{pd.taiKhoan}</td>
                      <td className="cell100 column2">{pd.hoTen}</td>
                      <td className="cell100 column3">{pd.email}</td>
                      <td className="cell100 column4">{pd.soDt}</td>
                      <td className="cell100 column5">{pd.maLoaiNguoiDung}</td>
                      <td className="cell100 column6">{pd.matKhau}</td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.taiKhoan}
                          className="btn btnEdit btn-success"
                          maloainguoidung={pd.maLoaiNguoiDung}
                          hoten={pd.hoTen}
                          email={pd.email}
                          sodt={pd.soDt}
                          matkhau={pd.matKhau}
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <FontAwesomeIcon icon={faUserEdit} />
                        </button>
                        <button
                          onClick={this.handleDelete}
                          value={pd.taiKhoan}
                          maloainguoidung={pd.maLoaiNguoiDung}
                          className="btn btnDelete btn-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <Link
                          to={`/quan-ly-ve/${pd.taiKhoan}`}
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
            </React.Fragment>
          ));
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
          let postData = slice.map((pd, index) => (
            <React.Fragment key={index}>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    <tr className="row100 body">
                      <td className="cell100 column1">{pd.taiKhoan}</td>
                      <td className="cell100 column2">{pd.hoTen}</td>
                      <td className="cell100 column3">{pd.email}</td>
                      <td className="cell100 column4">{pd.soDt}</td>
                      <td className="cell100 column5">{pd.maLoaiNguoiDung}</td>
                      <td className="cell100 column6">{pd.matKhau}</td>
                      <td className="cell100 column7">
                        <button
                          onClick={this.handleEdit}
                          value={pd.taiKhoan}
                          className="btn btnEdit btn-success"
                          maloainguoidung={pd.maLoaiNguoiDung}
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
                          to={`/quan-ly-ve/${pd.taiKhoan}`}
                          value={pd.taiKhoan}
                          className="btn btnTicket btn-info"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <FontAwesomeIcon icon={faTicketAlt} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ));
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
  chooseMLND = e => {
    this.setState({
      addNewUserData: {
        ...this.state.addNewUserData,
        maLoaiNguoiDung: e.target.value
      }
    });
  };
  handleAddUser = e => {
    let { name, value } = e.target;
    this.setState(
      {
        [name]: value,
        addNewUserData: {
          maNhom: "GP01",
          taiKhoan: this.state.taiKhoan,
          email: this.state.email,
          soDt: this.state.soDt,
          matKhau: this.state.matKhau,
          hoTen: this.state.hoTen
        }
      },
      () => {
        console.log(this.state);
      }
    );
  };
  handleOnAddNew = e => {
    if (this.state.addNewUserData.maLoaiNguoiDung === "") {
      e.preventDefault();

      return alert("Chọn loại Người Dùng Trước");
    } else {
      e.preventDefault();
      console.log(this.state.addNewUserData);
      this.props.addUser(this.state.addNewUserData);
    }
  };
  render() {
    return (
      <div>
        <div className="limiter">
          <div id="myModalAdd" className="modal fade" role="dialog">
            <div className="modal-dialog">
              {/* Modal content*/}
              <div className="modal-content">
                <div className="modal-body">
                  <form onSubmit={this.handleOnAddNew}>
                    <div className="form-group">
                      <label htmlFor="">Tài Khoản</label>
                      <input
                        type="text"
                        className="form-control"
                        name="taiKhoan"
                        onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="matKhau"
                        onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Họ Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={this.handleAddUser}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Số Điện Thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soDt"
                        onChange={this.handleAddUser}
                      />
                    </div>

                    <div className="form-group choiceTypeUser">
                      <label>Mã Loại Người Dùng:</label>
                      <select onChange={this.chooseMLND}>
                        <option value="">Mời Bạn Chọn</option>
                        <option value="KhachHang">Khách Hàng</option>
                        <option value="QuanTri">Quản Trị</option>
                      </select>
                    </div>
                    <button type="submit" className="btnADDUSER">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btnCloseAddUser"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

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
            <button
              className="btnAddUser btn btn-success"
              data-toggle="modal"
              data-target="#myModalAdd"
            >
              Add User
            </button>
          </div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver2 m-b-110">
                <div className="table100-head">
                  <table>
                    <thead>
                      <tr className="row100 head">
                        <th className="cell100 column1">Tài Khoản</th>
                        <th className="cell100 column2">Họ Tên</th>
                        <th className="cell100 column3">Email</th>
                        <th className="cell100 column4">Số ĐT</th>
                        <th className="cell100 column5">Type</th>
                        <th className="cell100 column6">Mật khẩu</th>
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
                      value={this.state.taiKhoan ? this.state.taiKhoan : <Skeleton animation="wave" variant="text" width="250px" />}
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
                      value={this.state.hoTen ? this.state.hoTen : <Skeleton animation="wave" variant="text" width="250px" />}
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
                      value={this.state.matKhau ? this.state.matKhau : <Skeleton animation="wave" variant="text" width="250px" />}
                      onChange={this.handleChangeEdit}
                      placeholder="Nhập Password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số Điện Thoại:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soDt"
                      value={this.state.soDt ? this.state.soDt : <Skeleton animation="wave" variant="text" width="250px" />}
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
                      value={this.state.email ? this.state.email : <Skeleton animation="wave" variant="text" width="250px" />}
                      onChange={this.handleChangeEdit}
                      placeholder="Nhập Email"
                    />
                  </div>
                  <button type="submit" className="btn btn-update btn-success">
                    Cập nhật
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
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
    getUserInformation: tk => {
      dispatch(action.actLayThongTinUser(tk));
    },
    updateUser: tk => {
      dispatch(action.actUpdateUserInformation(tk));
    },
    addUser: user => {
      dispatch(action.actThemNguoiDung(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginition);
