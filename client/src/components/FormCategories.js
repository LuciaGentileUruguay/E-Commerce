import React from 'react';

export default class extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        products: [{id: '', nombre: '', descripcion: ""}]
      }
      this.setState = this.setState.bind(this);
  }

  handleInputChange (e) {
    this.setState({[e.target.name]: e.target.value});
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
          <label> Id: </label>
          <input type="text" name="id" onChange={(e) => this.handleInputChange(e)} value={this.state.name} />
          </div>
        <div className = "divForm">
          <label>Name:</label>
          <input type="text" name="name" onChange={(e) => this.handleInputChange(e)} value={this.state.description} />
        </div>
        <div className = "divForm">
          <label>Description:</label>
          <input type="text" name="description" onChange={(e) => this.handleInputChange(e)} value={this.state.price} />
        </div>
        <input id= "botonSubmit" type='submit' value="Submit"/>
      </form>
    )
    }

}