import {
  ADD_EMPRESA,
  EMPRESA_DETAIL,
  ADD_MENU,
  CURRENT_USER,
  CURRENT_ID,
} from "./Actions/Constants.js";

let initialState = {
  empresas: [],
  empresaDetail: [],
  menus: [],
  currentId: null,
  currentUser: null,
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MENU:
      const menu = action.payload;
      return {
        ...state,
        menus: [...state.menus, menu],
      };
    case EMPRESA_DETAIL:
      const IdEmpresa = action.payload;
      const empresas = state.empresas;
      const dataEmpresa = empresas.find((empresa) => empresa.Id === IdEmpresa);
      //console.log(dataEmpresa[0])
      return {
        ...state,
        empresaDetail: dataEmpresa,
      };

    case ADD_EMPRESA:
      return {
        ...state,
        empresas: [...state.empresas, action.payload],
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case CURRENT_ID:
      return {
        ...state,
        currentId: action.payload,
      };
    default:
      return state;
  }
};

export default RootReducer;
