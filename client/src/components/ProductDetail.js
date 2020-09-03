import React from 'react';
import { connect } from 'react-redux';
import {FaStar} from 'react-icons/fa';
import FiveStars from './FiveStars'
import { getProductDetail, getProductsCategories, addProductToCart,
  setRedirect, setRedirectOff, setRating, getReview } from '../actions/index';
import './ProductDetail.css';
import {Link} from "react-router-dom";
import Axios from 'axios';

//COMPONENTE PARA MOSTRAR EL DETALLE DE UN PRODUCTO
class ProductDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      review:[],
      comentario:"",
      hover:null,
      rating:0
   }
  }

 //BOTON RENDERIZADO SOLO SI EL USER ISADMIN
  botonEditar=()=>{
    if(this.props.user.isAdmin) {
      return(
        <Link to="/form_product">
          <button class="btn btn-outline-success botonDetalle1">Editar</button>
        </Link>
      )
    }
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
    console.log(this.state.comentario)
  }

 //----------------REVIEWS-----------------------------------------------
  nuevoReview(e){
    let status = true;
    this.props.setRedirect(status);
    //e.preventDefault();
  }

  postReview(e){
    //e.preventDefault();
    let data = {
      puntuacion:this.state.rating,
      comentario:this.state.comentario,
      userId:this.props.user.id
    }
    Axios.post('http://localhost:3001/products/'+this.props.productDetail.id+'/review', data)
    .then(res=>{
      alert("Reseña Guardada Correctamente")
    })
    .then(res =>{
      this.props.getReview(this.props.productDetail.id);
    })
    this.props.setRedirectOff();

  }
 //--------------------------------------------------------------------------------------------------------

   //FUNCION PARA TRAER EL DETALLE DEL PRODUCTO Y SI TIENE CATEGORIAS ASOCIADAS
  componentDidMount(){
    const { match: { params: { id }}} = this.props; //ID DEL PRODUCTO A BUSCAR
    this.props.getProductDetail(id); //TRAE EL PRODUCTO
    this.props.getProductsCategories(id); // SI TIENE CATEGORIAS..
    this.props.getReview(id);
    //Axios.get("http://localhost:3001/products/"+id+"/review_5")
    //.then(res =>{
  //    this.setState({review:res.data})
  //  })
  }

    /*Calculo del promedio y su redondeo*/
/*--------------------------------------------------------------------------*/
  calculoPromedio (reviews) {
    let average = 0;
    let num = reviews.length
    reviews.map( e => {
      average += e.puntuacion
    })
    return Number((average/num).toFixed(1));
  }
/*--------------------------------------------------------------------------*/
  render() {
    return (
      <div className="catalog row" style={{display:"flex", flexDirection:"row"}}>
        <div className="card col-4">
          <h2 className = "card-title title texto-tierra"> Detalle del producto </h2>
            <div className="card-body">
               <img className="fotoDetalle" src={"http://localhost:3001/"+this.props.productDetail.image} />
            </div>
            <div className="card-body" >
              <h3 className = "card-title title texto-tierra">{this.props.productDetail && this.props.productDetail.name}</h3>
              <p className = "card-text text texto-tierra">Categoría:</p>

              {/* MAPEA LAS CATEGORIAS */}
              {this.props.productCategories.map(item=>{
                return <p className = "card-text text texto-tierra">{item.name}</p>
              })}
              <p className = "card-text text texto-tierra">Descripción: {this.props.productDetail && this.props.productDetail.description}</p>
              <p className = "card-text title texto-tierra">Precio $: {this.props.productDetail && this.props.productDetail.price}</p>
              <p className = "card-text text texto-tierra">Stock: {this.props.productDetail && this.props.productDetail.stock}</p>

              {/* BOTON PARA EL ADMIN EDITA EL PRODUCTO */}
              <div>
                {this.botonEditar()}
              </div>

              {/* AGREGA EL PRODUCTO AL CARRITO */}
              {this.props.user.id && this.props.user.id?<Link to="/products">  
              <button class="btn btn-outline-success botonDetalle1" onClick={() =>
                this.props.addProductToCart(this.props.user.id, this.props.match.params.id,
                  {price: this.props.productDetail && this.props.productDetail.price,
                   productId: this.props.match.params.id})}> Comprar </button>
              </Link>:null}

              {/* AGREGA EL PRODUCTO AL CARRITO COMO INVITADO*/}
              {!this.props.user.id && <p><button class="btn btn-outline-success botonDetalle1" onClick={() =>
                this.props.addProductToCart(this.props.user.id, this.props.match.params.id,
                  {price: this.props.productDetail && this.props.productDetail.price,
                  productId: this.props.match.params.id,
                  name: this.props.productDetail && this.props.productDetail.name})}>
                  Agregar producto como invitado</button></p>}
              
              {/*PROMEDIO DE LAS REVIEWS */}
    {/*--------------------------------------------------------------------------*/}
              {/* <div>
                <p className = "card-text text texto-tierra">
                  Promedio de {this.props.review.length && this.calculoPromedio(this.props.review)} Estrellas
                </p>
              </div> */}
    {/*--------------------------------------------------------------------------*/}
            </div>
        </div>

        {/* REVIEW DE PRODUCTO */}
        <div className="catalog row" >
          <div className="card col-4">
            {this.props.user.id? <div>
                <button class="btn btn-outline-success botonDetalle1" onClick={(e)=>this.nuevoReview(e)}> Ingresar opinión </button>
          </div>:null}

            {!this.props.redirect ? null:<div>
            {[...Array(5)].map((star, i)=>{
            const ratingValue = i+1
            return (
                  <label>
                   <input type="radio"
                   name="rating"
                   style={{display:"none", width:"30px", height:"30px"}}
                   value={ratingValue}
                   onClick={()=>this.setState({rating:ratingValue})}
                    />

                   <FaStar size= {35}
                    color={ratingValue <=(this.state.hover || this.state.rating) ? "#ffc107":"#e4e5e9" }
                    onMouseEnter={()=>this.setState({hover:ratingValue})}
                    onMouseLeave ={()=> this.setState({hover:null})}
                    style={{cursor:"pointer",
                        transition:"color 200ms"}} />
                   </label>
                    )
                   })}
                 </div>}

                   {!this.props.redirect ? null:  <div className = "divForm" style={{display:"flex", flexDirection:"column", justifyContent:"center",
                    width:"80%" }}>
                  <label> Comentarios: </label>
                  <textarea placeholder={"Escriba su comentario aquí..."}
                  rows="5" colums="40" name="comentario" onChange={(e)=>this.handleChange(e)}> </textarea>
                 <button onClick={(e)=>this.postReview(e)}>Guardar Review</button>
              </div>}
              <div style={{display:"flex",flexDirection:"row", justifyContent:"space-around"}}>
                {this.props.review && this.props.review.length>0 ? <div>
                <label>Cliente</label>
                {this.props.review && this.props.review.map(item =>{
                return( <p>{item.user.nombre + " " + item.user.apellido}</p>)
                })}
              </div>:<p>Aún no hay reseñas para este producto</p>}

                {this.props.review && this.props.review.length>0 ? <div>
                <label>Comentario</label>
                {this.props.review && this.props.review.map(item =>{
                return( <p>{item.comentario}</p>)
                 })}
              </div>
              :null}

                {this.props.review && this.props.review.length>0 ? <div>
                <label>Valoración</label>
                {this.props.review && this.props.review.map(item =>{
                  console.log(item.puntuacion)
                return(<FiveStars rating={item.puntuacion} />)
                })}
               </div>
               :null}
           </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductDetail: (id) => dispatch(getProductDetail(id)),
    getProductsCategories: (id) => dispatch(getProductsCategories(id)),
    addProductToCart: (id, prodId, payload) => dispatch(addProductToCart(id, prodId, payload)),
    setRedirect:(status) => dispatch(setRedirect(status)),
    setRedirectOff:() => dispatch(setRedirectOff()),
    setRating:(rating)=>dispatch(setRating(rating)),
    getReview:(id) => dispatch(getReview(id))
  }
}

const mapStateToProps = state => {
  return {
    productDetail: state.productDetail,
    productCategories: state.productCategories,
    user: state.user,
    redirect:state.redirect,
    rating:state.rating,
    review:state.review
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
