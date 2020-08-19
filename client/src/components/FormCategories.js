import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

export class FormCategories extends React.Component {

  constructor(props) {
      super(props);
        this.state={category:{}}
  }

  handleInputChange (e) {
    this.state.category[e.target.name]= e.target.value;
  }

  saveCat(){
    axios.post(`http://localhost:3001/categories`,this.state.category)
    .then(res => {
      if(res.status === 200){
        alert("CATEGORIA GUARDADA CORRECTAMENTE");
      }
    })

  }
  modifyCat(){			
    axios.put("http://localhost:3001/categories/" + this.state.category.id,
    this.state.category)
    .then(res => {
      if(res.status === 200){
        alert("CATEGORIA MODIFICADA CORRECTAMENTE");
      }
    })

  }




  render () {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.modifyCat() }}>

        <div className = "divForm">  
        <select       
        name="id" 		
	        // value={this.props.categories} 		
	        onChange={(e) => this.handleInputChange(e) }>		
	        <option disabled selected>Elija Categoria...</option>		
	        {this.props.categories && this.props.categories.map(item => {		
	                return (		
	                  <option value ={item.id}>{item.name}</option>		
	                  )})}		
	        </select>
          </div>
          
          <div>
            <label>Nuevo Nombre:</label>		
	        <input name="name" type="text" 
          onChange={(e) => this.handleInputChange(e) }>		
			     </input>
        </div>

        <div className = "divForm">
          <label>Descripción:</label>
          <input type="text" name="description" 
          onChange={(e) => this.handleInputChange(e)} 
          value={this.props.categories.description} />
        </div>

        
        <button className="btn btn-sm btn-danger"> Guardar </button>
      </form>
    )
    }

}

	const mapStateToProps = state => {		
  	  return {		
  	    		
  	    categories:state.categories		
  	  }		
  	}		
  			
 export default connect(mapStateToProps)(FormCategories);