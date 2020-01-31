import * as ActionType from "./../constants/ActionType";
import data from "../../data.json";
let initialState ={
  listMovie: [],
  listMovieUpcoming:[],
  movie: {},
  movieDate:[],
  theaterDateInformation:[],
  loading: false,
  listMovieCarousel: [],
  room: {},
  news: data
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_LIST_MOVIE: {
      state.listMovie = action.listMovie;
      return { ...state, loading: false };
    }
    case ActionType.GET_DETAIL_MOVIE: {
      state.movie = action.movie;
      return { ...state, loading: false };
    }
    case ActionType.GET_LIST_MOVIE_UPCOMING:{
      state.listMovieUpcoming = action.listMovieUpcoming;
      return {...state};
    }
    case ActionType.GET_DETAIL_DATETIME_MOVIE:{
      state.movieDate = action.movieDate;
      return{...state};
      // return  state.merge({movieDate:action.movieDate})
    }
    case ActionType.GET_INFORMATION_THEATER_DATETIME:{
      // console.log(action);
      state.theaterDateInformation = action.theaterDateInformation
      return {...state}
    }
    case ActionType.BOOKING_MOVIE:{
      console.log(action);
      return{...state}
  }
    case ActionType.LOADING: {
      return { ...state, loading: true };
    }
    case ActionType.LOGIN:
      console.log(action);
      return { ...state };
    case ActionType.LOGOUT:
      return { ...state };
    case ActionType.SIGNUP:
      return { ...state };
    case ActionType.GET_ROOM_LIST:
      state.room = action.room;
      return { ...state, loading: false };
    case ActionType.CHECK_AUTHENTICATION:
    return {...state}
    default:
      return { ...state };
  }
};
export default movieReducer;
