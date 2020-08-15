import React,{useState,useEffect} from 'react';
import './product.css';
import axios from 'axios';

export default function ProductDetail(props){
    const[detail,setDetail] = useState([]);
    useEffect(()=>{
             axios.get(`http://localhost:3001/products/${props.id}`)
             .then((res)=>{
                setDetail(() => res.data)
             })
    },[])

    return (
        <div class="card">
            <div>
                <img class="foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            </div>
            <div>
                <h3>{detail.name}</h3>
              <p>{detail.description}</p>
                <p>{detail.price}</p>
                <p>{detail.stock}</p>
            </div>
        </div>
    )
}
