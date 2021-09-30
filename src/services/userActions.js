const User = require('../database/model/user/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const con = require('../database/connection/connection')
const secrete =
  'Modifications+on+UV_THKCL=Campo-Limpo-pta/TK-UV09/MA_Eletrônica'

module.exports = {
  index(req, res) {
    User.findAll()
      .then((users) => {
        return res.status(200).json(users)
      })
      .catch((err) => {
        return res.status(404).json({ error: 'Information not found: ', err })
      })
  },
  async create(user) {
    await con.sync()

    const id8 = parseInt(user.id8)
    // Search for the passed 8ID in database
    const userID = await User.findOne({ where: { id8 } })
    // 8ID not exists in database
    if (userID) {
      return { success: false, message: '8ID already being used' }
    }

    // Search for the passed Email in database
    const userMail = await User.findOne({ where: { email: user.email } })

    if (userMail) {
      return { success: false, message: 'Email already being used' }
    }
    await User.create(user)

    return { success: true, message: 'User successfully created' }
  },
  async delete(req, res) {
    const { _id } = req.params

    User.findByPk(_id)
      .then(() => {
        User.destroy(_id)
          .then(() => {
            return res.status(204)
          })
          .catch((err) => {
            return res.status(400).json({ error: 'Internal error: ', err })
          })
      })
      .catch(() => {
        return res.status(400).json({ error: 'User no found' })
      })
  },
  async details(req, res) {
    const { _id } = req.params

    User.findByPk(_id)
      .then((user) => {
        return res.status(200).json(user)
      })
      .catch((err) => {
        return res.status(400).json({ error: 'User not found' })
      })
  },
  async update(req, res) {
    const data = req.params

    User.findByPk(data._id)
      .then((user) => {
        user
          .save()
          .then(() => {
            return res.status(200)
          })
          .catch((err) => {
            return res.status(501).json({ error: 'Internal error: ', err })
          })
      })
      .catch(() => {
        return res.status(200).json({ error: 'User not found' })
      })
  },
  async login(req, res) {
    const { id8, password } = req.body
    await User.findOne(id8)
      .then((user) => {
        if (!user) {
          res.status(200).json({ status: 2, error: 'User not found' })
        } else {
          bcrypt.compare(password, user.password, (match) => {
            if (match) {
              const payload = { _id: user._id, id8 }
              const token = jwt.sign(payload, secrete, { expiresIn: '2h' })

              res.cookie('token', token, { httpOnly: true })

              res.status(200).json({
                status: 1,
                auth: true,
                token: token,
                id_client: user._id,
                user_name: user.name,
              })
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
        res
          .status(200)
          .json({ error: 'Erro no servidor, por favor tente novamente' })
      })
  },
  async logout(req, res) {},
  async checkToken(req, res) {},
}
