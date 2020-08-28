import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './searchbar.css';

export default function SearchBar({onSearch, product}) {

  const [products, setProducts] = useState("");


  return (
    <div className = "search">
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(products);
      setProducts('');
    }}>
      <div class="input-group-append mb-3 buttonsearch">
      <input 
        type="text"
        class="form-control"
        placeholder="Productos..."
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        value={products}
        onChange={e => setProducts(e.target.value)}
      />
     
         <button class="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
      
      {/*<input type="button" class="btn btn-light"/>*/}
      </div>
    </form>
  </div>
  )};
