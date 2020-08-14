import React from 'react';
import SearchBar from './SearchBar.js';
import { Link } from 'react-router-dom';


function Nav({onSearch}) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to='/'>
        <span className="navbar-brand">
          Inicio
        </span>
      </Link>
      <Link to='/products' onClick={()=>onSearch("") } >
        <span> Tienda </span>
      </Link>
        <SearchBar
          onSearch={onSearch}
      />
    </nav>
  );
};

export default Nav;
