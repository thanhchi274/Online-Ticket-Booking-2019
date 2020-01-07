import * as ActionTypes from "./../constants/ActionType.js"
import Axios from "axios";
export const actGetListMovieAPI =()=>{
    return dispatch=>{
        
         Axios({
            method: "GET",
            url:"http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
        })
        .then((result)=>{
            // dispatch(actGetListMovie(result.data))
            dispatch({
                type: ActionTypes.GET_LIST_MOVIE,
                listMovie: result.data
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }
} 
export const actGetDetailMovieAPI =(id)=>{
    return dispatch =>{
        Axios({
            method :"GET",
            url:`http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
        })
        .then((result)=>{
            // dispatch(actGetListMovie(result.data))
            dispatch({
                type: ActionTypes.GET_DETAIL_MOVIE,
                movie: result.data
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }
}
export const actLoading =()=>{
    return {
        type:ActionTypes.LOADING
    }
}
export const actGetMovieCarouselAPI =()=>{
    return dispatch=>{
        
         Axios({
            method: "GET",
            url:"http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=0&soPhanTuTrenTrang=10",
        })
        .then((result)=>{
            dispatch({
                type: ActionTypes.GET_LIST_CAROUSEL,
                listMovieCarousel: result.data
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }
} 
// export const actGetListMovie =listMovie=>{
// return {
//     type: ActionTypes.GET_LIST_MOVIE,
//     listMovie,
// };
// };