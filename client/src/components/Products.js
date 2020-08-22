import React, { Component } from 'react';
import './Product.css';
import { connect } from "react-redux";
import {getProducts} from '../actions/index';
import Product from './Product.js';

export class Products extends Component {

  render() {
    return (
      <div class="catalog">
          {this.props.products && this.props.products.map(item => <Product
           id={item.id}
           name={item.name}
           description={item.description}
           price={item.price}
           stock={item.stock}
           />)}
      </div>
    );
  }
}

//Funciones que mapean al store
function mapStateToProps(state) {
  return {
    products: state.products
  };
}


export default connect(mapStateToProps)(Products);
