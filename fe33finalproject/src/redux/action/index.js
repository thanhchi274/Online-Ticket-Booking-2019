import * as ActionTypes from "./../constants/ActionType.js";
import Axios from "axios";
export const actGetListMovieAPI = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
    })
      .then(result => {
        console.log(result.data);
        // dispatch(actGetListMovie(result.data))
        dispatch({
          
          type: ActionTypes.GET_LIST_MOVIE,
          listMovie: result.data
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
      .then(result => {
        // dispatch(actGetListMovie(result.data))
        dispatch({
          type: ActionTypes.GET_DETAIL_MOVIE,
          movie: result.data
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
export const actGetMovieCarouselAPI = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=0&soPhanTuTrenTrang=10"
    })
      .then(result => {
        dispatch({
          type: ActionTypes.GET_LIST_CAROUSEL,
          listMovieCarousel: result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const actLoginHome = (user, history) => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user
    })
      .then(result => {
        console.log(result.data);
        // Lưu vào local storage
        if (result.data.maLoaiNguoiDung === "KhachHang") {
          localStorage.setItem("UserHome", JSON.stringify(result.data));
          // Chuyển hướng đến trang home
          history.push("/");
          dispatch({
            type: ActionTypes.LOGIN,
            user: result.data
          });
        } else {
          alert("Admin khong duoc dang nhap tai day");
        }
      })
      .catch(err => {
        alert("Bạn chưa có quyền đăng nhập hãy tạo tài khoản");
      });
  };
};
export const actLogOutHome = () => {
  return {
    type: ActionTypes.LOGOUT
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
        console.log(result.data);
        // Chuyển hướng đến trang home
        history.push("/dang-nhap");
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
// export const actGetListMovie =listMovie=>{
// return {
//     type: ActionTypes.GET_LIST_MOVIE,
//     listMovie,
// };
// };
