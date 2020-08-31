import React from 'react';
import { connect } from 'react-redux';
import { getProductDetail, getProductsCategories, addProductToCart } from '../actions/index';
import './ProductDetail.css';
import {Link} from "react-router-dom";

//COMPONENTE PARA MOSTRAR EL DETALLE DE UN PRODUCTO
class ProductDetail extends React.Component {
  constructor(props){
    super(props);
  }

 //BOTON RENDERIZADO SOLO SI EL USER ISADMIN
  botonEditar=()=>{
    if(this.props.user.isAdmin) {
      return(
        <Link to="/form_product">
          <button type="button" class="btn btn-outline-secondary">Editar</button>
        </Link>
      )
    }                                  
  }

   //FUNCION PARA TRAER EL DETALLE DEL PRODUCTO Y SI TIENE CATEGORIAS ASOCIADAS
  componentDidMount(){
    const { match: { params: { id }}} = this.props; //ID DEL PRODUCTO A BUSCAR
    this.props.getProductDetail(id); //TRAE EL PRODUCTO
    this.props.getProductsCategories(id); // SI TIENE CATEGORIAS..
  }

  render() {
    return (
      <div className="catalog row">
        <div className="card col-4">
          <h2 className = "card-title title texto-tierra"> Detalle del producto </h2>
            <div className="card-body">
               <img className="fotoDetalle" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            </div>
            <div className="card-body" >
              <h3 className = "card-title title texto-tierra">{this.props.productDetail && this.props.productDetail.name}</h3>
              <p className = "card-text text texto-tierra">Categoría:</p>

              {/* MAPEA LAS CATEGORIAS */}
              {this.props.productCategories.map(item=>{
                return <p className = "card-text text texto-tierra">{item.name}</p>
              })}
              <p className = "card-text text texto-tierra">Descripción: {this.props.productDetail && this.props.productDetail.description}</p>
              <p className = "card-text title texto-tierra">Precio $: {this.props.productDetail && this.props.productDetail.price}</p>
              <p className = "card-text text texto-tierra">Stock: {this.props.productDetail && this.props.productDetail.stock}</p>

              {/* BOTON PARA EL ADMIN EDITA EL PRODUCTO */}
              <div>
                  {this.botonEditar()}
              </div>

              {/* AGREGA EL PRODUCTO AL CARRITO */}
              <Link to="/products">
              <button class="btn btn-outline-success botonDetalle1" onClick={() => this.props.addProductToCart(this.props.user.id, this.props.match.params.id, {price: this.props.productDetail && this.props.productDetail.price, productId: this.props.match.params.id})}> Comprar </button>
              </Link>
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductDetail: (id) => dispatch(getProductDetail(id)),
    getProductsCategories: (id) => dispatch(getProductsCategories(id)),
    addProductToCart: (id, prodId, payload) => dispatch(addProductToCart(id, prodId, payload))
  }
}

const mapStateToProps = state => {
  return {
    productDetail: state.productDetail,
    productCategories: state.productCategories,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
