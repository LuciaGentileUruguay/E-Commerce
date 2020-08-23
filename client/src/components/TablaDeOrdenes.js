import React, { Component } from 'react';
import { connect } from "react-redux";
import {getOrders} from '../actions/index';
import Order from './Order.js';

export class TablaDeOrdenes extends Component {

  componentDidMount(){
    this.props.getOrders();
  }

  render() {
    return (
      <div>
        <h2> Órdenes </h2>
        <ul>
          {this.props.order && this.props.order.map((el,i) => (
            <div>
              <h5>Id: {el.id}</h5>
              <h5>Usuario: {el.userId}</h5>
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
    getOrders: orders => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablaDeOrdenes);
