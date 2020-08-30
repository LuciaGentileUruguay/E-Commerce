import React, { Component } from "react";
import { connect } from "react-redux";
import { increment,decrement,removeProductFromCart, getProductsCart} from "../actions/index";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export class Order extends Component {

  mostrarAlerta(indice) {
    swal ({
      title: "¿Desea eliminar este producto?",
      icon: "warning",
      buttons: ["No" ,  "Si!"],
      dangerMode: true,
    }).then(willDelete =>{
      if(willDelete){
        this.props.removeProductFromCart(this.props.match.params.id, this.props.order.products[indice].id)
        swal({text: "El articulo se elimino correctamente eliminado", icon: "success"})
        return;
      }
    });
  }

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
        <div>
          <h5 className="texto-tierra shadowsIntoLight"> Carrito de compras. Total a pagar $ {this.props.order.products && this.calculoTotal(this.props.order.products)}</h5>
        </div>

        <div className="catalogCarrito row">
        {this.props.order.products && this.props.order.products.map((el,i) => (
          <div class="card col-2">
            <div class="card-body">
              <button onClick={() => this.mostrarAlerta(i)}> X </button>
              <img className= "card-img-top foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <Link to = {'/products/' + el.id }><h4 class="card-title title">{el.name}</h4></Link>
              <h5 class="card-text text texto-tierra">Precio $ {el.order_line.price}</h5>
              <h5 class="card-text text texto-tierra">Cantidad {el.order_line.cantidad}</h5>
              <h5 class="card-text text texto-tierra">Total $ {el.order_line.price * el.order_line.cantidad}</h5>

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
