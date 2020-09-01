import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default class Me extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    const instance = axios.create({
      withCredentials: true
    })
    instance.get("http://localhost:3001/users/me")
      .then(res => {
        this.setState({
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
