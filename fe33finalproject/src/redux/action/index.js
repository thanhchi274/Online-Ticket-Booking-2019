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
export const actGetDetailMovieAPI = (id) => {
  return dispatch => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    })
      .then(async (result) => {
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
export const actCheckAuthentication =(history)=>{
  if(localStorage.getItem("UserHome")===null){
   return  history.push("/")
  }
}
export const actLoginHome = (user, history) => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user
    })
      .then(result => {
        // Lưu vào local storage
        localStorage.setItem("UserHome", JSON.stringify(result.data));
        // Chuyển hướng đến trang home
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
        console.log(result.data);
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
        // Chuyển hướng đến trang home
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
export const actGetDateTimeMovie = id =>{
  return dispatch =>{
    Axios({
      mẹthod:"GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
    })
    .then( result=>{
      dispatch({
        type: ActionTypes.GET_DETAIL_DATETIME_MOVIE,
        movieDate: result.data
      });
    })
    .catch(err=>{
      return err;
    });
  };
};
// export const actBookingMovie = bookingMovie => {
//   return dispatch => {
//     Axios({
//       method: "POST",
//       url: "http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
//       data: bookingMovie
//     })
//       .then(result => {
//         dispatch({
//           type: ActionTypes.BOOKING_MOVIE,
//           bookingMovie: result.data
//         });
//       })
//       .catch(err => {
//         return err;
//       });
//   };
// };