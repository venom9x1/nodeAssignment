const { Schema, model } = require('mongoose')


const rolesSchema = new Schema({
     name: { type: String },
}, { versionKey: false })

module.exports = model('Role', rolesSchema)