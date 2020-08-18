import React, { Component } from "react";
import { connect } from "react-redux";
import { removeProduct } from "../../actions/index";
import { Link } from 'react-router-dom';


export class ShoppingCart extends Component {

  render() {
    return (
      <div>
        <h2>Carrito de compras</h2>
        <ul>
          {
            this.props.shoppingCart && this.props.shoppingCart.map((el,i) => (
              <div>
                <h4>{el.name}</h4>
                <button onClick={() => this.props.removeProduct({name: el.name id: el.id})}> X </button>
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeProduct: shoppingCart => dispatch(removeProduct(shoppingCart))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
