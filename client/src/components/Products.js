import React from 'react';
import Product from './Product';
import './products.css';


export default class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = { products:[] }
    }

    render () {
        return(
            <div class="catalog">
                {this.props.products && this.props.products.map(item => <Product
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
