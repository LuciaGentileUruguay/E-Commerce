import axios from 'axios';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';

export function addProduct(payload) { //agregamos un producto al carrito
  return { type: ADD_PRODUCT, payload };
}

export function removeProduct(payload) { //eliminamos un producto del carrito
  return { type: REMOVE_PRODUCT, payload };
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

export function getCategories() { //Listar categorías
  return function(dispatch) {
    return axios.get("http://localhost:3001/categories")
      .then(response => response.json()) //la respuesta la pasamos a json
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
