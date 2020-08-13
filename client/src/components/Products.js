import React from 'react';
import Product from './Product';
import './products.css';
import axios from 'axios';

export default class Products extends React.Component{
    constructor(){
        super();
        this.state = { productos:[] }
    }

    componentDidMount (){
      axios.get('http://localhost:3001/products')
        .then(res => {
          console.log(res.data);
          this.setState({
            productos: res.data
          })
        })
    }

    render () {
        return(
            <div class="catalog">
                {this.state.productos.map(item => <Product />)}
            </div>
        )
    }

}
