import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getCategories} from '../actions/index';
import CategoryCard from './CategoryCard.js';

export class Categories extends Component {

  componentDidMount(){
    this.props.getCategories();
  }

/*
  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }
*/

  render() {
    return (
      <div class="catalog">
          {this.props.categories && this.props.categories.map(item => <CategoryCard
            id ={item.id}
           name={item.name}
           />)}
      </div>
    );
  }
}

//Funciones que mapean al store
function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: categories => dispatch(getCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);