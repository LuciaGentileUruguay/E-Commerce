import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCategories} from '../actions/index';
import {Link} from "react-router-dom";

export class FormCategories extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        id: null,
        name: '',
        description: ''
      }
  }
  componentDidMount () {
    this.props.getCategories()
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelectChange(e) {
    const categorySelected = this.props.categories.find(cat => cat.id == e.target.value);
    this.setState({
      id: categorySelected.id,
      name: categorySelected.name,
      description: categorySelected.description
    })
  }

  saveCat(){
    axios.post(`http://localhost:3001/categories`,this.state)
    .then(res => {
      if(res.status === 200){
        alert("CATEGORIA GUARDADA CORRECTAMENTE");
      }
    })

  }
  modifyCat(){
    axios.put("http://localhost:3001/categories/" + this.state.id,
    this.state)
    .then(res => {
      if(res.status === 200){
        alert("CATEGORIA MODIFICADA CORRECTAMENTE");
      }
    })

  }
  deleteCat(){
    axios.delete("http://localhost:3001/categories/" + this.state.id)
    .then(res => {
      if(res.status === 200){
        alert("CATEGORIA BORRADA CORRECTAMENTE");
      }
    })

  }




  render () {
    return (
      <form>

        <div className = "divForm">
        <select
        name="id"

	        onChange={(e) => this.handleSelectChange(e) }>
	        <option disabled selected>Elija Categoria...</option>
	        {this.props.categories && this.props.categories.map(item => {
	                return (
	                  <option value ={item.id}>{item.name}</option>
	                  )})}
	        </select>
          </div>

          <div>
            <label>Nuevo Nombre:</label>
	        <input name="name" type="text" value={this.state.name}
          onChange={(e) => this.handleInputChange(e) }>
			     </input>
        </div>

        <div className = "divForm">
        <label>Nueva Descripción:</label>
        <input name="description" type="text" value={this.state.description}
          onChange={(e) => this.handleInputChange(e) }>
			     </input>

        </div>
        <button onClick={(e) => {
            this.modifyCat()
            this.props.getCategories()
       }}> Guardar </button>
        <button onClick={(e) => {
              this.deleteCat()
              this.props.getCategories() }
        }> Borrar </button>
         <Link to="/new_category_form">
         <button>Crear Nueva Categoria</button>
         </Link>
         <Link to="/form_product">
         <button>Volver a Producto</button>
         </Link>
         <Link to="/products/">
         <button>Volver a Tienda</button>
         </Link>
      </form>
    )
    }

}

const mapStateToProps = state => {
  return {
    productDetail: state.productDetail,
    categories:state.categories
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategories()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCategories);
