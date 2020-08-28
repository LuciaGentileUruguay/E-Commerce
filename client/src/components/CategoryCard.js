import React from 'react';
import {Link} from "react-router-dom";
//import './categoryCard.css;'

//se importo Link de react-router-dom
export default function CategoryCard (props) {

// se agrego el link to correctament, mirar app para la ruta
    return (
      <div className="card col-3">
        <img className="foto" src="https://previews.123rf.com/images/belchonock/belchonock1408/belchonock140804594/30944445-colecci%C3%B3n-de-fondos-saludables-de-alimentos-frescos.jpg" />
          <div className="card-body">
            <Link to={`/category/${props.id}`}>
              <h3 class="card-title titleCategory shadowsIntoLight texto-tierra">{props.name}</h3>
            </Link>
              <p class="card-text text">{props.description}</p>
          </div>
      </div>
    )
}
