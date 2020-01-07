import { combineReducers } from 'redux';
import movieReducer from "./movieReducer.js"
import uiReducer from "./uiReducer.js"
const rootReducer = combineReducers({
    movieReducer,
    uiReducer
});
export default rootReducer;