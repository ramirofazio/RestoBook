import {
  ADD_EMPRESA,
  EMPRESA_DETAIL,
  ADD_MENU,
  CURRENT_USER,
  CURRENT_ID,
  SET_COMMERCE,
} from "./Actions/Constants.js";

let initialState = {
  empresas: [],
  menus: [],
  commerce: false,
  currentId: null,
  currentUser: null,
  empresaDetail: [],
  categoriesResto: ["Pizzas/Empanadas", "Rotiseria", "Pastas", "Parrilla", "Sushi", "Hamburguesas", "Fingerfood", "Drinks", "Otros"],
  categoriesMenu: ['Pizza', 'Pasta', 'Bebida', 'Guarnicion', 'Postre', 'Plato Principal']
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
      const empresaDetail = action.payload;
      //console.log(dataEmpresa[0])
      return {
        ...state,
        empresaDetail: empresaDetail,
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
    case SET_COMMERCE:
      return {
        ...state,
        commerce: true
      }
    default:
      return state;
  }
};

export default RootReducer;
