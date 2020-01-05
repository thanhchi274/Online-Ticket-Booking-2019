import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
export default class Movie extends Component {
    render() {
        let {movie} =this.props
        return (
            <div className="col-sm-3">
                <div className="card">
                <img className="card-img-top" src={movie.hinhAnh|| <Skeleton />} alt="Card" />
                <div className="card-body">
                    <p className="card-text">{movie.tenPhim|| <Skeleton />}</p>
                    <Link className="btn btn-success" to={`/detail-movie/${movie.maPhim}`}>Detail</Link>
                </div>
                {/* muon them thong tin phim thi them duong link */}
                </div>
            </div>
            
        )
    }
}
