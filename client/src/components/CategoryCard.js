import React from 'react';
import {Link} from "react-router-dom";


//se importo Link de react-router-dom
export default function CategoryCard (props) {

// se agrego el link to correctament, mirar app para la ruta
    return (
            <Link to={`/category/${props.id}`}>
            <div class="card">
                <div>
                    <img class="foto" src="https://previews.123rf.com/images/belchonock/belchonock1408/belchonock140804594/30944445-colecci%C3%B3n-de-fondos-saludables-de-alimentos-frescos.jpg" />
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <h3>{props.description}</h3>
                </div>
            </div>
            </Link>
    )
}
