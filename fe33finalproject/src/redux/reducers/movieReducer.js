import * as ActionType from "./../constants/ActionType";
import data from "../../data.json"
let initialState = {
  listMovie: [],
  movie: {},
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
    case ActionType.LOADING: {
      return { ...state, loading: true };
    }
    case ActionType.LOGIN:
      return { ...state };
    case ActionType.LOGOUT:
      return { ...state };
    case ActionType.SIGNUP:
      return { ...state };
    case ActionType.GET_ROOM_LIST:
      console.log(action);
      state.room = action.room;
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
export default movieReducer;
