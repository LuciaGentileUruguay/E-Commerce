import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';



//se importo Link de react-router-dom
export default function User(props){

  function borrar (e){
    Axios.delete("http://localhost:3001/admin/"+props.id,{withCredentials:true})
    .then(res=>{
      alert(res);
    })
  }

  function administrador(){
    Axios.put("http://localhost:3001/admin/isAdmin/"+props.id,{withCredentials:true})
    .then(res=>{
      alert(res);
    })
  }

// se agrego el link to correctament, mirar app para la ruta
    return (
      
            <div className="divroot">
              <div className = "container">
                <h5 className = "texto">User Id:{props.id}</h5>
                <Link to={`/users/${props.id}`}>
                <p className = "p"> Usuario:{props.nombre+" "+props.apellido}</p>
                </Link>
                <p className = "p"> Email:{props.email}</p>
                <button onClick={(e)=>borrar(e)}>X</button>
                <button>Reset Password</button>
                <button onClick={()=>administrador()}>Administrador</button>
              </div>
            </div>
              
       
    )
}