import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../redux/action";
import Rating from "@material-ui/lab/Rating";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      danhSachComment: [
        {
          hoTen: "",
          nhanXet: "",
          danhGia: ""
        }
      ]
    };
  }
  componentDidMount() {
    const id = this.props.id;
    this.setState({
      maPhim: id
    });
    this.props.actGetCommentList(id);
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleComment = e => {
    e.preventDefault();
    const home = JSON.parse(localStorage.getItem("UserHome"));
    this.setState(
      {
        danhSachComment: [
          {
            hoTen: home.hoTen,
            nhanXet: this.state.nhanXet,
            danhGia: this.state.danhGia
          }
        ]
      },
      () => {
        this.props.actComment(this.state);
      }
    );
  };

  renderHTML = () => {
    if (this.props.comment.danhSachComment) {
      return this.props.comment.danhSachComment.map((item, index) => {
        return (
          <div key={index} className="commentList">
            <div className="headerComment">
              <div className="guest_intro">
                <img
                  alt="avatar"
                  className="guest_ava mr-2"
                  src="https://divineshop.vn/image/avatar/default.png?rand=963987"
                />
                <h5>{item.hoTen}</h5>
              </div>
              <Rating
                name="read-only"
                value={parseInt(item.danhGia)}
                readOnly
              />
            </div>
            <hr />
            <div className="contentComment">
              <p>{item.nhanXet}</p>
            </div>
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div className="container">
        <form className="commentForm" onSubmit={this.handleComment}>
          <input
            name="nhanXet"
            type="text"
            className="commentArea"
            placeholder="Write some comment..."
            onChange={this.handleChange}
          ></input>
          <input
            onChange={this.handleChange}
            name="danhGia"
            type="text"
          ></input>
          <button className="btn btn-success">Nhận xét</button>
        </form>
        {this.renderHTML()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  comment: state.movieReducer.comment
});
const mapDispatchToProps = dispatch => {
  return {
    actGetCommentList: id => {
      dispatch(action.actLayNhanXet(id));
    },
    actComment: comment => {
      dispatch(action.actNhanXet(comment));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
