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
        <form className="form3">
          <label for="exampleInputEmail1">Nombre</label>
          <input class="form-control" type="text" name="nombre" placeholder="Ingrese nombre" onChange={(e) => this.handleInputChange(e)}></input>
          <label for="exampleInputEmail1">Apellido</label>
          <input class="form-control" type="text" name="apellido" placeholder="Ingrese apellido" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Direccion</label>
          <input class="form-control" type="text" name="calle" placeholder="Ingrese su direccion" onChange={(e) => this.handleInputChange(e)}></input>  
          <label for="exampleInputEmail1">Numero</label>
          <input class="form-control" type="text" name="numero" placeholder="Numero" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Departamento</label>
          <input class="form-control" type="text" name="departamento" placeholder="Departamento" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Localidad</label>
          <input class="form-control" type="text" placeholder="Localidad" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Provincia</label>
          <input class="form-control" type="text" placeholder="Provincia" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Telefonos Celular/Whatsapp</label>
          <input class="form-control" name="telefono1" placeholder="" onChange={(e) => this.handleInputChange(e)}></input> 
          <label for="exampleInputEmail1">Otro telefono</label>
          <input class="form-control" type="text" name="telefono2" placeholder="" onChange={(e) => this.handleInputChange(e)}></input>  
          <button class="btn btn-outline-success" onClick={(e) => this.saveData(e)} >Guardar</button>   
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

