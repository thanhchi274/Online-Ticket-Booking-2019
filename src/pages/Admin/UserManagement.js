import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "../../redux/action";
import MainPage from "../../Components/Admin/Pagination"
class UserManagement extends Component {
componentDidMount(){
  this.props.getUserList()
}
  render() {
    return (
      <div>
          <MainPage />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
      getUserList: () => {
        dispatch(action.actGetUserList());
      }
    };
};
export default connect(null,mapDispatchToProps)(UserManagement)