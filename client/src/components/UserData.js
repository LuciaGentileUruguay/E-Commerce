import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {saveNewUser,getCategories} from "../actions/index"

export  class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
          this.state={
            
            }
        this.handleInputChange = this.handleInputChange.bind(this)    
     }

    componentDidMount(props){
   console.log(this.props.newUser)
   let data = this.props.newUser
    this.props.saveNewUser(data)
    this.setState({email:this.props.newUser.email,
      password:this.props.newUser.password,
    id:this.props.newUser.id})


    }
    
  handleInputChange(e){
      this.setState({[e.target.name]:e.target.value})
      this.setState({id:this.props.newUser.id})
      console.log(this.state)
  }


  saveData(e){
    e.preventDefault()
    console.log(this.state)
    axios.put(`http://localhost:3001/users/${this.state.id}`,
    this.state )
      .then(res => {
        if(res.status === 200){
          alert("Datos Guardados Exitosamente");
        } else {alert("hubo un error!!!")
        console.log(res);}
      })
      .catch(err => {return "error"})
  }

  render () {
    return (
        <div >
          <form 
          // onSubmit={(e)=>{
          //     e.preventDefault();
          //     this.save();
          // }}
          
          >
            <label>Nombre:</label>
            <input type="text" name="nombre" 
                placeholder="Ingrese nombre"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>Apellido:</label>
            <input type="text" name="apellido" 
                placeholder="Ingrese apellido"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>Direccion</label>
            <label>Calle;</label>
            <input type="text" name="calle" 
                placeholder="Ingrese su direccion"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>Número:</label>
            <input type="text" name="numero" 
                placeholder="Ingrese su direccion"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
             <label>departamento:</label>
            <input type="text" name="departamento" 
                placeholder="Ingrese su direccion"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>localidad:</label>
            <input type="text" name="localidad" 
                placeholder="Ingrese su direccion"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>provincia:</label>
            <input type="text" name="provincia" 
                placeholder="Ingrese su direccion"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>Teléfonos</label>
            <label>Celular/Whatsapp</label>
            <input type="tel" name="telefono1" 
                placeholder="Ingrese su direccion"
                onChange={(e) => this.handleInputChange(e)} 
            ></input>
            <label>Trabajo</label>
            <input type="tel" name="telefono2"
                // pattern="[0-9]{3}[0-9]{5}[0-9]{15}" 
                placeholder="telefono.."
                onChange={(e) => this.handleInputChange(e)}></input>
             <button onClick={(e) => this.saveData(e)} >Guardar</button>   
          </form>
        </div>
      );
    }

}
const mapDispatchToProps = dispatch => {
  return {
    saveNewUser: (data) => dispatch(saveNewUser(data)),
    getCategories: () => dispatch(getCategories())
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.newUser,
    categories: state.categories
  }
}

    
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

