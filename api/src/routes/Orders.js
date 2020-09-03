const server = require('express').Router();
const { Product, Order, Order_line, User } = require('../db.js');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const {isAuthenticated, isAdmin} =require('./helpers')

//Devuelve todas las órdenes para todos los usuarios, sin incluir los carritos
server.get('/:condition',(req,res,next)=>{
    //console.log(req.params.condition)
    let estado = []
    if (req.params.condition == "todas"){
        estado = ['procesando', 'cancelada', 'completada']
    }else{estado=[req.params.condition]}
    //console.log(estado)
    Order.findAll({
      where: {
        estado: estado
      },
      include:[{model: Product}, {model: User}]
    })
    .then(orders=>{
        res.status(200).send(orders);
        return;
    })
});

//Devuelve todos las órdenes para un determinado usuario, sin incluir el carrito
server.get('/:id/products',(req,res,next)=>{
    Order.findOne({
      where: {
        estado: ['procesando', 'cancelada', 'completada'],
        id: req.params.id
      },
      include:[{model: Product}]
    })
    .then(orders=>{
        res.status(200).send(orders);
        return;
    })
});


//ruta para modificar estado de la compra
// server.put('/:id',(req,res,next)=>{
//     Order.findOne({
//         where:{
//             userId: req.params.id
//         }
//     })
//     .then(order=>{
//         order.estado = req.body.estado;
//         order.save();
//         res.status(201).send(order)
//         return;
//     })
// });

//Devuelve todas las órdenes de un usuario, incluyendo el carrito
server.get('/:id',(req,res,next)=>{
    Order.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(order=>{
        if (!order){
            res.status(404).send("No se encontró una órden asociada para ese usuario");
            return;
        } else {
            res.status(200).send(order);
            return;
        }
    })
})

server.put('/:id/:estado',(req,res,next)=>{
    Order.findOne({
        where:{
            id: req.params.id,
        }
    })
    .then(order=>{
        order.estado=req.params.estado;
        order.save();
        res.status(201).send(order.data);
        return;
    })
    .catch(err=>{
        res.send(err);
        return;
    })
})

module.exports = server;
