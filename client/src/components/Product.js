import React from 'react';
import './product.css';
import {Link} from "react-router-dom";


//se importo Link de react-router-dom
export default function Product(props){

// se agrego el link to correctament, mirar app para la ruta
    return (
            <Link to={`/products/${props.id}`}>
            <div className="divroot">
              <div className = "container">
                <h5 className = "texto">{props.name}</h5>
                <img className="foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                <p className = "p"> Precio $ {props.price}</p>
              </div>
            </div>
            </Link>
    )
}
