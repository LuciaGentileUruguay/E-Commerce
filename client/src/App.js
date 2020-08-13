import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './components/Products.js';
import FormProduct from './components/FormProduct.js';
import FormCategories from './components/FormCategories.js'
//import SearchBar from './components/SearchBar.js';
import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';


//Definicion de props

function App(props) {

  return (
    <div>
      <Route exact path='/'component={Landing} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/FormProduct'component={FormProduct} />
      <Route exact path='/FormCategories'component={FormCategories} />
    {/*      <Route exact='/SearchBar'component={SearchBar} /> */}
    </div>

  );
}

export default App;
