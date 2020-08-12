import React from 'react';

// import logo from './logo.svg';
import './App.css';
import Products from './components/Products'
import Landing from './components/Landing'
import {Route} from 'react-router-dom'


//Definicion de props

function App(props) {
  return (

    <div>
      <Route 
      exact path='/'
      component={Landing} />
            <Route 
      exact path='/products'
      component={Products} />
    </div>
    
  );
}

export default App;
