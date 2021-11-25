import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from './Reducer';

export const store = createStore(RootReducer, applyMiddleware(thunk))

