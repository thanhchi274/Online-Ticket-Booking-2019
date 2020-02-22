import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../redux/action";
import Rating from "@material-ui/lab/Rating";
// import Rate from "../Components/ratingComment";
import Box from "@material-ui/core/Box";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      hoTen: "",
      nhanXet: "",
      danhGia: "",
      value: 3,
      commentList: []
    };
  }
  componentDidMount() {
    const id = this.props.id;
    const home = JSON.parse(localStorage.getItem("UserHome"));
    this.props.actGetCommentList(id);
    this.setState({
      maPhim: id,
      hoTen: home.hoTen
    });
  }
  componentWillUpdate() {
    const id = this.props.id;
    this.props.actGetCommentList(id);
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleComment = e => {
    const id = this.props.id;
    e.preventDefault();
    this.setState(
      {
        maPhim: this.state.maPhim,
        nhanXet: this.state.nhanXet,
        danhGia: this.state.value
      },
      () => {
        this.props.actComment(this.state, this.state.maPhim);
      }
    );

    this.props.actGetCommentList(id);
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
        <div className="upComment">
          <h1>{this.state.value}</h1>
          <Box
            className="ratingComment"
            component="fieldset"
            mb={3}
            borderColor="transparent"
          >
            <Rating
              name="danhGia"
              className="rateArea"
              value={this.state.value}
              onChange={(event, newValue) => {
                this.setState({
                  value: newValue
                });
              }}
            />
          </Box>
          <form className="commentForm" onSubmit={this.handleComment}>
            <input
              name="nhanXet"
              type="text"
              className="commentArea"
              placeholder="Hãy cho mọi người biết suy nghĩ của bạn về bộ phim"
              onChange={this.handleChange}
            ></input>

            <button className="commentBtn">Đăng</button>
          </form>
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
    actComment: (comment, id) => {
      dispatch(action.actNhanXet(comment, id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
