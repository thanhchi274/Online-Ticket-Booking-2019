import * as ActionTypes from "./../constants/ActionType.js";
import Axios from "axios";
export const actGetListMovieAPI = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
    })
      .then(async result => {
        dispatch({
          type: await ActionTypes.GET_LIST_MOVIE,
          listMovie: await result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actUpdateMovie = user => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return async dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(async result => {
        alert("Cập Nhật Thành Công");
        dispatch(await result.data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };
};
export const actGetUserList = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
    })
      .then(async result => {
        dispatch({
          type: await ActionTypes.GET_USER_LIST,
          userList: await result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actGetListMovieUpcomingAPI = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP06"
    })
      .then(async result => {
        // dispatch(actGetListMovie(result.data))
        dispatch({
          type: ActionTypes.GET_LIST_MOVIE_UPCOMING,
          listMovie: await result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actGetDetailMovieAPI = id => {
  return dispatch => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    })
      .then(async result => {
        console.log(result.data);
        dispatch({
          type: await ActionTypes.GET_DETAIL_MOVIE,
          movie: await result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actLoading = () => {
  return {
    type: ActionTypes.LOADING
  };
};
export const actCheckAuthentication = history => {
  if (localStorage.getItem("UserHome") === null) {
    return history.push("/");
  }
};
export const actLoginHome = (user, history) => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user
    })
      .then(result => {
        localStorage.setItem("UserHome", JSON.stringify(result.data));
        history.push("/");
        window.location.reload();
        dispatch({
          type: ActionTypes.LOGIN,
          user: result.data
        });
      })
      .catch(err => {
        alert("Bạn chưa có quyền đăng nhập hãy tạo tài khoản");
        return err;
      });
  };
};
export const actLoginAdmin = (user, history) => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user
    })
      .then(result => {
        // Lưu vào local storage
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("UserAdmin", JSON.stringify(result.data));
          // Chuyển hướng đến trang home
          history.push("/dashboard");
          window.location.reload();
          dispatch({
            type: ActionTypes.LOGIN,
            user: result.data
          });
        }
      })
      .catch(err => {
        alert("Bạn chưa có quyền đăng nhập hãy tạo tài khoản");
        return err;
      });
  };
};
export const actSignupHome = (user, history) => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      data: user
    })
      .then(result => {
        history.push("/login");
        dispatch({
          type: ActionTypes.SIGNUP,
          user: result.data
        });
      })
      .catch(err => {
        return err;
      });
  };
};

export const actGetRoomList = id => {
  return dispatch => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
    })
      .then(result => {
        console.log(result.data);
        dispatch({
          type: ActionTypes.GET_ROOM_LIST,
          room: result.data
        });
      })
      .catch(err => {
        return err;
      });
  };
};
export const actGetDateTimeMovie = id => {
  return dispatch => {
    Axios({
      mẹthod: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
    })
      .then(result => {
        dispatch({
          type: ActionTypes.GET_DETAIL_DATETIME_MOVIE,
          movieDate: result.data
        });
      })
      .catch(err => {
        return err;
      });
  };
};
export const actDatVe = user => {
  const UserHome = JSON.parse(localStorage.getItem("UserHome"));
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      data: user,
      headers: {
        Authorization: `Bearer ${UserHome.accessToken}`
      }
    })
      .then(result => {
        alert("Đặt vé thành công");
        window.location.reload();
        dispatch(result.data);
      })
      .catch(err => {
        return err;
      });
  };
};
export const actLayThongTinUser = user => {
  return dispatch => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      data: user
    })
      .then(async result => {
        localStorage.setItem("UserInfo", JSON.stringify(result.data));
        dispatch({
          type: await ActionTypes.GET_USER_INFORMATION,
          userInformation: await result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actQuanLyVeUser = user => {
  return dispatch => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      data: user
    })
      .then(async result => {
        localStorage.setItem("TicketManage", JSON.stringify(result.data));
        dispatch({
          type: await ActionTypes.GET_TICKET_DETAIL,
          tickets: await result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actUpdateUserInformation = user => {
  const UserHome = JSON.parse(localStorage.getItem("UserHome"));
  return dispatch => {
    Axios({
      method: "PUT",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserHome.accessToken}`
      }
    })
      .then(result => {
        setTimeout(function() {
          alert("Cập nhật thành công");
        }, 500);
        dispatch(result.data);
      })
      .catch(err => {
        return err;
      });
  };
};
export const actUpdateUserAdminInformation = user => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return dispatch => {
    Axios({
      method: "PUT",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(result => {
        setTimeout(function() {
          alert("Cập nhật thành công");
        }, 500);
        dispatch(result.data);
      })
      .catch(err => {
        return err;
      });
  };
};
export const actSearchUser = id => {
  return dispatch => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${id}`
    })
      .then(result => {
        dispatch({
          type: ActionTypes.SEARCH_USER,
          keyWord: result.data
        });
      })
      .catch(err => {
        return err;
      });
  };
};

export const actDeleteUser = tk => {
  return dispatch => {
    const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
    Axios({
      method: "DELETE",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${tk}`,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(async result => {
        alert(result.data);
        dispatch({
          type: await ActionTypes.DELETE_USER
        });
      })
      .catch(err => {
        alert(err.response.data);
        return err;
      });
  };
};
export const actDeleteMovie = movie => {
  return dispatch => {
    const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
    Axios({
      method: "DELETE",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${movie}`,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(result => {
        alert(result.data);
        dispatch({
          type: ActionTypes.DELETE_MOVIE
        });
      })
      .catch(err => {
        alert(err.response.data);
        return err;
      });
  };
};
export const actThemNguoiDung = user => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return dispatch => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(result => {
        alert("Đăng kí thành công");
        dispatch(result.data);
      })
      .catch(err => {
        return err;
      });
  };
};
export const actThemMovie = user => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(result => {
        alert("Thêm Phim thành công");
        window.location.reload();
        dispatch(result.data);
      })
      .catch(err => {
        console.log(err.response);
        return err;
      });
  };
};

export const actthemHinhAnhPhim = hinhAnh => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim",
      data: hinhAnh,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`
      }
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err.data;
      });
  };
};
export const actLayThongTinRap = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap"
    })
      .then(result => {
        dispatch({
          type: ActionTypes.GET_INFO_THEATER,
          theaterInfo: result.data
        });
      })
      .catch(err => {
        return err.data;
      });
  };
};
