import React, { Component } from 'react';
import Movie from "./../../Components/movie.js";
import { connect } from 'react-redux';
import * as  Action from "./../../redux/action/index.js"
class Listmovie extends Component {
    componentDidMount(){
        this.props.getListMovie();
    }
    renderHTML =()=>{
       let {listMovie} =this.props; 
         return listMovie.map((movie, index)=>{
             return <Movie key={index} movie ={movie} />
          })
    }
    render() {
        return (
            <div className="container-fluid list-movie" >
            <div className="row container mx-auto" >
            {this.renderHTML()}
            </div>
            </div>
        )
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
export default connect (mapStateToProps, mapDispatchToProps)(Listmovie); 