import React from 'react';
import './product.css';
import {Link} from "react-router-dom";


//se importo Link de react-router-dom
export default function Product(props){

// se agrego el link to correctament, mirar app para la ruta
    return (
            <Link to={`/products/${props.id}`}>
            <div class="card">
                <div>
                    <img class="foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <p>${props.price}</p>
                </div>
            </div>
            </Link>
    )
}
