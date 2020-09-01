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
        this.props.removeProductFromCart(this.props.user.id, this.props.order.products[indice].id)
        swal({text: "El articulo se elimino correctamente eliminado", icon: "success"})
        return;
      }
    });
  }

  //TRAE EL CARRITO DE UN USUARIO.. LO PRECARGA Y LO DEJA EN EL STORE DE REDUX
  componentDidMount(){
    if (this.props.user.id != 0){
      this.props.getProductsCart(this.props.user.id);
    }
    
  }

  //FUNCION QUE CALCULA EL TOTAL DE LA COMPRA
  calculoTotal (products) {
    var totalDeOrden = 0;
    if (this.props.user.id !=0){
      products.map( e => {
        totalDeOrden = totalDeOrden + (e.order_line.price * e.order_line.cantidad)
      })
      return totalDeOrden;
    } else {
      products.map( e =>{
        totalDeOrden = totalDeOrden + e.price;
      })
      return totalDeOrden;
    }
     

  }


  
  render() {
    if (this.props.user.id ===0){
      return(
        <div>
          <div>
            {/* MUESTRA EL TOTAL! del guest */}
            <h5 className="texto-tierra shadowsIntoLight"> Total a pagar $ {this.props.order.products[0] && this.calculoTotal(this.props.order.products)}</h5>
          </div>
        </div>
        )


    } else {

    return (
      <div>
        <div>
          {/* MUESTRA EL TOTAL! */}
          <h5 className="texto-tierra shadowsIntoLight"> Total a pagar $ {this.props.order.products && this.calculoTotal(this.props.order.products)}</h5>
        </div>

        <div className="catalogCarrito row">

        {/* MAPEA LOS PRODUCTOS DEL CARRITO */}
        {this.props.order.products && this.props.order.products.map((el,i) => (
          <div class="card col-2">
            <div class="card-body">
              
              <img className= "card-img-top foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />

              {/* DETALLE DEL PRODUCTO */}
              <Link to = {'/products/' + el.id }><h4 class="card-title title">{el.name}</h4></Link>

              {/* PRECIO UNITARIO */}
              <h5 class="card-text text texto-tierra">Precio $ {el.order_line.price}</h5>

              {/* CANTIDAD DEL PRODUCTO */}
              <h5 class="card-text text texto-tierra">Cantidad {el.order_line.cantidad}</h5>
               {/* BOTONES DECREMENTAR E INCREMENTAR */}
                <button class="btn btn-light" onClick={() => this.props.decrement(this.props.user.id, el.id)}>-</button>
                <button class="btn btn-light" onClick={() => this.props.increment(this.props.user.id, el.id)}>+</button>
                
              {/* TOTAL UNITARIO */}
              <h5 class="card-text text texto-tierra">Total $ {el.order_line.price * el.order_line.cantidad}</h5>
                <br></br>
                {/* BORRA EL PRODUCTO SELECCIONADO */}
                <button class="btn btn-light" onClick={() => this.mostrarAlerta(i)}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg> </button>
              
            </div>
          </div>
          ))
        }
      </div>
    </div>
    );
  }
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
