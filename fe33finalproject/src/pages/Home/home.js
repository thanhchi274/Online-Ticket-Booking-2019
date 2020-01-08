import React, { Component } from 'react'
import Carousel from "./../../Components/carousel"
import HomeTool from '../../Components/home-tool'
export default class Home extends Component {
    render() {
        return (
            <div>
            <Carousel />
        
            <HomeTool />
            </div>
        )
    }
}
