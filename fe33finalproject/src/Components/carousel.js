import React, { Component } from 'react'
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import HomeTool from "./home-tool";
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
class Carousel extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow:<NextArrow />  ,
            prevArrow:<PrevArrow /> , 
          };
        return (
          <div className="carousel-main">
            <Slider {...settings} >
          <div>
           <NavLink to="/detail-movie/1314">
           <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/ted-poster.jpg"}  effect="black-and-white" alt="Card" border="{0}" />
           </NavLink>
           <div className ="carousel-detail">
            <p>DetailCarousel</p>
           </div>
          </div>
          <div>
          <NavLink to="/detail-movie/1389">
           <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/ant-man-big.jpg"} effect="black-and-white" alt="Card" border="{0}" />
          </NavLink>
          </div>
          <div>
          <NavLink to="/detail-movie/1404">
          <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/jurassic-world-fallen-kingdom-12k-international-poster-vh-2560x1440.jpg"} effect="black-and-white" alt="Card" border="{0}" />
          </NavLink>
          </div>
          <div>
          <NavLink to="/detail-movie/1374" >
          <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/itl.cat_wallpaper-superman-android_2097462.jpg"} effect="black-and-white" alt="Card" border="{0}" />
          </NavLink>
            </div>
          </Slider>
          <HomeTool />
          </div>
        );
    }
}
export default Carousel;
