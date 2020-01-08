import React, { Component } from "react";
import { connect } from 'react-redux';
import * as  Action from "../../redux/action/index"
import Carousel from "./../../Components/carousel";
import HomeTool from "../../Components/home-tool";
import MovieAvailable from "../../Components/MovieAvailable";
import UpComingMovie from "../../Components/UpcomingMovie";
class Home extends Component {
  componentDidMount(){
    this.props.getListMovie();
    
}
renderHTML =()=>{
   let {listMovie} =this.props; 
     return listMovie.map((movie, index)=>{
         return <HomeTool key={index} movie ={movie} />
      })
}
  render() {
    return (
      <div>
        <Carousel/>
        <div>
        <nav>
          <div className="nav nav-tabs mt-5 mb-2 pt-2" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-dang-chieu" aria-selected="true">Đang Chiếu</a>
            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-sap-chieu" aria-selected="false">Sắp Chiếu</a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
         <> 
         <MovieAvailable /> 
         <UpComingMovie />
         </>
        </div>
      </div>
        {this.renderHTML()}
      </div>
    );
  }
}
const mapStateToProps =state=>({
  listMovie : state.movieReducer.listMovie
})
const mapDispatchToProps =(dispatch)=>{
return {
  getListMovie:()=>{
      dispatch(Action.actGetListMovieAPI())
  }
}
}
export default connect (mapStateToProps,mapDispatchToProps)(Home)
