import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../redux/action";
import Rating from "@material-ui/lab/Rating";

class CommentList extends Component {
  componentDidMount() {
    const id = this.props.id;
    this.props.actGetCommentList(id);
    console.log(id);
  }

  renderHTML = () => {
    // console.log(typeof this.props.comment);
    // return typeof this.props.comment == "object"
    //   ? Object.keys(this.props.comment).map((item, index) => {
    //       console.log(this.props.comment[item]);
    //     })
    //   : null;
    // return this.props.comment.map((item, index) => {
    //   return (
    //     <div key={index} className="commentList container">
    //       <div className="row header">
    //         <p>{item.hoTen}</p>
    //         <Rating name="read-only" value={item.danhGia} readOnly />
    //       </div>
    //     </div>
    //   );
    // });
  };
  render() {
    console.log(this.props.comment);
    return <div>{this.renderHTML()}</div>;
  }
}
const mapStateToProps = state => ({
  comment: state.movieReducer.comment
});
const mapDispatchToProps = dispatch => {
  return {
    actGetCommentList: id => {
      dispatch(action.actLayNhanXet(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
