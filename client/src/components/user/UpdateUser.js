import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {saveNewUser} from "../../actions/index"

export  class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  componentDidMount(props){
    let data = this.props.newUser 
    this.props.saveNewUser(data) 
    this.setState({
      email: this.props.newUser.email,
      password: this.props.newUser.password,
      id: this.props.newUser.id
    })
  }
    
  handleInputChange(e){
      this.setState({[e.target.name]:e.target.value})
      this.setState({id:this.props.newUser.id})
  }

  saveData(e){
    e.preventDefault()
    axios.put(`http://localhost:3001/users/${this.state.id}`, this.state )
    .then(res => {
      if(res.status === 201){
        alert("Datos Guardados Exitosamente");
      }  
    })
    .catch(err => {return "error"})
  }

  render () {
    return (
      <div >
        <form>
          <label>Nombre:</label>
          <input type="text" name="nombre" placeholder="Ingrese nombre" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Apellido:</label>
          <input type="text" name="apellido" placeholder="Ingrese apellido" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Direccion Calle:</label>
          <input type="text" name="calle" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Númeral:</label>
          <input type="text" name="numero" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Departamento:</label>
          <input type="text" name="departamento" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Localidad:</label>
          <input type="text" name="localidad" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Provincia:</label>
          <input type="text" name="provincia" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Teléfonos</label>
          <label>Celular/Whatsapp</label>
          <input type="tel" name="telefono1" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>
          <label>Trabajo</label>
          <input type="tel" name="telefono2" placeholder="telefono.." onChange={(e) => this.handleInputChange(e)}></input>
          <button onClick={(e) => this.saveData(e)} >Guardar</button>   
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveNewUser: (data) => dispatch(saveNewUser(data)),
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.newUser,
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);

