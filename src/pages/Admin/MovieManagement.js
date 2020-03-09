import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../Store/action";
import moment from "moment";
import * as Icon from "@material-ui/icons";
// import * as Core from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TableMovieHead from "../../Components/Admin/TableandSideBar/TableHead";
import SelectEntriesOption from "../../Components/Admin/SelectEntriesOption"
import Pagination from '@material-ui/lab/Pagination';
import ModalEditMovie from "../../Components/Admin/Modal/ModalEditMovie"
class MovieManagement extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      listMovie :[],
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
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.getMovieList()
    this.receivedData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  UNSAFE_componentWillReceiveProps=async(nextProps)=> {
    if ((await this.state.listMovie !==await this.props.listMovie)|| (this.state.deleted)) {
      this.setState(
        {
            listMovie: nextProps.listMovie
        },
        () => {
          this.receivedData();
        }
      );
    }
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
  handleDelete = async event => {
    event.persist()
    this.props.deleteMovie(event.target.value)
    this.setState({
          maPhimDelete: event.target.value,
          deleted:true
        });
        await this.props.getMovieList()
        if(this.props.listMovie){
            let a = await this.props.listMovie
            this.setState({
                listMovie:a
            },()=>{this.props.getMovieList()})
          }
    }
    componentDidCatch(error, errorInfo) {
        console.log(error)
        console.log(errorInfo)
      }
componentDidUpdate(){
    console.log(this.props.listMovie)
}
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
  async receivedData(){
          const data = this.state.listMovie;
          const slice = await data.slice(
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
                        <IconButton onClick={this.handleEdit} value={pd.maPhim} data-toggle="modal" data-target="#myModal" aria-label="Add">
                             <Icon.Edit />
                        </IconButton>
                        <IconButton onClick={this.handleDelete} value={pd.maPhim} aria-label="delete">
                             <Icon.Delete />
                           </IconButton>
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
  };
  handleChange = e => {
    const selectedPage = parseInt(e.target.innerHTML)
    console.log(selectedPage)
    const offset = (selectedPage-1) * this.state.perPage;
    if(selectedPage===1){
      this.setState(
        {
          currentPage: 0,
          offset: 0
        },
        () => {
          this.receivedData();
        }
      );
    }
    else{
      this.setState(
        {
          currentPage: selectedPage,
          offset,
        },
        () => {
          this.receivedData();
        }
      );
    }
    };
  handlingChange = e => {
    let perPage = e.target.value;
    this.setState({
        perPage
      },
      () => {
        this.receivedData();
      })};
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
              <Pagination onChange={this.handleChange} pages={this.state.postData} containerclassname={"pagination"} subcontainerclassname={"pages pagination"} count={this.state.pageCount} color="secondary" hidePrevButton hideNextButton/>
              </div>
            </div>
          </div>
        </div>
        <ModalEditMovie idPhim={this.state.maPhim} />
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
                    Cancel
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
const mapStateToProps = state => {
    return {
        listMovie: state.movieReducer.listMovie,
    };
  };
const mapDispatchToProps = dispatch => {
  return {
    getMovieList:() => {
        dispatch(action.actGetListMovieAPI());
      },
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
export default connect(mapStateToProps, mapDispatchToProps)(MovieManagement);
