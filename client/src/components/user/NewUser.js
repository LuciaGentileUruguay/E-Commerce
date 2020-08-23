import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { addUser } from '../../actions/index';


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
        <form>
          <label>Usuario:</label>
          <input type="text" value={this.state.email} name="email" placeholder="Email registrado" onChange={(e) => this.handleInputChange(e)}>
          </input>
          <label>Contraseña:</label>
          <input type="password" value={this.state.password} name="password" placeholder="Contraseña" onChange={(e) => this.handleInputChange(e)}>
          </input>
          <label>Nueva Contraseña:</label>
          <input type="password"  value={this.state.newPassword}  name="newPassword" placeholder="Contraseña" onChange={(e) => this.handleInputChange(e)}>
          </input>  
          <Link to='/login/userdata'>
            <button onClick={(e) => this.validateNew(e)} type="submit">Continuar</button>   
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