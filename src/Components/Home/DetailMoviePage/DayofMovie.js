
import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { connect } from "react-redux";
import _ from 'lodash'
import TimeofMovie from './TimeofMovie';
const { TabPane } = Tabs;

class DayofMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maRap:"",
      idPhim:"",
      ngayChieu:""
    };
  }
  componentDidMount(){
      this.setState({
        idPhim: this.props.id,
        maRap:this.props.maRap
      })
  }
  handleChange= e=>{
      this.setState({
          ngayChieu:e
      })
  }
  renderNgayChieu(){
    if (this.props.movieDate.heThongRapChieu) {
        let ngayChieu =this.props.movieDate.heThongRapChieu
        const renderNgayChieu = _.filter(ngayChieu,{maHeThongRap: this.props.maRap})
        return typeof(renderNgayChieu)=="object"?(
          Object.keys(renderNgayChieu).map((value,index)=>{
            return(
              <React.Fragment key={index}> {
                Object.keys(renderNgayChieu[value].cumRapChieu).map((item1,indexTheater)=>{
                    const objLichChieu = renderNgayChieu[value].cumRapChieu[item1].lichChieuPhim
                    const filteredArr = objLichChieu.reduce((arrayDuplicated, current) => {
                    const duplicatedItem = arrayDuplicated.find(movie =>new Date(movie.ngayChieuGioChieu).toLocaleDateString() === new Date( current.ngayChieuGioChieu).toLocaleDateString());
                          if (!duplicatedItem) {
                            return arrayDuplicated.concat([current]);
                          } else {
                            return arrayDuplicated;
                          }
                        }, []);
                        return (
                            <Tabs key={indexTheater} onChange={this.handleChange} defaultActiveKey="1" tabPosition={"top"} style={{ height: 512, transform: `translate(0px, 0px)`}}>{
                            Object.keys(filteredArr).map((dateMovie,indexDateMovie)=>{
                             return ( 
                                 <TabPane key={new Date(filteredArr[dateMovie].ngayChieuGioChieu).toLocaleDateString()} tab={new Date(filteredArr[dateMovie].ngayChieuGioChieu).toLocaleDateString()}>
                                 <TimeofMovie LichChieu ={objLichChieu} ngayChieu = {this.state.ngayChieu} />
                                 </TabPane>
                                    )})}
                                 </Tabs>
                          )})}
              </React.Fragment>
            )})
            ):null
      }
  }
  render() {
          return (
            <div>
          {this.props.movieDate?this.renderNgayChieu():null}
            </div>
          );
  }
}
const mapStateToProps = state => ({
    movieDate: state.movieReducer.movieDate
  });
export default connect(mapStateToProps, null)(DayofMovie);
