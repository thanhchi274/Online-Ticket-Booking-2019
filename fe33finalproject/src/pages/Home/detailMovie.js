import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as  Action from "./../../redux/action/index.js"
import SVGLoading from "../../Components/loading"
class DetailMovie extends Component {
    componentDidMount(){
        console.log(this.props.match.params.id);
        const id= this.props.match.params.id;
        this.props.setLoading();
        this.props.getdetailMovie(id);
    }
    renderTable =()=>{
        if(this.props.movie.lichChieu){
        return this.props.movie.lichChieu.map((item,index)=>{
            return <tr key={index}>
                <td>{item.thongTinRap.tenCumRap}</td>
                <td>{item.thongTinRap.tenRap}</td>
                <td>{new Date(item.ngayChieuGioChieu).toLocaleTimeString()}</td>
                <td>{new Date(item.ngayChieuGioChieu).toLocaleDateString()}</td>
                <td>
                </td>
            </tr>
        })}
    }
    render() {
        console.log(this.props.movie); //{}
        let {movie,loading} =this.props;
        if(loading){
            return <div className="loading-spinner"><SVGLoading /></div>
            
        }
        return (
            <div className="container">
            <div className="row">
            <div className ="col-sm-6">
                <img className="img-fluid" src={movie.hinhAnh} />
            </div>
            <div className ="col-sm-6">
                <table className="table">
                <tbody>
                    <tr>
                        <td>
                        Ten Phim
                        </td>
                        <td>
                        {movie.tenPhim}
                        </td>
                    </tr> 
                     <tr>
                        <td>
                        Mo ta
                        </td>
                        <td>
                        {movie.moTa}
                        </td>
                    </tr>
                    
                </tbody>
                </table>
            </div>
            </div>
            <div className="row">
            <table className="table">
            <thead>
                <tr>
                    <th>Ten Cum Rap</th>
                    <th>Ten Rap</th>
                    <th>Gio Chieu</th>
                    <th>Ngay Chieu</th>
                </tr>
            </thead>
            <tbody>
            {this.renderTable()}
            </tbody>
            </table>
            </div>
            </div>
        )
    }
}
const mapStateToProps =state=>({
    movie : state.movieReducer.movie,
    loading: state.movieReducer.loading
})
const mapDispatchToProps =(dispatch)=>{
    return {
        getdetailMovie:(id)=>{
            dispatch(Action.actGetDetailMovieAPI(id))
        },
        setLoading: ()=>{
            dispatch(Action.actLoading())
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
export default connect(mapStateToProps,mapDispatchToProps)(DetailMovie)