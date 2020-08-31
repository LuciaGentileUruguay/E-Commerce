import React, { Component } from "react";
import { connect } from "react-redux";
import {cleanProductDetail } from '../actions/index';
import './nav.css';
import Userlist from './user/userList';
import FormProduct from './FormProduct';
import NewCategoryForm from './NewCategoryForm'

//COMPONENTE PARA EL ADMIN
export class Admin extends Component {
  constructor(props){
    super(props)
    this.state={
      irA:""
    }
  }

  //AGREGAR UN PRODUCTO NUEVO
  newProduct(e){
    e.preventDefault(e);
    this.props.cleanProductDetail()
    this.setState({irA:"Producto"})
  }

  //AGREGA UNA CATEGORIA NUEVA
  newCategory(e){
    e.preventDefault();
    this.setState({irA:"Categoria"})
  }

  //TRAE LA LISTA DE TODOS LOS USUARIOS
  userList(e){
    e.preventDefault(e);
    this.setState({irA:"Lista"})
  }

  render(){

    //RENDERIZADO CONDICIONAL VACIO-->
    if (this.state.irA === ""){
      return (
        <div>
        <button  type="button" class="btn btn-outline-success" onClick={(e)=>this.newProduct(e)}>Nuevo producto</button>
        <button  type="button" class="btn btn-outline-success" name="Categoria" onClick={(e)=>this.newCategory(e)}>Nueva categoria</button>
        <button  type="button" class="btn btn-outline-success" name="Lista" onClick={(e)=>this.userList(e)}>Lista Usuarios</button>
         </div>
      )
    }

    //RENDERIZADO CONDICIONAL NUEVO PRODUCTO-->
    if (this.state.irA === "Producto"){
      return(
        <div>
          <button  type="button" class="btn btn-outline-success" name="Categoria" onClick={(e)=>this.newCategory(e)}>Nueva categoria</button>
          <button  type="button" class="btn btn-outline-success" name="Lista" onClick={(e)=>this.userList(e)}>Lista Usuarios</button>
          <FormProduct/>
        </div>
          
      )
    }
      
      //RENDERIZADO CONDICIONAL NUEVA CATEGORIA-->
    if (this.state.irA === "Categoria"){
      return(
        <div>
          <button type="button" class="btn btn-outline-success" name="Producto" onClick={(e)=>this.newProduct(e)}>Nuevo producto</button>
          <button type="button" class="btn btn-outline-success" name="Lista" onClick={(e)=>this.userList(e)}>Lista Usuarios</button>
          <NewCategoryForm/>
        </div> 
      )
    }
    
    //RENDERIZADO CONDICIONAL LISTA DE USUARIOS-->
    if (this.state.irA === "Lista"){
      return(
        <div>
          <button type="button" class="btn btn-outline-success" name="Producto" onClick={(e)=>this.newProduct(e)}>Nuevo producto</button>
          <button type="button" class="btn btn-outline-success" name="Categoria" onClick={(e)=>this.newCategory(e)}>Nueva Categoria</button>
          <Userlist/>
        </div> 
      )
    }
    
    return;
  }
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
