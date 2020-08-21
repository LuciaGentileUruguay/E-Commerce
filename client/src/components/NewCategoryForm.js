import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { getCategories} from '../actions/index';

export class NewCategoryForm extends React.Component {

  constructor(props) {
      super(props);
        this.state={category:{}}
  }
  componentDidMount () {
    this.props.getCategories()
  }

  handleInputChange (e) {
    this.state.category[e.target.name]= e.target.value;
  }

  saveCat(){
    console.log(this.state.category)
    axios.post(`http://localhost:3001/categories`,this.state.category)
    .then(res => {
      if(res.status === 200){
        alert("CATEGORIA GUARDADA CORRECTAMENTE");
      }
    })

  }

  render () {
    return (
      <form >
            
           
            
          <div>
          
            <label>Nombre:</label>		
	        <input name="name" type="text" 
          onChange={(e) => this.handleInputChange(e) }>		
			     </input>
        </div>

        <div className = "divForm">
        <label>Descripción:</label>
        <input name="description" type="text" 
          onChange={(e) => this.handleInputChange(e) }>		
			     </input>
          
        </div>

        
        <button onClick={(e) => {
        e.preventDefault()
        this.saveCat() }}> Guardar </button>
          <Link to={"/products/"+this.props.productDetail.id}>
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
    
export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryForm);
