import React from 'react';
import SearchBar from './SearchBar.js';
import { Link, Route} from 'react-router-dom';
import './nav.css';


function Nav({onSearch}) {
  return (
    <nav id="navigation">
      <Link to='/'>
        <span id="navigation">
          Inicio
        </span>
      </Link>
      <Link to='/products' onClick={()=>onSearch("") } >
        <span id="navigation"> Tienda </span>
      </Link>
      <Route path='/products' render={() => <SearchBar onSearch={onSearch}/>}/>
    </nav>
  );
};

export default Nav;
