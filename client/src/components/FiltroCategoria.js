import React from "react";
import {Link, Route} from 'react-router-dom';
import Product from "./Product.js";
import Category from "./Category.js";


export default class FiltroCategoria extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          products:[],
          categories : []
        }
        this.setState = this.setState.bind(this);
    }

    componentDidMount () {
        axios.get('http://localhost:3001/categories')
        .then(res => {
            this.setState({categories: res.data})
          })
    }

    handleInputChange (e) {
        this.state.products[0][e.target.name]= e.target.value;
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


return (
    <div className="container row">
        <div>
        <h1 className={title}>Categorias</h1>
        <ul>
            {categories.map((e) => (
                <Link>
                <li>
                name={e.name}
                onClick={(e) =>
                filter(e.target.getAttribute("name"))
                }>
                {e.name}
                </li>
                </Link>
            ))}
        </ul>
    </div>
    <div className="row">
       {array.map((e) => (
           <ProductDetail
           key={e}
           name={e.name}
           price={e.price}
           />
       ))}
    </div>
    </div>
);
       };
