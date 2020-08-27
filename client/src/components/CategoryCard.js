import React from 'react';
import {Link} from "react-router-dom";


//se importo Link de react-router-dom
export default function CategoryCard (props) {

// se agrego el link to correctament, mirar app para la ruta
    return (
      <div class="card">
        <img class="foto" src="https://previews.123rf.com/images/belchonock/belchonock1408/belchonock140804594/30944445-colecci%C3%B3n-de-fondos-saludables-de-alimentos-frescos.jpg" />
          <div class="card-body">
            <Link to={`/category/${props.id}`}>
              <h3 class="card-title title">{props.name}</h3>
            </Link>
              <p class="card-text text">{props.description}</p>
          </div>
      </div>
    )
}
