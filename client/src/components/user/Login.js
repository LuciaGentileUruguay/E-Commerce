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
          <div className= "form-group shadowsIntoLight">
            <label for="exampleInputEmail1" >Correo electrónico</label>
            <input type="email"   class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name ="email" onChange={(e) => this.handleInputChange(e)} placeholder="Enter email"></input>
            <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu email con alguien más.</small>
          </div>
          <div className="form-group shadowsIntoLight">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password"  class="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e) => this.handleInputChange(e)}></input>
          </div>
          <button className="btn btn-outline-secondary shadowsIntoLight" onClick={(e)=>this.validateForm(e)} type="submit">Entrar</button>
        </form>
        <div className="divDeAbajo shadowsIntoLight">
          <p>¿Usuario nuevo?</p>
          <Link to="/login/newuser">
            <button className="btn btn-outline-secondary">Regístrese</button>
          </Link>
        </div>
      </div>
    );
  }
}
