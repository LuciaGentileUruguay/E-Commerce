import React, { useState } from "react";
import './searchbar.css';

//BUSCAR PRODUCTO DESDE EL SEARCH BAR
export default function SearchBar({onSearch}) {

  //BUSCA PRODUCTOS Y LOS GUARDA EN UN ARREGLO DE PRODUCTOS, SINO ENCUENTRA RENDERIZA TODOS LOS OBJETOS
  const [products, setProducts] = useState("");
  return (
    <div className = "search">
      <form onSubmit={(e) => 
        {
          //NO REFRESCA LA PAGINA
          e.preventDefault();
          onSearch(products);
          setProducts('');
        }
      }>
        <div class="input-group-append mb-3 buttonsearch">
          <input type="text" class="form-control" placeholder="Productos..." aria-label="Recipient's username" aria-describedby="button-addon2"
          value={products} onChange={e => setProducts(e.target.value)}
          />
          {/* NO SACAR EL SUBMIT DE ABAJO!! */}
          <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
        </div>
      </form>
    </div>
  )
};