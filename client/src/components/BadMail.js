import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { addUser } from '../actions/index';


export  class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:""          
    }
  }
 
//    setEmail(e){
//       this.setState({email:e.target.value})
//   }
//   setPassword(e){
//     this.setState({password:e.target.value})
// }
  handleInputChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

    validateNew(e) {
     // e.preventDefault()
      
      console.log(this.state)
      this.props.addUser(this.state.email,this.state.password);
    }

    render(){
      return(
      <div>
      <form>
        <label>Usuario:</label>
        <input type="text" name="email" 
          placeholder="Email registrado"
          onChange={(e) => this.handleInputChange(e)} 
        >
        </input>
        <label>Contraseña:</label>
        <input type="password" name="password" 
                placeholder="Contraseña"
               ></input>
        <label>Nueva Contraseña:</label>
        <input type="password" name="nuevoPassword" 
                placeholder="Contraseña"
                onChange={(e) => this.handleInputChange(e)} 
                ></input>  
        <Link to='/login/userdata'>
        <button 
        onClick={(e) => this.validateNew(e)} 
        type="submit">
                Continuar
                </button>   
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
    
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);