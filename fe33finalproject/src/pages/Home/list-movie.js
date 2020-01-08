import React, { Component } from 'react';
import Movie from "./../../Components/movie.js";
import { connect } from 'react-redux';
import * as  Action from "./../../redux/action/index.js"
import SVGLoading from "../../Components/loading"
class Listmovie extends Component {
    componentDidMount(){
        this.props.getListMovie();
        this.props.setloading();
    }
    renderHTML =()=>{
       let {listMovie, loading} =this.props; 
       if(loading){
           return <div className="loading-spinner"><SVGLoading /></div>
       }
         return listMovie.map((movie, index)=>{
             return <Movie key={index} movie ={movie} />
          })
    }
    render() {
        return (
            <div className="container-fluid list-movie">
            <div className="row container mx-auto" >
            {this.renderHTML()}
            </div>
            </div>
        )
    }
}
const mapStateToProps =state=>({
        listMovie : state.movieReducer.listMovie,
        loading : state.movieReducer.loading
})
const mapDispatchToProps =(dispatch)=>{
    return {
        getListMovie:()=>{
            dispatch(Action.actGetListMovieAPI())
        },
        setloading :()=>{
            dispatch(Action.actLoading())
        }
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(Listmovie); 