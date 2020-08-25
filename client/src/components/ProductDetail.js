import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getProductDetail, getProductsCategories, addProductToCart } from '../actions/index';
import './ProductDetail.css';
import axios from 'axios';
import {Link,Route} from "react-router-dom";


class ProductDetail extends React.Component {
  constructor(props){
    	    super(props);
    	  }

        botonEditar=()=>{
          console.log(this.props.admin);
          if(this.props.admin) {
            return(<Link to="/form_product">
                          <button className= "button">Editar</button>
                        </Link>)}
                                          
        }
        componentDidMount(){
          const { match: { params: { id }}} = this.props; //id de producto
          this.props.getProductDetail(id);
          this.props.getProductsCategories(id);
          }

          render() {
            return (
              <div>
                <div className="divroot">
                  <h2 className = "text"> Detalle del producto </h2>
                    <div className="container">
                        <img className="foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    </div>
                    <div className="container" >
                        <h3 className = "text">Nombre: {this.props.productDetail && this.props.productDetail.name}</h3>
                        {this.props.productCategories.map(item=>{
                          return <p className = "p">Categoría: {item.name}</p>
                        })}
                        <p className = "p">Descripción: {this.props.productDetail && this.props.productDetail.description}</p>
                        <p className = "p">Precio: {this.props.productDetail && this.props.productDetail.price}</p>
                        <p className = "p">Stock: {this.props.productDetail && this.props.productDetail.stock}</p>
                        <div>
                            {this.botonEditar()}
                        </div>
                        <Link to="/products">
                        <button class="btn btn-outline-success" onClick={() => this.props.addProductToCart(this.props.user, this.props.match.params.id, {price: this.props.productDetail && this.props.productDetail.price, productId: this.props.match.params.id})}> Comprar </button>
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
    user: state.user,
    admin: state.admin
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);



