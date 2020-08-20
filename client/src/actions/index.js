import axios from 'axios';
export const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_PRODUCT_FROM_ORDER = 'REMOVE_PRODUCT_FROM_ORDER';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const GET_PRODUCTS_FROM_CATEGORY = 'GET_PRODUCTS_FROM_CATEGORY';
export const GET_PRODUCTS_FROM_ORDER = 'GET_PRODUCTS_FROM_ORDER';

export function addProductToOrder(payload) { //agregamos un producto al carrito
  return { type: ADD_PRODUCT_TO_ORDER, payload };
}

export function removeProductFromOrder(payload) { //eliminamos un producto del carrito
  return { type: REMOVE_PRODUCT_FROM_ORDER, payload };
}

export function setProduct(payload) {  //modicamos un producto
  return { type: SET_PRODUCT, payload };
}

/*
export function addCategory(payload) { //Agregamos una categoria a la lista de categorías
  return { type: ADD_CATEGORY, payload };
}

export function removeCategory(payload) { //eliminamos una categoria
  return { type: REMOVE_CATEGORY, payload };
}

export function setCategory(payload) { //modificamos una categoría
  return { type: SET_CATEGORY, payload };
}
*/
export function getProducts() { //Listar productos
  return function(dispatch) {
    return axios.get("http://localhost:3001/products")
      .then(json => {
        dispatch({ type: GET_PRODUCTS, payload: json.data }); //el payload seran todos los productos que me devuelve la BD
      });
  };
}

export function getProductsFromCategory(id) { //Listar productos de una categoría
  return function(dispatch) {
    return axios.get("http://localhost:3001/products/category/" + id)
      .then(json => {
        console.log(json.data);
        dispatch({ type: GET_PRODUCTS_FROM_CATEGORY, payload: json.data }); //el payload seran todos los productos de una categoría
      });
  };
}

export function getProductsFromOrder(id, user = false, payload) { //Listar productos de una orden
  if(user){
    return function(dispatch) {
      return axios.get("http://localhost:3001/products/order/" + id)
        .then(json => {
          dispatch({ type: GET_PRODUCTS_FROM_ORDER, payload: json.data }); //el payload seran todos los productos de una orden
        });
    };
  }
  else {
    return { type: GET_PRODUCTS_FROM_ORDER, payload };
  }
}

export function getCategories() { //Listar categorías
  return function(dispatch) {
    return axios.get("http://localhost:3001/categories")
      .then(json => {
        dispatch({ type: GET_CATEGORIES, payload: json.data }); //el payload seran todas las categorías que me devuelve la BD
      });
  };
}

export function getProductDetail(id) { //ver detalle de un producto
  return function(dispatch) {
    return axios.get("http://localhost:3001/products/" + id)
      .then(json => {
        dispatch({ type: GET_PRODUCT_DETAIL, payload: json.data }); //en este caso el payload deberia ser sólo un producto
      });
  };
}
