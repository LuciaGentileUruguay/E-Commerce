import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function SearchBar({onSearch, product}) {

  const [products, setProducts] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(products);
      setProducts('');
    }}>
      <input
        type="text"
        placeholder="Productos..."
        value={products}
        onChange={e => setProducts(e.target.value)}
      />
      <input type="submit" value="Buscar" />

    </form>
  );
};
