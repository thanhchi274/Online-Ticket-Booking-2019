import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/action";
import Rating from "@material-ui/lab/Rating";
// import Rate from "../Components/ratingComment";
import Box from "@material-ui/core/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import SmallSpinner from "./smallSpinner";

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
    this.props.actGetCommentList(id);
    const danhGia = this.props.danhGia
    this.setState({
      maPhim: id,
      value: danhGia
    });
  }
  UNSAFE_componentWillUpdate() {
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
    const home = JSON.parse(localStorage.getItem("UserHome"));
    e.preventDefault();
    if (home) {
      this.setState(
        {
          hoTen: home.hoTen,
          maPhim: this.state.maPhim,
          nhanXet: this.state.nhanXet,
          danhGia: this.state.value
        },
        () => {
          this.props.actComment(this.state, this.state.maPhim);
        }
      );
    }
  };
  handleDelete = e => {
    const commentId = e.target.getAttribute("value");
    const id = this.props.id;
    this.props.actxoaComment(id, commentId);
  };
  renderModalErr = () => {
    const home = JSON.parse(localStorage.getItem("UserHome"));
    if (!home) {
      return (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="exampleModalLabel">
                  Thông báo
                </h2>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Bạn phải đăng nhập để thực hiện hành động này
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="book-btn"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
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
            <div className="deleteButton">
              <p value={item.id} onClick={this.handleDelete}>
                Xóa
              </p>
              <FontAwesomeIcon className="deleteIcon" icon={faBan} />
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="loading-spinner">
          <SmallSpinner />
        </div>
      );
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
            <div className="modaSwitchlLogin">
              <button
                className="commentBtn"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Đăng
              </button>
              {this.renderModalErr()}
            </div>
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
    },
    actxoaComment: (maPhim, maComment) => {
      dispatch(action.actxoaComment(maPhim, maComment));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
