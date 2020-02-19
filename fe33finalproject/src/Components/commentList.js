import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../redux/action";
import Rating from "@material-ui/lab/Rating";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nhanXet: "",
      danhGia: "",
      danhSachComment: []
    };
  }
  componentDidMount() {
    const id = this.props.id;
    this.props.actGetCommentList(id);
  }

  handleChange = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleComment = () => {
    const UserHome = JSON.parse(localStorage.getItem("UserHome"));
    this.setState({
      maPhim: this.props.id,
      danhSachComment: [
        ...this.state.danhSachComment,
        {
          hoTen: UserHome.hoTen,
          nhanXet: this.state.nhanXet,
          danhGia: this.state.danhGia
        }
      ]
    });
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
        <div className="commentForm">
          <textarea
            name="nhanXet"
            className="commentArea"
            placeholder="Write some comment..."
            onChange={this.handleChange}
          ></textarea>
          <input
            onChange={this.handleChange}
            name="danhGia"
            type="text"
          ></input>
          <button className="btn btn-success" onClick={this.handleComment}>
            Nhận xét
          </button>
        </div>
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
    actComment: user => {
      dispatch(action.actNhanXet(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
