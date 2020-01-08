import * as ActionType from "./../constants/ActionType";
let initialState = {
  listMovie: [],
  movie: {},
  loading: false,
  listMovieCarousel: []
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_LIST_MOVIE: {
      state.listMovie = action.listMovie;
      return { ...state,loading:false };
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
      return {...state};
    case ActionType.SIGNUP:
      console.log(action);
      return { ...state };
    default:
      return { ...state };
  }
};
export default movieReducer;
