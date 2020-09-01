import React from 'react';
import './product.css';
import {Link} from "react-router-dom";


export default function Product(props){


    return (
            <div class="card col-3">
              <img className= "card-img-top foto" src={"http://localhost:3001/"+props.image} />
                <div class="card-body">
                  <h5 class="card-title title texto-tierra">{props.name}</h5>
                  <p class="card-text text texto-tierra">Precio $ {props.price}</p>
                  <Link to={`/products/${props.id}`}>
                  <span class="btn btn-outline-success botonDetalle ">Detalle</span>
                  </Link>
                </div>
            </div>
    )
}
