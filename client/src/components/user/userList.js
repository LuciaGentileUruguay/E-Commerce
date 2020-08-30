import React, { Component } from 'react';
import UserCard from './userCard.js';
import axios from 'axios';

export default class Userlist extends Component {
    constructor(){
        super();
        this.state = { userlist:[]
        }
    }

componentDidMount(){
  axios.get("http://localhost:3001/admin",{withCredentials:true})
    .then(user =>{
      let array=[];
        user.data.map(item =>{
      //this.state.userlist.push(item)})})
          array.push(item)
        })
        this.setState({userlist:array})
    })
      return;
      //console.log(this.state.userlist)
}


  render() {
    return (
      <div class="catalog">
        {this.state.userlist && this.state.userlist.map(item =>
          { console.log(item)
              return < UserCard
                id={item.id}
                email= {item.email}
                nombre={item.nombre}
                apellido={item.apellido}
                calle={item.calle}
                numero={item.numero}
                departamento={item.departamento}
                localidad={item.localidad}
                provincia={item.provincia}
                telefono1={item.telefono1}
                telefono2={item.telefono2}
              />})
          }
      </div>
    );
  }
}