import User from '../model/user/User'
import userCreateValidation from '../validation/userCreateValidation'
import userValidation from '../validation/userValidation'
import { Op } from 'sequelize'

import sequelize from '../helpers/transactionConfig'
class UserController {
  async index(req, res) {
    const { query, status, role, shift, page = 1, limit = 2000 } = req.query

    let match = {}

    if (status) {
      match.active = status
    }
    if (role) {
      match.role = role
    }
    if (shift) {
      match.shift = shift
    }
    if (query) {
      match = {
        ...match,
        [Op.or]: [
          {
            name: {
              [Op.contains]: query,
            },
          },
          {
            id8: {
              [Op.contains]: query,
            },
          },
          {
            email: {
              [Op.contains]: query,
            },
          },
        ],
      }
    }

    try {
      const users = await User.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'shift',
            attributes: ['start_time', 'end_time', 'shift_manager'],
          },
          {
            association: 'role',
            attributes: ['name'],
          },
        ],
        order: [[sequelize.cast(sequelize.col('user.name'), 'STRING'), 'ASC']],
      })

      res.setHeader('x-total-count', users.count)
      return res.status(200).json(users.rows)
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to search users', error: err })
    }
  }

  async show(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }

    const { id } = req.params

    try {
      const user = await User.findByPk(id)
      if (!user) throw new Error('User not found')

      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async store(req, res) {
    if (!(await userCreateValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { name, id8, email, password, active } = req.body

    try {
      await sequelize.transaction(async (transaction) => {
        const id8Registered = User.findOne({ transaction, where: { id8 } })
        if (id8Registered) throw new Error('8ID already registered')

        const emailRegistered = await User.findOne({
          transaction,
          where: { email },
        })
        if (emailRegistered) throw new Error('Email already registered')

        await User.create(
          { name, id8, email, password, active },
          { transaction }
        )
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
    return res.status(201).json({ message: 'User created successfully' })
  }

  async update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    if (!(await userValidation.isValid(req.body))) {
      return res.status(400).json({ errro: 'Invalid data type' })
    }

    const { id } = req.params
    const { name, id8, email, active } = req.body

    try {
      await sequelize.transaction(async (transaction) => {
        const user = await User.findByPk(id, { transaction })
        if (!user) throw new Error('User not found')

        const id8Registered = User.findOne({ transaction, where: { id8 } })
        if (id8Registered.id !== id) throw new Error('8ID already registered')

        const emailRegistered = await User.findOne({
          transaction,
          where: { email },
        })
        if (emailRegistered.id !== id)
          throw new Error('Email already registered')

        await User.update(
          { name, id8, email, active },
          { transaction, where: { id } }
        )
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
    return res.status(201).json({ message: 'User updated successfully' })
  }
}

export default new UserController()
