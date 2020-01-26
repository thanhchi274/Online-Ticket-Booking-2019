import React, { Component } from 'react'
import DanhSachPhimHomeTool from "./DanhSachPhimHomeTool"
import DanhSachRapHomeTool from "./DanhSachRapHomeTool"
import { connect } from 'react-redux'
class HomeTool extends Component {

  renderDanhSachPhim=()=>{
    return this.props.listMovie.map((MovieList, index)=>{
      return <DanhSachPhimHomeTool key={index} MovieList={MovieList}/> 
    })
  }
  renderDanhSachRap=()=>{
    return this.props.movie.lichChieu.map((MovieListRap, index)=>{
      return <DanhSachRapHomeTool key={index} MovieListRap = {MovieListRap} /> 
    })
  }
  render() {
    let {movie, listMovie} = this.props
    return(
  <div className="wrapper d-flex home-tool">
    <select className="form-control selectChoice">
     {this.renderDanhSachPhim()}
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
  </div>)
  }}
const mapStatetoProps = state=>({
  listMovie : state.movieReducer.listMovie,
  movie: state.movieReducer.movie
})
  export default connect(mapStatetoProps,null) (HomeTool);
