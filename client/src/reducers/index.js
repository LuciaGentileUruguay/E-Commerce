import { ADD_PRODUCT_TO_CART, ADD_CATEGORY, REMOVE_PRODUCT_FROM_CART, REMOVE_CATEGORY, SET_PRODUCT, SET_CATEGORY,
  GET_PRODUCTS,GET_PRODUCTS_BY_NAME, GET_PRODUCTS_FROM_CATEGORY, GET_CATEGORIES,GET_PRODUCT_CATEGORIES,
  GET_CAT_FROM_PRODUCT, GET_PRODUCT_DETAIL, GET_PRODUCTS_CART, ADD_USER, SAVE_NEW_USER, GET_ORDERS } from '../actions';

//Definimos el estado inicial
const initialState = {
  products: [],
  user: 1,
  order: [], //tenemos una lista de productos
  categories: [],
  productCategories:[],
  productDetail: {categoryId: []},
  newUser:{}
};


function rootReducer(state = initialState, action) {
  if (action.type === ADD_PRODUCT_TO_CART) { //Agregamos un producto al carrito
      return {
        ...state, //traigo todo el estado, tal cual
        order: action.payload
      }
  }

  if (action.type === REMOVE_PRODUCT_FROM_CART) { //quitamos un producto del carrito de compras
    return {
        ...state,
        order:{
          ...state.order,
          products: state.order.products.filter(item => item.id !== action.payload )}
        //dejamos en el array todos los que son distintos de la que quiero eliminar
    };
  }


  if (action.type === GET_PRODUCTS) { //traemos todos los productos para listarlos
      return {
        ...state,
        products: action.payload
      };
  }
  if (action.type === GET_PRODUCTS_BY_NAME) { //traemos los productos por nombtr
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

  if (action.type === GET_PRODUCT_CATEGORIES) { //traemos todas las categorías para listarlas
    return {
      ...state,
      productCategories: action.payload
    };
}

  if (action.type === GET_PRODUCTS_CART) { //traemos todos los productos de una orden
    //console.log(action.payload);
      return {
        ...state,
        order: action.payload
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

  if (action.type === ADD_USER){
    return {
      ...state,
      newUser: action.payload

    }
  }

  if (action.type === SAVE_NEW_USER){
    return{
      ...state,
      newUser: action.payload
    }
  }

  if (action.type === GET_ORDERS){
    return{
      ...state,
      order: action.payload
    }
  }

  switch (action.type) {
      case 'INCREMENT':
            return {
              ...state,
              order:{...state.order,
                      products:state.order.products.map(product =>  {
                        if (product.id === action.payload){
                          return {
                            ...product,
                            order_line:{
                              ...product.order_line,
                              cantidad:product.order_line.cantidad+1
                            }
                          }
                      } else return product
                    })
                    }
                  };
      case 'DECREMENT':
            return {
              ...state,
              order:{...state.order,
                      products:state.order.products.map(product =>  {
                        if (product.id === action.payload){
                          let canti = product.order_line.cantidad
                          if (canti > 1){
                            return {
                              ...product,
                              order_line:{
                                ...product.order_line,
                                cantidad:canti-1
                              }
                            }
                          }  else return product
                      } else return product
                    })
                    }
                  };
            };

  return state;
}

export default rootReducer;
