import React from 'react';
import axios from 'axios';
import {getCategories,cleanProductDetail } from '../actions/index';		
import { connect } from 'react-redux';		
import {Link} from "react-router-dom";

class FormProduct extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        categoryId:[]
      }
  }

  componentDidMount () {
    this.props.getCategories()
    if(this.props.productCategories){		
      	      // console.log(this.props.productCategories)		
      	      // this.props.productDetail["categoryId"]=[]		
      	      // this.props.productCategories.map(item=>{		
      	      //   this.props.productDetail.categoryId.push(item.id.toString())		
      	      // })		
      	      // console.log(this.props.productDetail.categoryId)		
      	    }
  }

  cleanStore(){
    this.props.cleanProductDetail()
  }

  handleInputChange (e) {

    this.props.productDetail[e.target.name] = e.target.value;
  }

  handleInputChangeCategory(e){		
    	    let array = this.props.productDetail.categoryId		
    	    let flag = true		
    	    array.forEach((id,i) => {		
    	      if (id == e.target.value){		
    	        array.splice(i,1)		
    	        flag = false		
    	        return		
    	      }		
    	    })		
    	    if(flag){		
    	      this.props.productDetail.categoryId.push(e.target.value)		
          }			
          console.log(this.props.productDetail.categoryId)		
    	   }

  save(){
    axios.post(`http://localhost:3001/products`, this.props.productDetail)
      .then(res => {
        if(res.status === 201){
          alert("PRODUCTO GUARDADO CORRECTAMENTE");
        }else {alert("hubo un error!!!")
        }
      })
    }
    modify(){
      console.log(this.props.productDetail)
      axios.put(`http://localhost:3001/products/${this.props.productDetail.id}`,
       this.props.productDetail)
        .then(res => {
          if(res.status === 201){
            alert("PRODUCTO GUARDADO CORRECTAMENTE");
          } else {alert("hubo un error!!!")
          console.log(res);}
        })
    }
    delete(){
      console.log(this.props.productDetail)
      axios.delete(`http://localhost:3001/products/${this.props.productDetail.id}`,
       this.props.productDetail)
        .then(res => {
          if(res.status === 200){
            alert("PRODUCTO BORRADO CORRECTAMENTE");
          } else {alert("hubo un error!!!")
          console.log(res);}
        })
    } 

    render () {

      return (
          
        <form >
          <div className = "divForm">
            <label> Nombre: </label>
            <input type="text" name="name" 
            placeholder={this.props.productDetail && this.props.productDetail.name} 
            
            onChange={(e) => this.handleInputChange(e)} />
          </div>
           <div className = "divForm">
            <label>Categoría:</label>
             
                {this.props.categories && this.props.categories.map(item => {
                  return (<div>
                    <input type="checkbox" 
                    value = {item.id}		
	                onChange={(e) => this.handleInputChangeCategory(e)}/>
                    <label> {item.name} </label>
                    </div>)})}
             
          </div>
          <Link to="/form_categories">
          <button>Editar Categorias</button>
          </Link>
          <div className = "divForm">
            <label>Descripción:</label>
            <input type="text" name="description" placeholder={ this.props.productDetail.description} onChange={(e) => this.handleInputChange(e)}  />
          </div>
          <div className = "divForm">
            <label>Precio:</label>
            <input type="text" name="price" placeholder={this.props.productDetail && this.props.productDetail.price} onChange={(e) => this.handleInputChange(e)}  />
          </div>
          <div className = "divForm">
            <label>Stock:</label>
            <input type="text" name="stock" placeholder={this.props.productDetail && this.props.productDetail.stock} onChange={(e) => this.handleInputChange(e)}  />
          </div>
          <input id= "botonBorrar" type='submit' value="Borrar" onClick={(e) => {
          e.preventDefault();
          this.cleanStore()
          this.delete() }}/>
          <input id= "botonGuardar" type='submit' value="Guardar" onClick={(e) => {
          e.preventDefault();
          if (this.props.productDetail){
            this.modify()
            return;
          }
          this.save() }}/>
          <Link to={"/products/"+this.props.productDetail.id}>		
          <button>Volver a Producto</button>		
	        </Link>		
          <Link to="/products/">		
          <button>Volver a Tienda</button>		
	         </Link>
        </form>
      )
  
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getCategories: () => dispatch(getCategories()),
      cleanProductDetail: () => dispatch(cleanProductDetail())
    }
  }
  
  const mapStateToProps = state => {
    return {
      productDetail: state.productDetail,
      categories:state.categories,
      productCategories:state.productCategories
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormProduct);
  