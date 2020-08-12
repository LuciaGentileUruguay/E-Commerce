const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

 
server.get('/', (req, res, next) => {

	if (req.query.search){
		let aux = req.query.search;
		Product.findAll({
			where:{
				name:{
					[Op.like]: '%'+aux+'%'
				} 
			}
		}).then (products => {
			if (!products.length){
				res.status(404).send("No se encontro el producto");
				return;
			} else {
				res.status(200).send(products);
				return;
			}
		})		
	} else {
	Product.findAll()
		.then(products => {
			res.status(200).send(products);
			return;
		})
		.catch(next);
	}
});

module.exports = server;


