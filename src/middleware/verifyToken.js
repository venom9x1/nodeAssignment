
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const User = require('../model/User')
const Role = require('../model/Roles')

exports.verifyToken = async (req, res, next) => {

   try {

      if (!req.headers.authorization) {
         return res.json('Missing authorization token ')
      }

      const token = req.headers.authorization
      const payload = jwt.verify(token, SECRET)

      if (!payload) return res.json('Invalid authorization token')

      req.userId = payload.id

      const user = await User.findOne({ _id: req.userId }, { password: 0 })

      if (!user) return res.status(400).json('user no found');
      next()

   } catch (e) {
      return res.status(400).json('Error while autorization : '+e);
   }

}

exports.isAdmin = async (req, res, next) => {
   const user = await User.findById(req.userId)
   const roles = await Role.find({ _id: { $in: user.roles } })

   roles.forEach(role => {
      if (role.name == "admin") {
         next()
         return
      }else{
         return res.json('Only Admin can access this route')
      }
   })
}

exports.isModerator = async (req, res, next) => {
   const user = await User.findById(req.userId)
   const roles = await Role.find({ _id: { $in: user.roles } })
   roles.forEach(role => {
      if (role.name == "moderator") {
         next();
         return
      }else{
         return res.json('Only moderator can access this route')
      }
   })
}