
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import * as action from "../../redux/action";
import MainPage from "../../Components/Admin/Pagination"
function UserManagement(props) {
    useEffect(() => {
        props.getUserList();
      }, []);
    return (
        <div>
         <MainPage />
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
      getUserList: () => {
        dispatch(action.actGetUserList());
      }
    };
};
export default connect(null,mapDispatchToProps)(UserManagement)