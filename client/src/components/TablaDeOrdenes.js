import React, { Component} from 'react';
import { connect } from "react-redux";
import {getOrders, getProductsFromOrder, completeOrder} from '../actions/index';
import Order from './Order.js';
import { Link } from 'react-router-dom';

export class TablaDeOrdenes extends Component {


  componentDidMount(){
    let condition = "todas"
    this.props.getOrders(condition);
    this.props.getProductsFromOrder();
  }

  filterByCondition(e){
    let condition = e.target.value
    this.props.getOrders(condition)
  }

  changeStatus(id,estado){
    this.props.completeOrder(id,estado);
    alert("ordern modificada")
    window.location.reload(false); 


    return;
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
        <h5 className="texto-tierra shadowsIntoLight"> Órdenes </h5>
        <div>
        <p>Filtrar Ordenes por Estado:</p>
        <button value="procesando" onClick={(e)=>this.filterByCondition(e)}>Procesando</button>
        <button value="cancelada" onClick={(e)=>this.filterByCondition(e)}>Cancelada</button>
        <button value="completada" onClick={(e)=>this.filterByCondition(e)} >Completada</button>
        <button value="todas" onClick={(e)=>this.filterByCondition(e)}>Todas</button>
      </div>
      <div>
        <p>Filtrar por número de Orden:</p>
        <div>
        <p>Orden Nº:</p>
        <input type="number" />
        <button>Buscar</button>
        </div>
      </div>
        <div className="catalogCarrito row">

        {this.props.ordenes.length===0 ? <h5>No existen ordenes para el estado seleccionado</h5>:null}
         
          {this.props.ordenes && this.props.ordenes.filter(el => this.props.user.isAdmin || this.props.user.id === el.userId).map((el,i) => 
            <div class="card col-2">
              <div class="card-body">
                <h5 className="texto-tierra shadowsIntoLight">Número de órden: {el.id}</h5>
                <h5 className = "text">Usuario: {el.user.nombre} {el.user.apellido}</h5>
                <h5 className = "text">Estado: {el.estado}</h5>
                <h5 className = "text">Fecha: {el.updatedAt}</h5>
                <h5 className = "text">Total a pagar $ {el.products && this.calculoTotalOrden(el.products)}</h5>
                {this.props.user.isAdmin && (el.estado === "procesando" || el.estado ==="completada") ? <button onClick={()=>this.changeStatus(el.id,"cancelada")}>Cancelar</button>:null}
                {this.props.user.isAdmin && el.estado === "procesando" ? <button onClick={()=>this.changeStatus(el.id,"completada")}>Completar</button>:null}
                {this.props.user.isAdmin && el.estado === "completada" ? <button onClick={()=>this.changeStatus(el.id,"procesando")}>Procesar</button>:null}

                {/*Si es admin muestra todos los productos de una orden de cualquier usuario*/}
                {this.props.user.isAdmin && <Link to={`/orders/${el.id}/products`}>
                <button class="btn btn-outline-success botonDetalle1" onClick={() => this.props.getProductsFromOrder(el.id)}> Productos </button>
                </Link>}

                {/*Si es el usuario logueado muestra todos los productos de su orden*/}
                {!this.props.user.isAdmin  && <Link to={`/me/orders/products`}>
                <button class="btn btn-outline-success botonDetalle1" onClick={() => this.props.getProductsFromOrder(el.id)}> Productos </button>
                </Link>}

              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
//Funciones que mapean al store
function mapStateToProps(state) {
  return {
    ordenes: state.ordenes,
    productsFromOrder: state.productsFromOrder,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    completeOrder: (id,estado) => dispatch(completeOrder(id,estado)),
    getOrders: condition => dispatch(getOrders(condition)),
    getProductsFromOrder: (id) => dispatch(getProductsFromOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablaDeOrdenes);
