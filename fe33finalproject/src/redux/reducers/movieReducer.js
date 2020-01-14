import * as ActionType from "./../constants/ActionType";
import data from "../../data.json";
let initialState = {
  listMovie: [],
  movie: {},
  loading: false,
  listMovieCarousel: [],
  room: {},
  booking: {},
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
    case ActionType.BOOKING_MOVIE:
      console.log(action);
      state.booking = action.booking;
      return { ...state };
    default:
      return { ...state };
  }
};
export default movieReducer;
