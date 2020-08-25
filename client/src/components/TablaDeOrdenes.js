import React, { Component, Link } from 'react';
import { connect } from "react-redux";
import {getOrders} from '../actions/index';
import Order from './Order.js';

export class TablaDeOrdenes extends Component {

  componentDidMount(){
    this.props.getOrders();
  }

  calculoTotalOrden (products) {
    var totalDeOrden = 0;
    if(products !== []){
      products.map( e => {
        totalDeOrden = totalDeOrden + (e.order_line.price * e.order_line.cantidad)
      })
    }
    return totalDeOrden;
  }

  render() {
    return (
      <div className="divroot">
        <h2 className = "text"> Órdenes </h2>
        <ul>
          {this.props.order && this.props.order.map((el,i) => (
            <div className = "container">
              <h5 className = "text">Número de órden: {el.id}</h5>
              <h5 className = "text">Usuario: {el.user.nombre} {el.user.apellido}</h5>
              <h5 className = "text">Estado: {el.estado}</h5>
              <h5 className = "text">Última fecha de modificación: {el.updatedAt}</h5>
              <h5 className = "text">Total a pagar $ {el.products && this.calculoTotalOrden(el.products)}</h5>
              <Link to={`/orders/${el.id}/products`}>
                  <span> Detalle </span>
                  </Link>

            </div>
          ))}
      </ul>

    </div>
    )
  }
}
//Funciones que mapean al store
function mapStateToProps(state) {
  return {
    order: state.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: order => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablaDeOrdenes);
