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
      <Link to=`{/products?search=${product}`>
      <input type="submit" value="Buscar" />
      </Link>
    </form>
  );
};
