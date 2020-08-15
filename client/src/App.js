import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './components/Products.js';
import FormProduct from './components/FormProduct.js';
import FormCategories from './components/FormCategories.js'
import ProductDetail from "./components/ProductDetail.js";
import Nav from './components/Nav.js';
import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';
import axios from 'axios';


class App extends React.Component{
  constructor(props){
      super(props);
      this.state = { products:[] }
      this.onSearch = (product) => {
      axios.get(`http://localhost:3001/products?search=${product}`)
      .then(res => {
        this.setState({products: res.data})
        })
      }
      //this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount () {
    axios.get('http://localhost:3001/products')
    .then(res => {
        this.setState({products: res.data})
      })
  }

/*
function App(props) {

  const [products, setProducts] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:3001/products')
    .then(res => {
      console.log(res.data);
      setProducts({
        products: res.data
      })
      return;
    })
  },[products]);

/*  componentDidMount () {
      axios.get('http://localhost:3001/products')
      .then(res => {
        console.log(res.data);
        this.setState({
          products: res.data
        })
      })

  }*/


  render(){
  return (
    <div>
      <Route path='/' render={() => <Nav onSearch={this.onSearch}/>}/>
      <Route exact path='/'component={Landing} />
      <Route exact path='/products' render={() => <Products products={this.state.products}/>} />
      <Route exact path='/FormProduct'component={FormProduct} />
      <Route exact path='/FormCategories'component={FormCategories} />
    </div>
  )
}
}

export default App;
