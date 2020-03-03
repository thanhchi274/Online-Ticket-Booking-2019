import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as Action from "../../Store/action/index";
import { Redirect } from "react-router-dom";
class TicketManageMent extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      movieData: []
    };
  }
  async componentDidMount() {
    try{
      const taiKhoan = this.props.match.params.id;
      await this.props.getTicketManageUser({taiKhoan});
      let UserInfo = JSON.parse(localStorage.getItem("TicketManage"));
      const group1 =_.groupBy(UserInfo.thongTinDatVe, "ngayDat");
        this.setState({
          taiKhoan,
          movieData: group1,
          matKhau:UserInfo.matKhau,
          email:UserInfo.email,
          soDt:UserInfo.soDT,
          hoTen:UserInfo.hoTen,
          maNhom:UserInfo.maNhom,
          
        });
    }
    catch(err){
     return <Redirect to ="/" />
    }
   }
  render() {
    let UserData = this.state.movieData;
    return (
      <div className="container-table100" style={{ width: "100%" }}>
        <div className="wrap-table100">
          <div className="table100 ver2 m-b-110">
            <div className="table100-head">
              <table>
                <thead>
                  <tr className="head">
                    <th className="column1">Tên Phim</th>
                    <th className="column2">Ngày giao dịch</th>
                    <th className="column3">Tên Hệ Thống Rạp</th>
                    <th className="column4">Tên Rạp</th>
                    <th className="column5">Tên Ghế</th>
                  </tr>
                </thead>
              </table>
            </div>
            {Object.keys(UserData).map((value, index) => (
              <div key={index}>
                {typeof _.groupBy(UserData[value], "ngayDat") == "object" ? (
                  <div>
                    {Object.keys(_.groupBy(UserData[value], "ngayDat")).map(
                      (item2, index2) => {
                        return typeof _.groupBy(UserData[value], "ngayDat")[
                          item2
                        ][index2].danhSachGhe == "object" ? (
                          <div key={index2}>
                            {Object.keys(
                              _.groupBy(UserData[value], "ngayDat")[item2][
                                index2
                              ].danhSachGhe
                            ).map((item3, index3) => {
                              return (
                                <div key={index3}>
                                  <div className="table100-body js-pscroll">
                                    <table>
                                      <tbody>
                                        <tr className="row100 body">
                                          <td className="cell100 column1">
                                            {" "}
                                            {
                                              _.groupBy(
                                                UserData[value],
                                                "ngayDat"
                                              )[item2][index2].tenPhim
                                            }
                                          </td>
                                          <td className="cell100 column2">
                                            {new Date(_.groupBy(
                                                UserData[value],
                                                "ngayDat"
                                              )[item2][index2].ngayDat
                                            ).toLocaleDateString()}.
                                          </td>
                                          <td className="cell100 column3">
                                            {" "}
                                            {
                                              _.groupBy(
                                                UserData[value],
                                                "ngayDat"
                                              )[item2][index2].danhSachGhe[
                                                item3
                                              ].tenHeThongRap
                                            }
                                          </td>
                                          <td className="cell100 column4">
                                            {" "}
                                            {
                                              _.groupBy(
                                                UserData[value],
                                                "ngayDat"
                                              )[item2][index2].danhSachGhe[
                                                item3
                                              ].tenRap
                                            }
                                          </td>
                                          <td className="cell100 column5">
                                            {" "}
                                            {
                                              _.groupBy(
                                                UserData[value],
                                                "ngayDat"
                                              )[item2][index2].danhSachGhe[
                                                item3
                                              ].tenGhe
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : null;
                      }
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tickets: state.movieReducer.tickets,
});
const mapDispatchToProps = dispatch => {
  return {
    getTicketManageUser: user => {
      dispatch(Action.actQuanLyVeUser(user));
    },
    updateUser: user => {
      dispatch(Action.actUpdateUserInformation(user));
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(TicketManageMent)