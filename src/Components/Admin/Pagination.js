import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action";
import * as Icon from "@material-ui/icons";
import * as Core from "@material-ui/core";
import { Pagination, Alert, AlertTitle } from "@material-ui/lab/";
import SelectEntriesOption from "./SelectEntriesOption";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import TableHeadUserTable from "../Admin/TableHeadUser";
import ModalEditUser from "../Admin/ModalEditUser";
class Paginition extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      dataUser: [],
      currentPage: 0,
      pageCount: 0,
      keyWord: "",
      taiKhoanDelete: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      addNewUserData: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDT: "",
        hoTen: "",
        maLoaiNguoiDung: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.getUserList();
  }
  componentWillReceiveProps() {
      if (this.state.dataUser != this.props.userList) {
        this.setState(
          {
            dataUser: this.props.userList
          },
          () => {
            this.receivedData();
          }
        );
      }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeSearch = e => {
    if (e.target.value !== "") {
      this.setState(
        {
          keyWord: e.target.value
        },
        () => this.props.searchUser(this.state.keyWord)
      );
    } else {
      this.setState({
        keyWord: "",
        offset: 0
      });
    }
  };
  handleDelete =async event => {
    event.persist()
    const eventValue = event.target.value
    this.props.deleteUser(eventValue);
    this.setState({
      taiKhoanDelete:eventValue
    },()=>{this.props.getUserList()
    })
    await this.props.getUserList()
    if(this.props.userList){
      let a =this.props.userList
      this.setState({
        dataUser:a
      },()=>{this.props.getUserList()})
    }
  };
  handleEdit = event => {
    event.persist();
    let taiKhoan = event.target.value;
    this.setState(
      {
        taiKhoan
      },
      () => this.props.getUserInformation({ taiKhoan })
    );
  };

 async receivedData() {  
    const data = (this.state.keyWord==="")?(await this.state.dataUser):(await this.props.keyWord)
        const slice =await data.slice(
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
                    <IconButton onClick={this.handleEdit} value={pd.taiKhoan} data-toggle="modal" data-target="#myModal" aria-label="Add">
                       <Icon.Edit/>
                     </IconButton>
                      <IconButton onClick={this.handleDelete} value={pd.taiKhoan} aria-label="delete">
                       <Icon.Delete/>
                     </IconButton>
                      <Link
                        to={`/quan-ly-ve/${pd.taiKhoan}`}
                        value={pd.taiKhoan}
                      >
                        <IconButton>
                       <Icon.ArrowForward />
                     </IconButton>
                      </Link>
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
            postData,
          });
        }
  }
  handleChange = e => {
    const selectedPage = parseInt(e.target.innerHTML);
    const offset = (selectedPage - 1) * this.state.perPage;
    if (selectedPage === 1) {
      this.setState(
        {
          currentPage: 0,
          offset: 0
        },
        () => {
          this.receivedData();
        }
      );
    } else {
      this.setState(
        {
          currentPage: selectedPage,
          offset: offset
        },
        () => {
          this.receivedData();
        }
      );
    }
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
      return (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Chọn Người Dùng Trước
        </Alert>
      );
    } else {
      e.preventDefault();
      this.props.addUser(this.state.addNewUserData);
    }
  };
  render() {
    return (
      <div>
        <div className="limiter">
          <div id="myModalAdd" className="modal fade" role="dialog">
            <div className="modal-dialog">
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
          <div className="selectEntries d-flex">
            <select className="mr-5" onChange={this.handlingChange}>
              <SelectEntriesOption />
            </select>
            <Core.FormControl>
              <Core.InputLabel htmlFor="input-with-icon-adornment">
                Search User
              </Core.InputLabel>
              <Core.Input
                id="input-with-icon-adornment"
                onChange={this.handleChangeSearch}
                startAdornment={
                  <Core.InputAdornment position="start">
                    <Icon.AccountCircle />
                  </Core.InputAdornment>
                }
              />
            </Core.FormControl>
          </div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver2 m-b-110">
                <TableHeadUserTable />
                {this.state.postData}
                <div className="d-flex">
                  <Pagination
                    onChange={this.handleChange}
                    pages={this.state.postData}
                    count={this.state.pageCount - 1}
                    color="secondary"
                    hidePrevButton
                    hideNextButton
                    size="large"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalEditUser idUser={this.state.taiKhoan} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    keyWord: state.movieReducer.keyWord,
    userList: state.movieReducer.userList,
    loading: state.movieReducer.loading,
    userInformation: state.movieReducer.userInformation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchUser: id => {
      dispatch(action.actSearchUser(id));
    },
    deleteUser: tk => {
      dispatch(action.actDeleteUser(tk));
    },
    getUserInformation: tk => {
      dispatch(action.actLayThongTinUser(tk));
    },
    addUser: user => {
      dispatch(action.actThemNguoiDung(user));
    },
    getUserList: () => {
      dispatch(action.actGetUserList());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Paginition);
