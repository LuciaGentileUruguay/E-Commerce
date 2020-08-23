import React, { Component } from "react";
import SearchBar from './SearchBar.js';
import { Link, Route} from 'react-router-dom';
import { connect } from "react-redux";
import './nav.css';
import { setAdmin } from '../actions/index';


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

          <Link to = "/admin" onClick={()=>this.props.setAdmin(true) }>
            <span id="navigation">Opciones Admin</span>
          </Link>
          <button onClick={()=>this.props.setAdmin(false) }>
            User
          </button>


          <Route exact path='/products' render={() => <SearchBar onSearch={this.props.onSearch}/>}/>
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
    setAdmin: (payload) => dispatch(setAdmin(payload)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav);
