import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './components/Products.js';
import FormProduct from './components/FormProduct.js';
import FormCategories from './components/FormCategories.js'
import ProductDetail from "./components/ProductDetail.js";
import Nav from './components/Nav.js';
import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';
import axios from 'axios';
{/*
  crear request que envie el id de los productoos y devuelva el categoryId de los mismos
  crear request que envie id de la categoria y devuelva el nombre de la categorias
*/}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
    this.onSearch = (product) => {
      axios.get(`http://localhost:3001/products?search=${product}`)
      .then(res => {
        this.setState({products: res.data})
      })
    }
      //this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount () {
    axios.get('http://localhost:3001/products')
    .then(res => {
        this.setState({products: res.data})
    })
  }


  render(){
    return (
      <div>
        <Route path='/' render={() => <Nav onSearch={this.onSearch}/>}/>
        <Route exact path='/'component={Landing} />
        <Route exact path='/products' render={() => <Products products={this.state.products}/>} />
        <Route exact path='/FormCategories'component={FormCategories} />
        <Route exact path='/FormProduct'component={FormProduct} />

        {/*se agrego la ruta para mostrar los detalles del producto */}
      {/*  <Route exact path='/products/:id' render={({match}) => <ProductDetail id={match.params.id}/>}/>*/}
        <Route exact path='/products/:id' component = {ProductDetail}/>
    </div>
    )
  }
}

export default App;
