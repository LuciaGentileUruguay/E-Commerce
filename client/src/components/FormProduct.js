import React from 'react';
import axios from 'axios';

export default class extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        products: [{name: '', category: '', description: '', price: 0, stock: 0}],
        categories : []
      }
      this.setState = this.setState.bind(this);
  }

  componentDidMount () {
    axios.get('http://localhost:3001/categories')
    .then(res => {
        this.setState({categories: res.data})
      })
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

  render () {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.save() }}>

          <div className = "divForm">
          <label> Nombre: </label>
          <input type="text" name="name" value={this.state.products.name} onChange={(e) => this.handleInputChange(e)} />
          </div>
          <div className = "divForm">
            <label>Categoría:</label>
            <select onChange={(e) => this.handleInputChange(e)}>
              {this.state.categories.map(item => {
                return (<option value = {item.id} > {item.name} </option>)})}
            </select>
          </div>
        <div className = "divForm">
          <label>Descripción:</label>
          <input type="text" name="description" onChange={(e) => this.handleInputChange(e)} value={this.state.products.description} />
        </div>
        <div className = "divForm">
          <label>Precio:</label>
          <input type="text" name="price" onChange={(e) => this.handleInputChange(e)} value={this.state.products.price} />
        </div>
        <div className = "divForm">
          <label>Stock:</label>
          <input type="text" name="stock" onChange={(e) => this.handleInputChange(e)} value={this.state.products.stock} />
        </div>
        <input id= "botonBorrar" type='submit' value="Borrar"/>
        <button className="btn btn-sm btn-danger"> Guardar </button>
      </form>
    )
    }

}
