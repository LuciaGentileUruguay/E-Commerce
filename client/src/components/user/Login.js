import React from 'react';
import {Link} from "react-router-dom";
import "./stilo.css"
import axios from 'axios'
import { connect } from 'react-redux';
import {setUserState} from "../../actions/index"
import swal from 'sweetalert';


//COMPONENTE PARA INICIAR SESION
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      password:"",
    }
  }

  //HANDLER PARA SETEAR EL STATE
  handleInputChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  //VALIDACION PARA INICIAR SESION--> PASSPORT USA LA COOKIE TODAVIA NO SE SABE QUE HACER CON ESO
  validateForm(e){
    e.preventDefault();
    //CONDICION DEL LOGIN!
    if (this.state.password.length>0 && /\S+@\S+\.\S+/.test(this.state.username)){
      //LE PEGA AL BACK TRAE EL USER QUE INICIO SESION Y LA COOKIEE
      axios.post('http://localhost:3001/login',this.state,{withCredentials:true})
      .then(res => {  swal("Bienvenido/a " + res.data.user.nombre + "!");

        //EN RES ESTA TODA LA INFO DEL USER LOGUEADO Y LA COOKIEE!!
        //Se agrego el pwdResete(passwordReset) a los datos guardados de un usuario
        let UserData={
          id:res.data.user.id,
          nombre:res.data.user.nombre,
          apellido:res.data.user.apellido,
          email:res.data.user.email,
          isAdmin:res.data.user.isAdmin,
          pwdReset:res.data.user.pwdReset
        }

      //CON ESTA FUNCION GUARDAMOS EL ESTADO DE REDUX LOS DATOS DEL USARIO PARA SABER SI ES ADMIN Y MANTTENER EL CARRITO
      //LA SESION QUEDA INICIADA HASTA QUE SE REFRESQUE LA PAGINA--->LA COOKIEE PERSISTE EN EL BROWSER!!  
      this.props.setUserState(UserData)

      })
      return;
      //EN CASO DE ERRAR AL PASSWORD O UN USARIO INVALIDO VALIDA EN FRONT PERO SOLO QUE LOS CAMPOS SEAN CORRECTOS
    } else {
      alert("ENTRE AL false")
      return false;
    }
  }

  render () {
    return (
      <div>
        <form className="form">
          <div className= "form-group">
            <label for="exampleInputEmail1" >Correo electrónico</label>
            <input type="email"   class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name ="username" onChange={(e) => this.handleInputChange(e)} placeholder="Enter email"></input>
            <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu email con alguien más.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password"  class="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e) => this.handleInputChange(e)}></input>
          </div>
          <button className="btn btn-outline-secondary" onClick={(e)=>this.validateForm(e)} type="submit">Entrar</button>
        </form>
        <div className="divDeAbajo">
          {/* RUTA PARA CREAR USUARIO!! */}
          <p>¿Usuario nuevo?</p>
          <Link to="/login/newuser">
            <button className="btn btn-outline-secondary">Regístrese</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserState: (UserData) => dispatch(setUserState(UserData)),
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);