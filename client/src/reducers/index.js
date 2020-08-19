import { ADD_PRODUCT_TO_CART, ADD_CATEGORY,
 REMOVE_PRODUCT_FROM_CART, REMOVE_CATEGORY,
  SET_PRODUCT, SET_CATEGORY,
   GET_PRODUCTS, GET_PRODUCTS_FROM_CATEGORY,
   GET_CATEGORIES, GET_CAT_FROM_PRODUCT,
    GET_PRODUCT_DETAIL } from '../actions';
//Definimos el estado inicial
const initialState = {
  products: [],
  shoppingCart: [],
  categories: [],
  productDetail: {categoryId: []}
};


function rootReducer(state = initialState, action) {
  if (action.type === ADD_PRODUCT_TO_CART) { //Agregamos un producto al carrito
      return {
        ...state, //traigo todo el estado, tal cual
        shoppingCart:[...state.shoppingCart, action.payload]
      }
  }

  if (action.type === REMOVE_PRODUCT_FROM_CART) { //quitamos un producto del carrito de compras
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

  if (action.type === GET_PRODUCTS_FROM_CATEGORY) { //traemos todos los productos de una categoría
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
    //console.log(action.payload);
      return {
        ...state,
        productDetail: action.payload //no nos interesa guardar datos anteriores en este caso. ...state creo que puede no estar
      };
  }

  return state;
}

export default rootReducer;
