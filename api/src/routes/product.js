const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize } = require('sequelize/types');
const Op = Sequelize.op;

 
server.get('/', (req, res, next) => {

	if (!req.query){
		Product.findAll({
			where:{
				name:{
					[Op.like]: '%'+req.query.search+'%'
				} 

			}
		}).then (products => {
			if (!products){
				res.status(404).send("No se encontro el producto");
			} else {
				res.send(products);
			}
		})		
	} else {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
	}
});

module.exports = server;


