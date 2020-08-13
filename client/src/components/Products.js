import React from 'react';
import Product from './Product';
import './products.css';
import axios from 'axios';

export default class Products extends React.Component{
    constructor(){
        super();
        this.state = { productos:[] }
    }
    //Trae los productos desde la base de datos
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
                {this.state.productos.map(item => <Product
                 id={item.id}
                 name={item.name}
                 description={item.description}
                 price={item.price}
                 stock={item.stock}
                 />)}
            </div>
        )
    }

}
