import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { addUser } from '../../actions/index';
import "./stilo.css"

export  class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:"",
      newPassword:""
    }
  }

  handleInputChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  validateNew(e) {
    if (this.state.password === this.state.newPassword && /\S+@\S+\.\S+/.test(this.state.email)) {
      this.props.addUser(this.state.email,this.state.password);
    } else {
      alert("Debe ingresar un mail valido y una contraseña.")
      e.preventDefault();
      this.setState({
        email:"",
        password:"",
        newPassword:""
      })
      return;
    }
  }

  render(){
    return(
      <div>
        <form className="form2 shadowsIntoLight">
          <div className="form-group">
            <label for="exampleInputEmail1">Correo Electrónico</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
             value={this.state.email} name="email" placeholder="Email registrado" onChange={(e) => this.handleInputChange(e)}></input>
            <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu email con alguien más.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password" class="form-control" id="exampleInputPassword1"
            value={this.state.password} name="password" placeholder="Contraseña" onChange={(e) => this.handleInputChange(e)}></input>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Confirmar contraseña</label>
            <input type="password" class="form-control" id="exampleInputPassword1"
            value={this.state.newPassword}  name="newPassword" placeholder="Confirmar Contraseña" onChange={(e) => this.handleInputChange(e)}></input>
          </div>
          <Link to='/login/userdata'>
            <button className="btn btn-outline-success" onClick={(e) => this.validateNew(e)} type="submit">Continuar</button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.newUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (email,password)=>dispatch(addUser(email,password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
