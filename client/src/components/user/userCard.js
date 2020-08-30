import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import {setPasswordReset} from "../../actions/index"
import { connect } from "react-redux";

//se importo Link de react-router-dom
//Se paso el componente user a clase
export  class User extends React.Component {
  constructor(props){
    super(props)
  }

  borrar (e){
    Axios.delete("http://localhost:3001/admin/"+this.props.id,{withCredentials:true})
    .then(res=>{
      alert(res);
    })
  }

  administrador(){
    Axios.put("http://localhost:3001/admin/isAdmin/"+this.props.id,{withCredentials:true})
    .then(res=>{
      alert(res);
    })
  }
//se traen las nuevas actions y se utilizan dentro del boton "Resetear Password"
  reseteaLaPassword(){
    this.props.setPasswordReset(this.props.id)
  }

// se agrego el link to correctament, mirar app para la ruta
render(){
    return (
      
            <div className="divroot">
              <div className = "container">
                <h5 className = "texto">User Id:{this.props.id}</h5>
                <Link to={`/users/${this.props.id}`}>
                <p className = "p"> Usuario:{this.props.nombre+" "+this.props.apellido}</p>
                </Link>
                <p className = "p"> Email:{this.props.email}</p>
                <button onClick={(e)=>this.borrar(e)}>X</button>
                <button onClick={()=>this.reseteaLaPassword()}>Reset Password</button>
                <button onClick={()=>this.administrador()}>Administrador</button>
              </div>
            </div>
              
       
    )
}
}

const mapDispatchToProps = dispatch => {
  return {
    setPasswordReset: id => dispatch(setPasswordReset(id))
  };
}

export default connect(null,mapDispatchToProps)(User);