import React, { useState } from "react";

export default function SearchBar({onSearch}) {
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


/*
  return (
    <div>
      <input type="text" placeholder="Productos..." />
      <button onClick={() => onSearch(e.target.value)}>Buscar</button>
    </div>
  )
);*/
