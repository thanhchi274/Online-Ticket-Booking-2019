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
            <div className="container">
            <div className="row">
            {this.renderHTML()}
            </div>
            </div>
        )
    }
}
const mapStateToProps =state=>({
        listMovie : state.movieReducer.listMovie,
})
const mapDispatchToProps =(dispatch)=>{
    return {
        getListMovie:()=>{
            dispatch(Action.actGetListMovieAPI())
        }
        // getListMovie: (listMovie)=>{
        //     let action ={
        //         type: "GET_LIST_MOVIE",
        //         listMovie,
        //     }
        //     dispatch(action)
        // }
        
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(Listmovie); 