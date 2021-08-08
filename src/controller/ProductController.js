const Product = require('../model/Product')

exports.createProduct = async (req, res) => {
	const { name, category, price, imageUrl } = req.body;
	const newProduct = {
		name, category, price, imageUrl
	}
	const product = new Product(newProduct)
	await product.save();
	res.status(200).json('Product added successfully')
}

exports.getProduct = async (req, res) => {
	const products = await Product.find().sort('-1')
	res.status(200).json(products)
}

exports.getProductByid = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id)
	res.json(product)
}

exports.deleteProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndDelete(id)
	// res.json(product)
	res.status(200).json('Product deleted successfully')
}

exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, {
		new: true
	})
	res.json(product)
}