import React, { Component } from 'react'

export default class componentName extends Component {
    render() {
        let {MovieList}= this.props;
        return (
        <>
         <option > {MovieList.tenPhim}</option>
        </>
        )
    }
}
