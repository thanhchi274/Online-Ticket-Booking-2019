import * as ActionType from "./../constants/ActionType";
let initialState ={
    listMovie:[],
    movie:{},
    loading:false,
    listMovieCarousel:[],
}
const movieReducer =(state =initialState, action)=>{
    switch(action.type){
        case ActionType.GET_LIST_MOVIE: {
            state.listMovie =action.listMovie;
            return{...state};
        }
        case ActionType.GET_DETAIL_MOVIE :{
           state.movie = action.movie;
           console.log(action);
            return{...state, loading:false};
        }
        case ActionType.GET_LIST_CAROUSEL:{
            state.listMovieCarousel = action.listMovieCarousel;
            console.log(action);
            return {...state};
        }
        case ActionType.LOADING :{
            return {...state,loading:true}
        }
        default:
        return{...state};
    }
}
export default movieReducer;