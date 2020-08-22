import React, { Component } from "react";
import SearchBar from './SearchBar.js';
import { Link, Route} from 'react-router-dom';
import { connect } from "react-redux";
import './nav.css';

//function Nav({onSearch}) {
export class Nav extends Component {
  constructor(props){
    super(props)
    console.log(this.props);
  }
  render(){
    return (
        <nav id="navigation">
          <Link to='/'>
            <span id="navigation">
               Inicio 
            </span>
          </Link>

          <Link to='/products' onClick={()=>this.props.onSearch("") } >
            <span id="navigation"> Tienda </span>
          </Link>

          <Link to='/login'>
            <span id="navigation">
              Login
            </span>
          </Link>

          <Link to = {"/cart/"+this.props.user}>
            <span id="navigation">Carrito</span>
          </Link>

          <Link to = "/categories">
            <span id="navigation">Categorias</span>
          </Link>

          <Link to = "/form_product">
            <span id="navigation">Nuevo Producto</span>
          </Link>

          <Link to = "/form_categories">
            <span id="navigation">Nueva Categoria</span>
          </Link>

          <Route exact path='/products' render={() => <SearchBar onSearch={this.props.onSearch}/>}/>
        </nav>
      )}
  }


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Nav);
