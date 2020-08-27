const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');

//rutas para ver todos los usuarios, modificar un usuario, borrar un usuario

//se trae todos los usuarios
server.get('/',(req,res,next)=>{
    User.findAll()
    .then(user=>{
        res.status(200).send(user);
    })
})


//Bucar usuario por ID
server.get('/:id',(req,res,next)=>{
  User.findByPk(req.params.id)
  .then(user=>{
    if (!user){
      res.status(404).send("No se encuentra el usuario");
    }
    else {
     res.status(200).json(user);
    }

  })
})


//modificar un usuario para que sea Admin
server.put('/isAdmin/:id',(req,res,next)=>{
  return User.findByPk(req.params.id)
  .then (function(user){
    user.isAdmin = true;
    user.save();
    res.status(201).send("El usuario es administrador")
  })
})

//modificar un usuario para que sea Admin
server.put('/:id',(req,res,next)=>{
  return User.findByPk(req.params.id)
  .then (function(user){
    user.pwdReset = true;
    user.save();
    res.status(201).send("El usuario debe actualizar la password")
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

server.get('/:id/cart',(req,res,next) =>{ //devuelve todas las órdenes de un usuario
  Order.findOne({
    where:{
      userId: req.params.id,
      estado: "carrito"
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
