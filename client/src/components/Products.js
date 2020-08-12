import React from 'react';
import Product from './Product'
import './products.css'

export default class Products extends React.Component{
    constructor(){
        super();
        this.state={productos:[0,1,2,3,4,5,,6,7,8,9]}
    }

    render(){
        return(
            <div class="catalog">
                {this.state.productos.map(item =><Product />)}
            </div>
        )
    }
            
}