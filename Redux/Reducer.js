import { ADD_EMPRESA } from "./Actions/Constants.js";

let initialState = {
  empresas: [
    {
      Id: 1,
      Title: "McDonald's",
      Description: "McDonald's es una franquicia de restaurantes de comida rápida estadounidense con sede en Chicago, Illinois.​ Sus principales productos son las hamburguesas, las patatas fritas, los menús para el desayuno y los refrescos. ",
      Img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    },
    {
      Id: 2,
      Title: "Los pollos Hermanos",
      Description: "Los Pollos Hermanos es un restaurante de comida rápida de pollo frito que se originó en las series de televisión Breaking Bad y Better Call Saul.",
      Img: "https://blog-eeuu.com/wp-content/uploads/2018/08/breaking-bad-logo.jpeg",
    },
    {
      Id: 3,
      Title: "Burger King",
      Description: "Burger King, también conocida como BK, ​ es una cadena de establecimientos de comida rápida estadounidense con sede central en Miami, Florida, fundada por James McLamore y David Edgerton, presente a nivel internacional y especializada principalmente en la elaboración de hamburguesas.",
      Img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/800px-Burger_King_2020.svg.png",
    }
  ],
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
