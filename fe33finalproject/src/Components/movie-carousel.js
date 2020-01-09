import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlayButton from "./playButton"
import ModalVideo from 'react-modal-video'
export default class MovieCarousel extends Component {
    constructor () {
        super()
        this.state = {
          isOpen: false
        }
        this.openModal = this.openModal.bind(this)
      }
     
      openModal () {
        this.setState({isOpen: true})
      }
    render() {
        let {movie} =this.props
        let strTrailerLink = movie.trailer
        return (
            
            <>
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={strTrailerLink.slice(30)} onClose={() => this.setState({isOpen: false})} />
                <div className="movie-carousel">
                <div className="carousel-image">
                <LazyLoadImage src={movie.hinhAnh} className="img-fluid" effect="blur" height={400} width={250}/> 
                <div className="carousel-trailer" >
                <div>
                </div>
                    
                    <button onClick={this.openModal}><PlayButton/></button>
                </div>
                {/* </NavLink> */}
                {/* <div className="carousel-body">
                    <p className="carousel-text">{movie.tenPhim}</p> 
                </div> */}
                <div className="carousel-detail">
                    <p>{movie.tenPhim}</p>
                    <p>Đánh Giá: {movie.danhGia} /5</p>
                </div>
                </div>
            </div>
            </>
        )
    }
    
}
