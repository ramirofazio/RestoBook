import { ADD_EMPRESA } from "./Actions/Constants.js";

let initialState = {
  empresas: [],
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPRESA:
      return {
        ...state,
        empresas: [...state.empresas, action.payload],
      };
    default:
      return state;
  }
};

export default RootReducer;
