const server = require('express').Router();
const { User, Order_line, Product, Order } = require('../db.js');
const { Sequelize } = require('sequelize');

//crear un usuario
server.post('/',(req,res,next)=>{
  //en caso de que falte algun campo devolver un error
  const {nombre, 
    apellido,
    calle,
    numero,
    departamento,
    telefono1,
    telefono2,
     email, 
     password} = req.body;
  // if (!email || !password){
  //     return res.status(404).send("Falta algun campo");
  // } else {
      //se crea el usuario
      User.create({
        nombre,
        apellido,
        calle,
        numero,
        departamento,
        telefono1,
        telefono2,
         email, 
         password
      })
      .then(user=>{
          return res.status(201).send(user);
      })
  // }
});

//se trae todos los usuarios
server.get('/',(req,res,next)=>{
    User.findAll()
    .then(user=>{
        res.status(200).send(user);
    })
})

//modificar un usuario
server.put('/:id',(req,res,next)=>{
  return User.findByPk(req.params.id)
  .then (function(user){
    const {nombre, 
      apellido,
      calle,
      numero,
      departamento,
      localidad,
      provincia,
      telefono1,
      telefono2,
       email, 
       password} = req.body;
       console.log(req.body)
       user.nombre = nombre;
      user.apellido = apellido;
      user.calle = calle;
      user.numero = numero;
      user.departamento = departamento;
      user.localidad=localidad;
      user.provincia=provincia;
      user.telefono1 = telefono1;
      user.telefono2 = telefono2
      user.email = email;
      user.password= password;
      user.save();
      res.status(201).send("Usuario modificado")

    })
  })


//borra un usuario
server.delete('/:id',(req,res,next)=>{
    User.findByPk(req.params.id)
    .then(user=>{
        if (!user){
            //sino lo encuentra devuelve un error
            return res.status(400).send("Usuario inexistente");
        } else {
            //borra usuario
            user.destroy();
            return res.status(200).send("Usuario eliminado")
        }
    })
})


server.post('/:id/cart',(req,res,next) =>{
  var orderID;
  const productId = req.body.productId;
  const price = req.body.price;
  const userId = req.params.id;
  Order.findOrCreate({
    where:{
      userId: userId,
      estado: 'pending'
    }
  }) //findOrCreate devuelve un array
   .then(order => {
     orderID = order[0].id;
     Order_line.findOne({
       where: {
         orderId: orderID,
         productId: productId
       }
     })
     .then(resp => {
       if(resp !== null){ //si existe el producto entonces aumento en uno la cantidad
         resp.update({
           cantidad: resp.cantidad + 1
         })
       }
       else { //si no existe, creo una nueva fila en la tabla
         Order_line.create({
         cantidad: 1,
         productId: productId,
         orderId: orderID,
         price: price
       })
      }
     })
   })
   res.send();
})

server.get('/:id/cart',(req,res,next) =>{ //devuelve todas las órdenes de un usuario
  Order.findOne({
    where:{
      userId: req.params.id,
      estado: "pending"
    },include:{
      model: Product
    }
  })
  .then(respuesta => {
    if (!respuesta){
        res.status(404).send("Error. No hay carrito o no existe usuario")
    } else {
        res.status(200).send(respuesta);
    }
  })
})

server.delete('/:id/cart',(req,res,next) =>{ //vaciamos carrito
  Order.findOne({
    where:{
      userId: req.params.id,
      estado: "pending"
    }
  })
  .then(idOrder => {
    Order_line.findAll({
      where: {
        orderId: idOrder.id
      }
    })
    .then(filas => {
      filas.map(e => e.destroy());
      res.send();
    })
  })
})

server.delete('/:id/cart/:prodId',(req,res,next) =>{ //quitamos un producto del carrito
  Order.findOne({
    where:{
      userId: req.params.id,
      estado: "pending"
    }
  })
  .then(idOrder => {
    Order_line.findOne({
      where: {
        orderId: idOrder.id,
        productId: req.params.prodId
      }
    })
    .then(fila => {
      fila.destroy();
      res.send();
    })
  })
})

server.put('/:id/cart/:prodId',(req,res,next) =>{ //quitamos un producto del carrito
  Order.findOne({
    where:{
      userId: req.params.id,
      estado: "pending"
    }
  })
  .then(idOrder => {
    Order_line.findOne({
      where: {
        orderId: idOrder.id,
        productId: req.params.prodId
      }
    })
    .then(fila => {
      if (req.body.accion === "INC"){
        fila.cantidad += 1;
        fila.save()
      }else if(req.body.accion === "DEC"){
        fila.cantidad -= 1;
        fila.save()
      } else if(req.body.accion === "DEL"){
        fila.cantidad = 0;
        fila.save()
      } else {
        res.status(400).send("No se Reconoce el Comando: "+req.body.accion)
      }
      res.status(201).send("Se modifico la cantidad del producte: "+req.body.accion)
    })
  })
})


module.exports = server;
