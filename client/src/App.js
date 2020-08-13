import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './components/Products.js';
import FormProduct from './components/FormProduct.js';
import FormCategories from './components/FormCategories.js'
import Nav from './components/Nav.js';
import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';
import axios from 'axios';


//Definicion de props

function App(props) {

  const [products, setProducts] = useState([]);

  function onSearch(product) {
    //Llamado al servidor
    axios.get(`http://localhost:3001/products?search=${product}`)
    .then(res => {
      console.log(res.data);
      setProducts({
        productos: res.data
      })
    })
  }

  return (
    <div>
      <Route path='/' render={() => <Nav onSearch={onSearch}/>}/>
      <Route exact path='/'component={Landing} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/FormProduct'component={FormProduct} />
      <Route exact path='/FormCategories'component={FormCategories} />
    </div>

  );
}

export default App;
