import React, { Component } from "react";
import { connect } from "react-redux";
import { removeProductFromOrder,getProductsFromOrder } from "../actions/index";
import { Link } from 'react-router-dom';

export class Order extends Component {
  componentDidMount(){
    this.props.getProductsFromOrder(id, user, payload);
    // }else this.props.getProductsFromOrderGuest()
  }
  render() {
    return (
      <div>
        <h2>Carrito de compras</h2>
        <ul>
          {
            this.props.order && this.props.order.map((el,i) => (
              <div>
                <h4>{el}</h4>
               {/* <button onClick={() => this.props.removeProductFromOrder({})> X </button>*/}
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
    order: state.order,
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeProductFromOrder: order => dispatch(removeProductFromOrder(order)),
    getProducts: products => dispatch(getProducts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
