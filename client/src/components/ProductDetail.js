import React from 'react';
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
              <div className="catalog row">
                <div className="card col-4">
                  <h2 className = "card-title title texto-tierra"> Detalle del producto </h2>
                    <div className="card-body">
                        <img className="fotoDetalle" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    </div>
                    <div className="card-body" >
                        <h3 className = "card-title title texto-tierra">{this.props.productDetail && this.props.productDetail.name}</h3>
                        <p className = "card-text text texto-tierra">Categoría:</p>
                        {this.props.productCategories.map(item=>{
                          return <p className = "card-text text texto-tierra">{item.name}</p>
                        })}
                        <p className = "card-text text texto-tierra">Descripción: {this.props.productDetail && this.props.productDetail.description}</p>
                        <p className = "card-text title texto-tierra">Precio $: {this.props.productDetail && this.props.productDetail.price}</p>
                        <p className = "card-text text texto-tierra">Stock: {this.props.productDetail && this.props.productDetail.stock}</p>
                        <div>
                            {this.botonEditar()}
                        </div>
                        <Link to="/products">
                        <button class="btn btn-outline-success botonDetalle1" onClick={() => this.props.addProductToCart(this.props.user, this.props.match.params.id, {price: this.props.productDetail && this.props.productDetail.price, productId: this.props.match.params.id})}> Comprar </button>
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
