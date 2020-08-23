const server = require('express').Router();
const { Product, Order, Order_line } = require('../db.js');
const { Sequelize } = require('sequelize');

server.get('/',(req,res,next)=>{
    Order.findAll()
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

server.get('/:id',(req,res,next)=>{
    Order.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(order=>{
        if (!order){
            res.status(404).send("Nose encontro una orden asosiada a ese usuario");
            return;
        } else {
            res.status(200).send(order);
            return;
        }
    })
})

module.exports = server;