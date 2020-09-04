import React, { useState } from "react";
import s from './searchbar.module.css';

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
        <div className="input-group-append mb-3 buttonsearch">
          <input type="text" className={"form-control texto "+ s.shadows} placeholder="Productos..."
          value={products} onChange={e => setProducts(e.target.value)}
          />
          {/* NO SACAR EL SUBMIT DE ABAJO!! */}
          <button className={"btn texto "+ s.shadows} type="submit" id="button-addon2">Buscar</button>
        </div>
      </form>
    </div>
  )
};
