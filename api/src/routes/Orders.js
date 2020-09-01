const server = require('express').Router();
const { Product, Order, Order_line, User } = require('../db.js');
const { Sequelize } = require('sequelize');

//Devuelve todas las órdenes para todos los usuarios, sin incluir los carritos
server.get('/',(req,res,next)=>{
    Order.findAll({
      where: {
        estado: ['procesando', 'cancelada', 'completada']
      },
      include:[{model: Product}, {model: User}]
    })
    .then(orders=>{
        res.status(200).send(orders);
        return;
    })
});

//Devuelve todas las órdenes para un determinado usuario, sin incluir el carrito
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
server.put('/:id',(req,res,next)=>{
    Order.findOne({
        where:{
            userId: req.params.id
        }
    })
    .then(order=>{
        order.estado = req.body.estado;
        order.save();
        res.status(201).send(order)
        return;
    })
});

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

module.exports = server;
