import React, { Component } from 'react'
import * as Action from "../redux/action/index.js";
import DanhSachPhimHomeTool from "./DanhSachPhimHomeTool"
import { connect } from 'react-redux'

class HomeTool extends Component {
  constructor(props){
    super(props);
      this.state={
        id:"",
        maRap:"",
      }
    }
 componentDidUpdate(){
  this.props.getMovieDateTime(this.state.id)
  //  if(this.props.movieDate!== prevProps.id){
  //    this.props.getMovieDateTime(this.state.id);
  //  }
 }
  renderDanhSachPhim=()=>{
    return this.props.listMovie.map((MovieList, index)=>{
      return <DanhSachPhimHomeTool key={index} MovieList={MovieList}/> 
    })
  };
  renderDanhSachRap =()=>{
    if( this.props.movieDate.heThongRapChieu){
      return this.props.movieDate.heThongRapChieu.map((item,index)=>{
        return (
          <React.Fragment key={index} >
           <option value={item.maHeThongRap}>{item.tenHeThongRap}</option>
          </React.Fragment>
        )
      })
    }
  };
  handlingChange=(event)=>{
    this.setState({
      id:event.target.value,
    })
  }
  handlingChangeTheater=event =>{
    this.setState({
      maRap:event.target.value
    });
  }
  render() {
    return (
      <div className="wrapper d-flex home-tool">
    <select value={this.movieName} className="form-control selectChoice" onChange={this.handlingChange}>
    <option>Chọn phim </option>
     {this.renderDanhSachPhim()}
    </select>
    <select className="form-control selectChoice" onChange={this.handlingChangeTheater}>
      <option>Chọn Rạp</option>
     {this.renderDanhSachRap()}
    </select>
    <select className="form-control selectChoice">
      <option>Ngày Xem</option>
      {/* {this.renderNgayChieu} */}
    </select>
    <select className="form-control selectChoice">
      <option>Suất Chiếu</option>
    </select>
    <button className="btn-datve btn btn-primary">Mua vé ngay</button>
  </div>
    )
  }
}
  const mapStatetoProps = state=>({
    listMovie : state.movieReducer.listMovie,
    movie: state.movieReducer.movie,
    movieDate: state.movieReducer.movieDate,
  })
  const mapDispatchToProps = dispatch => {
    return {
      getdetailMovie: id => {
        dispatch(Action.actGetDetailMovieAPI(id));
      },
      getMovieDateTime:(ve)=>{
        dispatch(Action.actGetDateTimeMovie(ve))
      },
    };
  };
export default connect(mapStatetoProps,mapDispatchToProps) (HomeTool);