import React, { Component } from 'react'
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
class Carousel extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1};
        return (
            <Slider {...settings}>
          <div>
           <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/ted-poster.jpg"}  effect="blur" alt="Card" border="{0}" />
           <div className ="carousel-detail">
            <p>DetailCarousel</p>
           </div>
          </div>
          <div>
           <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/ant-man-big.jpg"} effect="blur" alt="Card" border="{0}" />
          </div>
          <div>
          <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/jurassic-world-fallen-kingdom-12k-international-poster-vh-2560x1440.jpg"} effect="blur" alt="Card" border="{0}" />
          </div>
          <div>
          <LazyLoadImage src={"https://www.upsieutoc.com/images/2020/01/07/itl.cat_wallpaper-superman-android_2097462.jpg"} effect="blur" alt="Card" border="{0}" />
            </div>
          </Slider>
        );
    }
}
export default Carousel;
