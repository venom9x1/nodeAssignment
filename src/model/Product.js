const { Schema, model } = require('mongoose')



const productSchema = new Schema({
	name: { type: String },
	category: { type: String },
	price: { type: Number },
	imageUrl: { type: String },
}, { timestamp: true, versionKey: false })




module.exports = model('Product', productSchema)