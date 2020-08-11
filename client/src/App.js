import React from 'react';
import './App.css';
import styles from './searchbar.css';

//Definicion de props

function App(props) {
  return (
    <div className="App">
      <input className={styles.input} type="text" placeholder="Productos..." />
      <button className = {styles.btnSearch} onClick={() => props.onSearch("Search...")}>Search...</button>
    </div>
  );
}

export default App;
