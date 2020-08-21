import React, { Component } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { removeProductFromCart, getProductsCart} from "../actions/index";
import { Link } from 'react-router-dom';

export class Order extends Component {
  componentDidMount(){
    const { match: { params: { id }}} = this.props; //id del user
    this.props.getProductsCart(id);

  }
  render() {
    return (
      <div>
        {console.log(this.props)}
        <h2>Carrito de compras</h2>
        <ul>
          {
            this.props.order.products && this.props.order.products.map((el,i) => (
              <div>
                <Link to = {'/products/' + el.id}><h4>{el.name}</h4></Link>
                <h5>IMAGEN</h5>
                <h5>Precio $ {el.order_line.price}</h5>
                <h5>Cantidad {el.order_line.cantidad}</h5>
                <h5>Total $ {el.order_line.price * el.order_line.cantidad}</h5>
                <Link to = {'/cart/'+this.props.match.params.id}><button onClick={() => this.props.removeProductFromCart(this.props.match.params.id, el.id)}> X </button></Link>
                <h1>Counter: {count}</h1>
                <button onClick={() => dispatch(actions.increment())}>+</button>
                <button onClick={() => dispatch(actions.decrement())}>-</button>  
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}
  

export default App;

function mapStateToProps(state) {
  return {
    order: state.order
  };
}

function mapDispatchToProps(dispatch) {
   return {getProductsCart: id => dispatch(getProductsCart(id)), removeProductFromCart: (id, prodId) => dispatch(removeProductFromCart(id, prodId))}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
