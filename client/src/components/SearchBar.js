import React from 'react';
import './searchbar.css';


export default function SearchBar(props) {

  return (
    <div className={container}>
      <input className={input} type="text" placeholder="Productos..." />
      <button className = {btnSearch} onClick={() => props.onSearch("Buscando...")}>Buscar</button>
    </div>
  )
};