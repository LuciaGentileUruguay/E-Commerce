import React from 'react';
import { connect } from 'react-redux';
import {getUserDetail} from '../../actions/index'
import axios from 'axios';
import {Link,Route} from "react-router-dom";


export default class UserDetail extends React.Component {
  constructor(props){
            super(props);
            this.state={}
    	  }

 
        componentDidMount(){
          const { match: { params: { id }}} = this.props; //id de producto
          console.log(id)
          axios.get("http://localhost:3001/users/id/"+id)
          .then(res =>{
              console.log(res.data)
              this.setState({
                id:res.data.id,  
                nombre:res.data.nombre,
                apellido:res.data.apellido,
                calle:res.data.calle,
                numero:res.data.numero,
                departamento:res.data.departamento,
                localidad:res.data.localidad,
                provincia:res.data.provincia,
                email:res.data.email,
                telefono1:res.data.telefono1,
                telefono2:res.data.telefono
              })
          })

          }

          render() {
            return (
              <div>
                <div className="divroot">
                  <h2 className = "text"> Detalle del Usuario </h2>
                  <h5 className = "texto">User Id:{this.state.id}</h5>
                    <p className = "p"> Nombre:{this.state.nombre}</p>
                    <p className = "p"> Apellido:{this.state.apellido}</p> 
                    <p className = "p"> Calle:{this.state.calle}</p>
                    <p className = "p"> Numero:{this.state.numero}</p>
                    <p className = "p"> Departamento:{this.state.departament}</p>
                    <p className = "p"> Localidad:{this.state.localidad}</p>
                    <p className = "p"> Provincia:{this.state.provincia}</p> 
                    <p className = "p"> Email:{this.state.email}</p>
                    <p className = "p"> Telefono Celular:{this.state.telefono1}</p>
                    <p className = "p"> Telefono Hogar/Trabajo:{this.state.telefono2}</p>
                </div>
            </div>
            )
          }
}
