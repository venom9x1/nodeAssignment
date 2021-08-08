const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const pkg = require('../package.json')

const products = require('./router/product.router')
const auth = require('./router/auth.router')

const { createRole } = require('./libs/initiallSetup')

const app = express();

app.set('pkg', pkg)

createRole();// se crear el rol, en la base de datos 

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use('/api/products', products)
app.use(auth)

module.exports = app