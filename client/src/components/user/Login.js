import React from 'react';
import {Link} from "react-router-dom";
import "./stilo.css"

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.width="50%";
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
      <div>
       <form className="form">
          <div class= "form-group">
            <label for="exampleInputEmail1">Correo electronico</label>
            <input type="email"   class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name ="email" onChange={(e) => this.handleInputChange(e)} placeholder="Enter email"></input>
            <small id="emailHelp" class="form-text text-muted">Nosotros nunca compartiremos tu emial con alguien mas.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password"  class="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e) => this.handleInputChange(e)}></input>
          </div>
          <button class="btn btn-outline-primary" onClick={(e)=>this.validateForm(e)} type="submit">Entrar</button> 
        </form>
        <div className="divDeAbajo">
          <p>No poseee una cuenta?</p>
          <Link to="/login/newuser">
            <button class="btn btn-outline-secondary">Regístrarse</button>
          </Link>         
        </div>
      </div>
    );
  }
}
