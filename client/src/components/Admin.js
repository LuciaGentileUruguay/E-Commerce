import React, { Component } from "react";
import SearchBar from './SearchBar.js';
import { Link, Route} from 'react-router-dom';
import { connect } from "react-redux";
import {cleanProductDetail } from '../actions/index';
import './nav.css';


export class Admin extends Component {
  constructor(props){
    super(props)
    console.log(this.props);
  }

  newProduct(){
    this.props.cleanProductDetail()
  }

  render(){
    return (
        <nav id="navigation">
          <Link to = "/form_product">
            <span id="navigation" onClick={()=>this.newProduct()} >Nuevo Producto</span>
          </Link>

          <Link to = "/form_categories">
            <span id="navigation">Nueva Categoria</span>
          </Link>

          <Link to = "/login/userlist">
            <span id="navigation">Usuarios</span>
          </Link>

          <Route exact path='/' render={() => <SearchBar onSearch={this.props.onSearch}/>}/>
        </nav>
      )}
  }


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    cleanProductDetail: () => dispatch(cleanProductDetail())
   
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
