import React, { Component } from 'react';
import Carousel from "./../../Components/carousel";
import { connect } from 'react-redux';
import * as  Action from "./../../redux/action/index.js"
class ListMovieCarousel extends Component {
    componentDidMount(){
        this.props.getListMovieCarousel();
    }
    renderHTML=()=>{
        let {listMovieCarousel}= this.props
        return listMovieCarousel.map((carousel,index)=>{
            return <Carousel key={index} carousel ={carousel} />
        })
    }
    render() {
        console.log("render")
        return (
            <div className = "container">
                {this.renderHTML()}
            </div>
        )
    }
}
const mapStateToProps = state =>({
    listMovieCarousel : state.movieReducer.listMovieCarousel,
});
const mapDispatchToProps =(dispatch)=>{
    return {
        getListMovieCarousel:()=>{
            dispatch(Action.actGetMovieCarouselAPI())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (ListMovieCarousel)