import React, { Component } from "react";
import { connect } from "react-redux";
import { increment,decrement,removeProductFromCart, getProductsCart} from "../actions/index";
import { Link } from 'react-router-dom';



export class Order extends Component {


  componentDidMount(){
    const { match: { params: { id }}} = this.props; //id del user
    this.props.getProductsCart(id);

  }

  calculoTotal (products) {
    var totalDeOrden = 0;
    products.map( e => {
      totalDeOrden = totalDeOrden + (e.order_line.price * e.order_line.cantidad)
    })
    return totalDeOrden;
  }

  render() {
    return (
      <div>
        <h2>Carrito de compras</h2>
        <ul>
          {
            this.props.order.products && this.props.order.products.map((el,i) => (
              <div>
                <Link to = {'/products/' + el.id}><h4>{el.name}</h4></Link>
                <button onClick={() => this.props.removeProductFromCart(this.props.match.params.id, el.id)}> X </button>
                <h5>IMAGEN</h5>
                <h5>Precio $ {el.order_line.price}</h5>
                <h5>Total $ {el.order_line.price * el.order_line.cantidad}</h5>
                <h5>Cantidad {el.order_line.cantidad}</h5>
                <button onClick={() => this.props.decrement(this.props.match.params.id, el.id)}>-</button>
                <button onClick={() => this.props.increment(this.props.match.params.id, el.id)}>+</button>
              </div>
            ))
          }
        </ul>
        <div>
          <h5>Total a pagar $ {this.props.order.products && this.calculoTotal(this.props.order.products)}</h5>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    order: state.order
  };
}

function mapDispatchToProps(dispatch) {
   return {
            getProductsCart: id => dispatch(getProductsCart(id)),
            removeProductFromCart: (id, prodId) => dispatch(removeProductFromCart(id, prodId)),
            decrement: (id, prodId) => dispatch(decrement(id, prodId)),
            increment: (id, prodId) => dispatch(increment(id, prodId))
          }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
