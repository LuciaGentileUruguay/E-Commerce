import React from 'react';
import axios from 'axios';

export default class extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        categories: [{
          name: props.name,
          description: props.description
        }]
      }
      this.setState = this.setState.bind(this);
  }

  handleInputChange (e) {
    this.state.categories[0][e.target.name]= e.target.value;
  }

  saveCat(){
    axios.post(`http://localhost:3001/categories`, this.state.categories[0])
      .then(res => {
        if(res.status === 200){
          alert("CATEGORIA GUARDADA CORRECTAMENTE");
        }
      })
  }

  render () {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.saveCat() }}>

        <div className = "divForm">
          <label>Nombre:</label>
          <input type="text" name="name" onChange={(e) => this.handleInputChange(e)} value={this.state.name} />
        </div>
        <div className = "divForm">
          <label>Descripción:</label>
          <input type="text" name="description" onChange={(e) => this.handleInputChange(e)} value={this.state.description} />
        </div>
        <button className="btn btn-sm btn-danger"> Guardar </button>
      </form>
    )
    }

}
