
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import * as action from "../../redux/action";
import ReactPaginate from 'react-paginate';
class Paginition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      pageCount: 0
};
this.handlePageClick = this.handlePageClick.bind(this);
};
componentDidMount() {
  this.receivedData()
}
handleEdit=(e)=>{
console.log(e.target.value);}
receivedData() {
  axios
      .get(`http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`)
      .then(res => {
          const data = res.data;
          console.log(data.length)
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
          const postData = slice.map((pd,index) => 
          <React.Fragment key={index} >
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
                  <button onClick={this.handleEdit} value={pd.taiKhoan} className="btn btnEdit btn-success">Edit</button>
                  <button  onClick={this.handleDelete} value={index} className="btn btnDelete btn-danger">Delete</button>
                  </td>
								</tr>
							</tbody>
						</table>
					</div>
          </React.Fragment>)

          this.setState({
              pageCount: Math.ceil(data.length / this.state.perPage),
              postData
          })
      });
}
handlePageClick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;

  this.setState({
      currentPage: selectedPage,
      offset: offset
  }, () => {
      this.receivedData()
  });
};
handlingChange =(e)=>{
  let perPage = e.target.value;
  this.setState({
    perPage,
  },()=>{
    this.receivedData()
  })
}
  render() {
    return (
      <div>
      <div className="limiter">
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-2 my-2 my-md-0 col-md-10 navbar-search" >
            <div className="input-group">
              <input type="text" className="form-control border-0 small" onChange={(e)=>{this.props.keyWord(e.target.value)}} placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btnSearch" type="button">
               Search
                </button>
              </div>
            </div>
          </form>
      <div className="selectEntries d-flex">
      <span>Choose Display Entries</span>
            <select onChange={this.handlingChange}>
              <option value={0}>Select entries:</option>
              <option value={10}>10 </option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              
            </select>
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
          activeClassName={"active"}/>
			</div>
		</div>
    
	</div>
  </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    userList: state.movieReducer.userList,
    loading: state.movieReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList:() => {
      dispatch(action.actGetUserList());
    },
    setLoading: () => {
      dispatch(action.actLoading());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Paginition)