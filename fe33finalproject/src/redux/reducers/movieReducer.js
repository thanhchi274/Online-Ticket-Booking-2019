import * as ActionType from "./../constants/ActionType";
import data from "../../data.json";
let initialState = {
  listMovie: [],
  listMovieUpcoming: [],
  movie: {},
  movieDate: [],
  theaterDateInformation: [],
  loading: false,
  listMovieCarousel: [],
  room: {},
  userList: [],
  userInformation: {},
  keyWord: [],
  news: data
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_LIST_MOVIE: {
      state.listMovie = action.listMovie;
      return { ...state, loading: false };
    }
    case ActionType.GET_USER_LIST: {
      console.log(action);
      state.userList = action.userList;
      return { ...state, loading: false };
    }
    case ActionType.GET_DETAIL_MOVIE: {
      state.movie = action.movie;
      return { ...state, loading: false };
    }
    case ActionType.GET_USER_INFORMATION: {
      console.log(action);
      state.userInformation = action.userInformation;
      return { ...state, loading: false };
    }
    case ActionType.GET_LIST_MOVIE_UPCOMING: {
      state.listMovieUpcoming = action.listMovieUpcoming;
      return { ...state };
    }
    case ActionType.GET_DETAIL_DATETIME_MOVIE: {
      state.movieDate = action.movieDate;
      return { ...state };
    }
    case ActionType.GET_INFORMATION_THEATER_DATETIME: {
      state.theaterDateInformation = action.theaterDateInformation;
      return { ...state };
    }
    case ActionType.BOOKING_MOVIE: {
      return { ...state };
    }
    case ActionType.UPDATE_USER_INFORMATION: {
      return { ...state, loading: false };
    }
    case ActionType.UPDATE_USER_ADMIN_INFORMATION: {
      return { ...state };
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
      return { ...state };
    case ActionType.SEARCH_USER: 
      state.keyWord = action.keyWord;
      return { ...state };
    case ActionType.DELETE_USER:
      return { ...state };
    default:
      return { ...state };
  }
};
export default movieReducer;
