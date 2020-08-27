import React from 'react';
import './product.css';
import {Link} from "react-router-dom";


export default function Product(props){


    return (
            <div class="card">
              <img className= "foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title title">{props.name}</h5>
                  <p class="card-text text">Precio $ {props.price}</p>
                  <Link to={`/products/${props.id}`}>
                  <span class="btn btn-outline-success botonDetalle">Detalle</span>
                  </Link>
                </div>
            </div>
    )
}
