import React, { Component } from "react";
import { connect } from "react-redux";
import { removeProductFromOrder, getProductsCart } from "../actions/index";
import { Link } from 'react-router-dom';

export class Order extends Component {
  componentDidMount(){
    this.props.getProductsCart(1);
    
  }
  render() {
    return (
      <div>
        {/* {console.log(this.props)} */}
        {/* <h2>Carrito de compras</h2>
        <ul>
          {
            this.props.order && this.props.order.map((el,i) => (
              <div>
                <h4>{el}</h4>
               <button onClick={() => this.props.removeProductFromOrder({})> X </button>
              </div>
            ))
          }
        </ul> */}
      </div>
    );
  }
}
//[{orderId, productId, cantidad, price},{orderId, productId, cantidad, price}]
function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

function mapDispatchToProps(dispatch) {
   return {getProductsCart: order => dispatch(getProductsCart(1))}  //{
  //   removeProductFromOrder: order => dispatch(removeProductFromOrder(order)),
  //   getProducts: products => dispatch(getProducts())
  // };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
