import React, { Component } from "react";
import { connect } from "react-redux";
import { increment,decrement,removeProductFromCart, getProductsCart} from "../actions/index";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

//COMPONENTE ORDER
export class Order extends Component {

  //SWEET ALERT PARA CONFIRMAR SI UN PRODUCTO SE QUIERE O NO SACAR DEL CARRITO
  mostrarAlerta(indice) {
    swal ({
      title: "¿Desea eliminar este producto?",
      icon: "warning",
      buttons: ["No" ,  "Si!"],
      dangerMode: true,

      //USAR WILLDELETE SINO NO RECONOCE ESE TIPO DE SWEET ALERT
    }).then(willDelete =>{
      if(willDelete){
        this.props.removeProductFromCart(this.props.match.params.id, this.props.order.products[indice].id)
        swal({text: "El articulo se elimino correctamente eliminado", icon: "success"})
        return;
      }
    });
  }

  //TRAE EL CARRITO DE UN USUARIO.. LO PRECARGA Y LO DEJA EN EL STORE DE REDUX
  componentDidMount(){
    this.props.getProductsCart(this.props.user.id);
  }

  //FUNCION QUE CALCULA EL TOTAL DE LA COMPRA
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
        <div>
          {/* MUESTRA EL TOTAL! */}
          <h5 className="texto-tierra shadowsIntoLight"> Carrito de compras. Total a pagar $ {this.props.order.products && this.calculoTotal(this.props.order.products)}</h5>
        </div>

        <div className="catalogCarrito row">

        {/* MAPEA LOS PRODUCTOS DEL CARRITO */}
        {this.props.order.products && this.props.order.products.map((el,i) => (
          <div class="card col-2">
            <div class="card-body">

              {/* BORRA EL PRODUCTO SELECCIONADO */}
              <button onClick={() => this.mostrarAlerta(i)}> X </button>
              <img className= "card-img-top foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />

              {/* DETALLE DEL PRODUCTO */}
              <Link to = {'/products/' + el.id }><h4 class="card-title title">{el.name}</h4></Link>

              {/* PRECIO UNITARIO */}
              <h5 class="card-text text texto-tierra">Precio $ {el.order_line.price}</h5>

              {/* CANTIDAD DEL PRODUCTO */}
              <h5 class="card-text text texto-tierra">Cantidad {el.order_line.cantidad}</h5>

              {/* TOTAL UNITARIO */}
              <h5 class="card-text text texto-tierra">Total $ {el.order_line.price * el.order_line.cantidad}</h5>
              
              {/* BOTONES DECREMENTAR E INCREMENTAR */}
              <button onClick={() => this.props.decrement(this.props.match.params.id, el.id)}>-</button>
              <button onClick={() => this.props.increment(this.props.match.params.id, el.id)}>+</button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    order: state.order,
    user: state.user
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
