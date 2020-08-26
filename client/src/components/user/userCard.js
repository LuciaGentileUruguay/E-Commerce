import React from 'react';
import {Link} from "react-router-dom";


//se importo Link de react-router-dom
export default function User(props){

// se agrego el link to correctament, mirar app para la ruta
    return (
      <Link to={`/users/${props.id}`}>
            <div className="divroot">
              <div className = "container">
                <h5 className = "texto">User Id:{props.id}</h5>
                <p className = "p"> Usuario:{props.nombre+" "+props.apellido}</p>
                <p className = "p"> Email:{props.email}</p>
              </div>
            </div>
            </Link>  
       
    )
}
