import { ADD_PRODUCT, ADD_CATEGORY, REMOVE_PRODUCT, REMOVE_CATEGORY, SET_PRODUCT, SET_CATEGORY, GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_DETAIL } from '../actions';

//Definimos el estado inicial
const initialState = {
  products: [],
  shoppingCart: [],
  categories: [],
  productDetail: {}
};


function rootReducer(state = initialState, action) {
  if (action.type === ADD_PRODUCT) { //Agregamos un producto al carrito
      return {
        ...state, //traigo todo el estado, tal cual
        shoppingCart:[...state.shoppingCart, action.payload]
      }
  }

  if (action.type === REMOVE_PRODUCT) { //quitamos un producto del carrito de compras
    return {
        ...state,
        shoppingCart: state.shoppingCart.filter(item => item.id !== action.payload.id)
        //dejamos en el array todos los que son distintos de la que quiero eliminar
    };
  }


  if (action.type === GET_PRODUCTS) { //traemos todos los productos para listarlos
      return {
        ...state,
        products: action.payload
      };
  }

  if (action.type === GET_CATEGORIES) { //traemos todas las categorías para listarlas
      return {
        ...state,
        categories: action.payload
      };
  }

  if (action.type === GET_PRODUCT_DETAIL) {
    console.log(action.payload);
      return {
        productDetail: action.payload //no nos interesa guardar datos anteriores en este caso. ...state creo que puede no estar
      };
  }

  return state;
}

export default rootReducer;
