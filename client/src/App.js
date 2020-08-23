import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './components/Products.js';
import FormProduct from './components/FormProduct.js';
import NewCategoryForm from './components/NewCategoryForm.js'
import FormCategories from './components/FormCategories.js'
import ProductDetail from "./components/ProductDetail.js";
import Categories from './components/Categories.js';
import FiltroCategoria from './components/FiltroCategoria.js';
import Nav from './components/Nav.js';
import Order from './components/Order.js';
import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';
import axios from 'axios';
import { getProducts,getProductsByName } from './actions/index';
import { connect } from "react-redux";
import UpdateUser from './components/user/UpdateUser';
import NewUser from './components/user/NewUser';
import Login from './components/user/Login';
import TablaDeOrdenes from './components/TablaDeOrdenes.js';

class App extends React.Component{
  constructor(){
    super();
      this.onSearch = (product) => {
      this.props.getProductsByName(product)
    }
  }
  componentDidMount(){
    this.props.getProducts();
  }


  render(){
    return (
      <div>
        <Route path='/' render={() => <Nav onSearch={this.onSearch}/>}/>
        <Route exact path='/'component={Landing} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/orders' component={TablaDeOrdenes} />
        <Route exact path='/new_category_form'component={NewCategoryForm} />
        <Route exact path='/form_categories'component={FormCategories} />
        <Route exact path='/form_product'component={FormProduct} />
        <Route exact path='/categories'component={Categories} />
        <Route exact path='/category/:id' component = {FiltroCategoria}/>
        <Route exact path='/cart/:id' component = {Order}/>
        <Route exact path='/login' component = {Login}/>
        <Route exact path='/login/userdata' component = {UpdateUser}/>
        <Route exact path='/login/newuser' component = {NewUser}/>
        {/*se agrego la ruta para mostrar los detalles del producto */}
      {/*  <Route exact path='/products/:id' render={({match}) => <ProductDetail id={match.params.id}/>}/>*/}
        <Route exact path='/products/:id' component = {ProductDetail}/>
    </div>
    )
  }
}

	const mapDispatchToProps = dispatch => {
  	  return {
  	    getProductsByName: (product) => dispatch(getProductsByName(product)),
  	    getProducts: ()=> dispatch(getProducts())
  	  }
  	}

  	const mapStateToProps = state => {
  	  return {
  	    productDetail: state.products
  	  }
  	}


	export default connect(mapStateToProps, mapDispatchToProps)(App);
