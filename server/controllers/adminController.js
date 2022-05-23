const { User, Profile } = require("../models")
const { hashPassword } = require("../helpers/passwordHandler")

class AdminController {

  static getAdminlists = async (req, res) => {

    const userRole = req.user.role

    try {
      if ( userRole === "superAdmin" || userRolte === "admin" ){
        const user = await User.findAll({
          where: {
            role: "admin",
            delete: false
            }
        })
        res.status(201).json(user)
      }else{
        res.status(401).json({
          message: "You Not Allowed to Access This!"
        })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

    static register = async (req, res) => {
         try {
             const { username, email, password } = req.body
             const isEmailExist = await User.findOne({ where: { email } })
             if (isEmailExist) return res.status(409).json({ message: "Email is already taken" })
             const isUsernameExist = await User.findOne({ where: { username } })
             if (isUsernameExist) return res.status(409).json({ message: "Username is already exists" })
             
             const payloadUser = {
                 username, email, password: hashPassword(password), role: "admin", delete: false
             }
             const user = await User.create(payloadUser)
             
             if (user) {
 
               const payloadProfile = {
                 UserId: user.id,
                 delete: false
               }
 
               const profile = await Profile.create(payloadProfile)
 
               if (profile) {
                 return res.status(201).json({
                   message: "Success",
                   username: user.username,
                   email: user.email,
                   role: user.role,
                   profile
                 })
               }
 
             } else if (!user) {
               res.status(400).json({ message: "Bad Request" })
             }
         } catch (error) {
             return res.status(500).json({ message: error.message })
        }
    }

    static async getEditForm(req, res) {
      const adminId = req.params.id
      User.findByPk(adminId)
        .then((data) => {
          return res.status(201).json({
            username: data.username,
            email: data.email,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }

    static async edit(req, res) {
      const adminId = req.params.id
      let updatedAdmin = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(req.body.password)
      }
      User.update(updatedAdmin, {
        where: {
          id: adminId
        }
      })
        .then(() => {
          res.status(201).json({message: "Success"})
        })
        .catch((err) => {
          console.log(err)
        })
    }

    static async delete(req, res) {
      const adminId = req.params.id
      let deletedAdmin = {
        delete: true
      }
      User.update(deletedAdmin, {
        where: {
          id: adminId
        }
      })
        .then(() => {
          res.status(201).json({message: `Success`})
        })
        .catch((err) => {
          console.log(err)
        })
      Profile.update(deletedAdmin, {
          where: {
            UserId: adminId
          }
        })
          .then(() => {
            res.status(201).json({message: `Success`})
          })
          .catch((err) => {
            console.log(err)
          })
    }
 }
 module.exports = AdminController