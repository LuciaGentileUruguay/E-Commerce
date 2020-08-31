import React from 'react';
import {Link} from "react-router-dom";
import './categorycard.css';

//se importo Link de react-router-dom
export default function CategoryCard (props) {

// se agrego el link to correctament, mirar app para la ruta
    return (
      <div className="card col-4 category">
        <img className="fotoDetalle2" src="https://fruittoday.com/wp-content/uploads/2015/07/Noticia-1.jpg" />
          <div className="card-body">
            <Link to={`/category/${props.id}`}>
              <h3 class="card-title titleCategory shadowsIntoLight texto-tierra">{props.name}</h3>
            </Link>
              <p class="card-text text">{props.description}</p>
          </div>
      </div>
    )
}
