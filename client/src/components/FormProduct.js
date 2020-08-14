import React from 'react';
import axios from 'axios';

export default class extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        products: [{name: '', description: '', price: 0, stock: 0}]
      }
      this.setState = this.setState.bind(this);
  }

  handleInputChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  save(){
    axios.post(`http://localhost:3001/`, this.state)
      .then(res => {
        console.log(res);
        if(res.status === 200){
          alert("PRODUCTO GUARDADO CORRECTAMENTE");
        }

      })
  }

/*  handleSubmit(e) {
    alert('A product was submitted: ' + this.state.value);
    e.preventDefault();
  }*/

  render () {
    return (
      <form onSubmit={(e) => {e.preventDefault();
            alert('A product was submitted: ' + this.state.name);
          }}>
        
          <div className = "divForm">
          <label> Product Name: </label>
          <input type="text" name="name" onChange={(e) => this.handleInputChange(e)} value={this.state.name} />
          </div>
          <div className = "divForm">
            <label>Categoría:</label>
            <input type="text" name="category" onChange={(e) => this.handleInputChange(e)} value={this.state.category} />
          </div>
        <div className = "divForm">
          <label>Descripción:</label>
          <input type="text" name="description" onChange={(e) => this.handleInputChange(e)} value={this.state.description} />
        </div>
        <div className = "divForm">
          <label>Precio:</label>
          <input type="text" name="price" onChange={(e) => this.handleInputChange(e)} value={this.state.price} />
        </div>
        <div className = "divForm">
          <label>Stock:</label>
          <input type="text" name="stock" onChange={(e) => this.handleInputChange(e)} value={this.state.stock} />
        </div>
        <input id= "botonBorrar" type='submit' value="Borrar"/>
        <button onClick={this.save()} className="btn btn-sm btn-danger"> Guardar </button>
      </form>
    )
    }

}
