import React from 'react';
import axios from 'axios';

export default class extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        products: [{
            name: props.name,
            category: props.category,
            description: props.description,
            price: props.price,
            stock: props.stock
          }],

        categories : [],
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

    this.state.products[0][e.target.name]= e.target.value;
  }

  save(){
    axios.post(`http://localhost:3001/products`, this.state.products[0])
      .then(res => {
        if(res.status === 200){
          alert("PRODUCTO GUARDADO CORRECTAMENTE");
        }
      })
    axios.get('http://localhost:3001/products')
      .then(res=> {
        let productId =res.data[res.data.length-1].id
        axios.post("http://localhost:3001/categoryProducts", {
            productId: productId,
            categoryId: this.state.products[0].category
        })
        .then(res => {
          alert("el id de la categoria ha sido guardada")
        })
      })
  }

  render () {
    return (

      <form onSubmit={(e) => {
        e.preventDefault();
        this.save() }}>
        <div className = "divForm">
          <label> Nombre: </label>
          <input type="text" name="name" placeholder={this.state.products.name} value={this.state.products.name} onChange={(e) => this.handleInputChange(e)} />
        </div>
        <div className = "divForm">
          <label>Categoría:</label>
            <select name="category" value={this.state.products.category} onChange={(e) => this.handleInputChange(e)}>
              <option disabled>{this.props.categoryName}</option>
              {this.state.categories.map(item => {
                return (<option value = {item.id} > {item.name} </option>)})}
            </select>
        </div>
        <div className = "divForm">
          <label>Descripción:</label>
          <input type="text" name="description" placeholder={this.state.products.description} onChange={(e) => this.handleInputChange(e)} value={this.state.products.description} />
        </div>
        <div className = "divForm">
          <label>Precio:</label>
          <input type="text" name="price" placeholder={this.state.products.price} onChange={(e) => this.handleInputChange(e)} value={this.state.products.price} />
        </div>
        <div className = "divForm">
          <label>Stock:</label>
          <input type="text" name="stock" placeholder={this.state.products.stock} onChange={(e) => this.handleInputChange(e)} value={this.state.products.stock} />
        </div>
        <input id= "botonBorrar" type='submit' value="Borrar"/>
        <button className="btn btn-sm btn-danger"> Guardar </button>
      </form>
    )
  }
}
