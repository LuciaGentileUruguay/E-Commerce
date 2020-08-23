import React, { Component } from "react";
import SearchBar from './SearchBar.js';
import { Link, Route} from 'react-router-dom';
import { connect } from "react-redux";
import './nav.css';


export class Admin extends Component {
  constructor(props){
    super(props)
    console.log(this.props);
  }
  render(){
    return (
        <nav id="navigation">
          <Link to = "/form_product">
            <span id="navigation">Nuevo Producto</span>
          </Link>

          <Link to = "/form_categories">
            <span id="navigation">Nueva Categoria</span>
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



export default connect(mapStateToProps)(Admin);
