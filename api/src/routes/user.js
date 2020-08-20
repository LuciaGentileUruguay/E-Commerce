const server = require('express').Router();
const { User, Order_line, Product, Order } = require('../db.js');
const { Sequelize } = require('sequelize');

//crear un usuario
server.post('/',(req,res,next)=>{
    //en caso de que falte algun campo devolver un error
    const {nombre, apellido, email, hashedPassword} = req.body;
    if (!nombre || !apellido || !email || !hashedPassword){
        return res.status(404).send("Falta algun campo");
    } else {
        //se crea el usuario
        User.create({
            nombre,
            apellido,
            email,
            hashedPassword
        })
        .then(user=>{
            return res.status(201).send("Usuario creado");
        })
    }
});

//se trae todos los usuarios
server.get('/',(req,res,next)=>{
    User.findAll()
    .then(user=>{
        res.status(200).send(user);
    })
})

//modifica un usuario
server.put('/:id',(req,res,next)=>{
    const {nombre, apellido, email, hashedPassword} = req.body;
    //devuelve error en el caso que falte algun campo
    if (!nombre || !apellido || !email || !hashedPassword){
        return res.status(404).send("Falto un campo");
    }else {
    User.findByPk(req.params.id)
        .then(user=>{
            if (!user){
                //sino encuentra el usuario devuelve un error
                return res.status(404).send("No se encontro el usurio")
            } else {
            // =actualiza un usuario
            user.nombre = nombre;
            user.apellido = apellido;
            user.email = email;
            user.hashedPassword = hashedPassword;
            user.save();
            res.status(200).send("Usuario modificado")
            return;
            }

        })
    }
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
  const userId = req.params.id;
  Order.findOrCreate({
    where:{
      userId: userId,
      estado: 'pending'
    }
  }) //findOrCreate devuelve un array
   .then(order => {
     console.log(order[0].id);
     orderID = order[0].id;
     console.log(orderID);
     Order_line.findOne({
       where: {
         orderId: order[0].id,
         productId: productId
       }
     })
     .then(res => { //si existe el producto entonces aumento en uno la cantidad
       console.log("RESSS: ", res);
       if(res !== null){
         res.update({
           cantidad: res.cantidad + 1
         },
         { where: {
             orderId: order.idOrder,
             productId: productId
           }
         }
        )
       } else { //si no existe, creo una nueva fila en la tabla
         Order_line.create({
           cantidad: 1,
           productId: productId,
           orderId: orderID,
           price: 100
         })
       }
     })
   })
})


module.exports = server;
