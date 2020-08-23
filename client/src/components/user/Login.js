import React from 'react';
import {Link} from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:"",
    }
  }

  handleInputChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  validateForm(e) {
    e.preventDefault();
    if (this.state.password.length>0 && /\S+@\S+\.\S+/.test(this.state.email)) {
      alert("ENTRO AL true")
      return true;
    } else {
      alert("ENTRE AL false")
      return false;
    }
  }  

  render () {
    return ( 
      <div >
        <form >
          <label>Correo Electronico:</label>
          <input type="text" name="email" placeholder="Email a registrar" onChange={(e) => this.handleInputChange(e)} autofocus></input>
          <label>Contraseña:</label>
          <input type="password" name="password" placeholder="Contraseña" onChange={(e) => this.handleInputChange(e)} autofocus></input>
          <button onClick={(e)=>this.validateForm(e)} type="submit">Entrar</button>
        </form>
        <div>
          <p>No poseee una cuenta?</p>
          <Link to="/login/newuser">
            <button>Regístrarse</button>
          </Link>         
        </div>
      </div>
    );
  }
}
