import React, { Component } from "react";
import _ from "lodash";
import * as Action from "../redux/action/index";
import { connect } from "react-redux";
class TicketHistory extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      movieData: []
    };
  }
  componentDidUpdate() {
    let user = { ...this.state };
    this.props.getUserInformation(user);
  }
  componentDidMount() {
    let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const group1 = _.groupBy(UserInfo.thongTinDatVe, "ngayDat");
    console.log(group1);
    this.setState(
      {
        movieData: group1
      },
      () => {
        console.log(this.state);
      }
    );
    if (localStorage.getItem("UserHome")) {
      let info = JSON.parse(localStorage.getItem("UserHome"));
      let taiKhoan = info.taiKhoan;
      this.setState({
        taiKhoan
      });
    }
    if (localStorage.getItem("UserInfo")) {
      let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      let UserHome = JSON.parse(localStorage.getItem("UserHome"));
      let matKhau = UserInfo.matKhau;
      let email = UserInfo.email;
      let soDt = UserInfo.soDT;
      let hoTen = UserInfo.hoTen;
      let maNhom = UserHome.maNhom;
      let maLoaiNguoiDung = UserHome.maLoaiNguoiDung;
      this.setState({
        matKhau,
        email,
        soDt,
        hoTen,
        maNhom,
        maLoaiNguoiDung
      });
    }
  }
  render() {
    let UserData = this.state.movieData;

    return (
      <div className="container-table100" style={{ width: "100%" }}>
        <h1 className="my-4">Lịch Sử Giao Dịch</h1>
        <div className="wrap-table100">
          <div className="table100 ver2 m-b-110">
            <div className="table100-head">
              <table>
                <thead>
                  <tr className="head">
                    <th className=" column1">Tên Phim</th>
                    <th className="column2">Ngày giao dịch</th>
                    <th className=" column3">Tên Hệ Thống Rạp</th>
                    <th className=" column4">Tên Rạp</th>
                    <th className=" column5">Tên Ghế</th>
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
                        {
                          /* {console.log(_.groupBy(UserData[value],'ngayDat')[item2][index2])} */
                        }
                        return typeof _.groupBy(UserData[value], "ngayDat")[
                          item2
                        ][index2].danhSachGhe == "object" ? (
                          <div key={index2}>
                            {console.log(
                              _.groupBy(UserData[value], "ngayDat")[item2][
                                index2
                              ].ngayDat
                            )}
                            {Object.keys(
                              _.groupBy(UserData[value], "ngayDat")[item2][
                                index2
                              ].danhSachGhe
                            ).map((item3, index3) => {
                              {
                                console.log(
                                  _.groupBy(UserData[value], "ngayDat")[item2][
                                    index2
                                  ].danhSachGhe[item3]
                                );
                              }
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
                                            {new Date(
                                              _.groupBy(
                                                UserData[value],
                                                "ngayDat"
                                              )[item2][index2].ngayDat
                                            ).toLocaleDateString()}
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
  userInformation: state.movieReducer.userInformation,
  loading: state.movieReducer.loading
});
const mapDispatchToProps = dispatch => {
  return {
    getUserInformation: user => {
      dispatch(Action.actLayThongTinUser(user));
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    },
    updateUser: user => {
      dispatch(Action.actUpdateUserInformation(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketHistory);
