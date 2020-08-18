const server = require('express').Router();
const { Product, Category, category_products } = require('../db.js');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


server.get("/category/:id", (req, res, next) => {
	Product.findAll({
		include: [{
    	model: Category,
    	where: {id: req.params.id}
   }]
 })
	.then(function(products){
		console.log("Algo :"+ req.params.id);
    res.status(200).json(products);
  })
})

server.get("/:id", (req,res,next) =>{
	 Product.findByPk(req.params.id)
		.then(product => {
			if (!product){
				 res.status(404).send("No se encuentra el producto");
			 }
			 else {
				res.status(200).json(product);
			 }
		 })
})

server.get('/', (req, res, next) => {
	if (req.query.search){
		let aux = req.query.search;
		Product.findAll({
			where:{
				[Op.or]:[{
					name:{
						[Op.like]: '%'+aux+'%'
					}
				},
				{
				 	description:{
				 		[Op.like]: '%'+aux+'%'
				 	}
				}]
			}
		}).then (products => {
			if (!products.length){
				res.status(404).send("No se encontro el producto");
				return;
			}
      else {
				res.status(200).json(products);
				return;
			}
		})
	}
  else {
	Product.findAll()
		.then(products => {
			res.status(200).json(products);
			return;
		})
		.catch(next);
	}
});

//Ruta para crear Products
server.post('/', (req,res,next) =>{
	const {name, description, price, image, stock} = req.body;

	//En caso de que no exista algun campo se devuelve error!
	if (!name || !description || !price || !stock){
		res.status(400).send("Uno de los campos no ha sido completado");
	} else {
		//Se crea el Producto!
		Product.create({
			name,
			description,
			price,
			image,
			stock
		}).then (function(product){
			res.json(product);
		})

	}
});

//Ruta para actualizar un Producto por id
server.put('/:id', (req,res,next)=>{
	return Product.findByPk(req.params.id)
	.then (function(product){
		const {name, description, price, image, stock} = req.body;
		product.name = name;
		product.description = description;
		product.price = price;
		product.image = image;
		product.stock = stock;
		product.save();
		res.status(201).send("Se modifico el Producto");

	})
});

server.delete('/:id', (req,res,next)=>{
	 Product.findByPk(req.params.id)
	 .then (function (product){
		 if (!product){
			 res.status(400).send("No se encuentra el producto");
			 return;
		 } else {
			product.destroy();
			res.status(200).send("Fichero eliminado!");
		 }
	 })

})

module.exports = server;

	// otra manera de hacer el delete!!
	//  Product.destroy({
	// 	 where:{
	// 		 id: req.params.id
	// 	 }
	//  })


	//manera para hacer el PUt
	// Object.keys(product).map(prop => {
	// 	product[prop]=req.body[prop]
	// })
