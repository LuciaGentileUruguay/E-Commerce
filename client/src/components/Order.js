import React, { Component } from "react";
import { connect } from "react-redux";
import { removeProductFromOrder, getProductsCart } from "../actions/index";
import { Link } from 'react-router-dom';

export class Order extends Component {
  componentDidMount(){
    const { match: { params: { id }}} = this.props;
    this.props.getProductsCart(id);
    
  }
  render() {
    return (
      <div>
        {console.log(this.props)}
        <h2>Carrito de compras</h2>
        <ul>
          {
            this.props.order && this.props.order.map((el,i) => (
              <div>
                <h4>{el.productId}</h4>
               {/* <button onClick={() => this.props.removeProductFromOrder({})>  */}
              </div>
            ))
          }
        </ul>
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
   return {getProductsCart: id => dispatch(getProductsCart(id))}  //{
  //   removeProductFromOrder: order => dispatch(removeProductFromOrder(order)),
  //   getProducts: products => dispatch(getProducts())
  // };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
