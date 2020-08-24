import axios from 'axios';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const CLEAN_PRODUCT_DETAIL = 'CLEAN_PRODUCT_DETAIL';
export const GET_PRODUCTS_FROM_CATEGORY = 'GET_PRODUCTS_FROM_CATEGORY';
export const GET_PRODUCTS_CART = 'GET_PRODUCTS_CART';
export const ADD_USER = 'ADD_USER';
export const SAVE_NEW_USER ='SAVE_NEW_USER';

export const SET_ADMIN = 'SET_ADMIN';

export const GET_ORDERS ='GET_ORDERS';

export function setProduct(payload) {  //modicamos un producto
  return { type: SET_PRODUCT, payload };
}

export function setAdmin(payload) {  //cambio a admin o usuario regular
  return { type: SET_ADMIN, payload };
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

export function addProductToCart(id, prodId, payload) { //id = userId, payload = producto
  return function(dispatch) {
    return axios.post("http://localhost:3001/users/" + id +"/cart/", payload)
      .then(json => {
        dispatch({ type: ADD_PRODUCT_TO_CART, payload});
      });
  };
}

export function removeProductFromCart(id, prodId) { //eliminamos un producto del carrito de un usuario id
  return function(dispatch) {
    return axios.delete("http://localhost:3001/users/" + id +"/cart/" + prodId)
      .then(json => {
        dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: prodId });
      });
  };
}

export function getProducts() { //Listar productos
  return function(dispatch) {
    return axios.get("http://localhost:3001/products")
      .then(json => {
        dispatch({ type: GET_PRODUCTS, payload: json.data }); //el payload seran todos los productos que me devuelve la BD
      });
  };
}

export function getProductsByName(product) { //Listar productos
  return function(dispatch) {
    return axios.get("http://localhost:3001/products?search="+product)
      .then(json => {
        dispatch({ type: GET_PRODUCTS_BY_NAME, payload: json.data }); //el payload seran todos los productos que me devuelve la BD
      });
  };
}

export function getProductsFromCategory(id) { //Listar productos de una categoría
  return function(dispatch) {
    return axios.get("http://localhost:3001/products/category/" + id)
      .then(json => {
        dispatch({ type: GET_PRODUCTS_FROM_CATEGORY, payload: json.data }); //el payload seran todos los productos de una categoría
      });
  };
}


export function getProductsCart(userId){
  return function(dispacth){
    return axios.get("http://localhost:3001/users/"+userId+"/cart")
    .then(res=>{
      dispacth({type: GET_PRODUCTS_CART, payload: res.data})
    })
    .catch(err=>{
      alert(err);
    })
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
export function getProductsCategories(id) { //Listar categorías
  return function(dispatch) {
    return axios.get("http://localhost:3001/categories/product/"+id)
      .then(json => {
        dispatch({ type: GET_PRODUCT_CATEGORIES, payload: json.data }); //el payload seran todas las categorías que me devuelve la BD
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

export function cleanProductDetail() { // borra detalle de un producto del store
  return { type: CLEAN_PRODUCT_DETAIL ,
           payload:{} };
}


export function addUser(email,password){
  return {type: ADD_USER, payload: {email:email,password:password}}
}

export function saveNewUser(data){
  return function(dispatch){
    return axios.post("http://localhost:3001/users",data)
      .then(resp=>{
        dispatch({type: SAVE_NEW_USER, payload: resp.data})
    })
  }
}


export const increment = (id, prodId) => (
  function(dispatch){
    axios.put("http://localhost:3001/users/" + id +"/cart/" + prodId, {accion: "INC"})
    .then(json => {
        dispatch({ type: "INCREMENT", payload:prodId});
      });
});

export const decrement = (id, prodId) => (
  function(dispatch){
    axios.put("http://localhost:3001/users/" + id +"/cart/" + prodId, {accion: "DEC"})
        .then(json => {
        dispatch({ type: "DECREMENT", payload:prodId});
      });
});

export function getOrders() { //lista todas las órdenes de todos los usuarios
  return function(dispatch) {
    return axios.get("http://localhost:3001/orders")
      .then(json => {
        dispatch({ type: GET_ORDERS, payload: json.data }); //el payload seran todos las órdenes
      });
  };
}
