import Shift from '../model/user/Role'
import shiftValidation from '../validation/shiftValidation'
import { isValid } from 'date-fns'

import sequelize from '../helpers/transactionConfig'

class ShiftController {
  async index(req, res) {
    const { page = 1, limit = 2000 } = req.query
    try {
      const shifts = await Shift.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
      })

      res.setHeader('x-total-count', shifts.count)
      return res.status(200).json(shifts.rows)
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to search shifts', error: err })
    }
  }

  async show(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    const { id } = req.params

    try {
      const shift = await Shift.findByPk(id)
      if (!shift) throw new Error('Shift not found')

      return res.status(200).json(shift)
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to find shift', error: err })
      }
    }
  }

  async store(req, res) {
    if (!(await shiftValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { name, start_time, end_time, sponsor } = req.body

    try {
      await sequelize.transaction(async (transaction) => {
        if (!isValid(start_time) || !isValid(end_time)) {
          return res.status(400).json({ error: 'Invalid data type' })
        }

        const nameExists = await Shift.findOne({ transaction, where: { name } })
        if (nameExists) throw new Error('Name already in use')

        await Shift.create(
          { name, start_time, end_time, sponsor },
          { transaction }
        )
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
    return res.status(201).json({ message: 'Shift created successfully' })
  }

  async update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    if (!(await shiftValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { name, start_time, end_time, sponsor } = req.body
    const { id } = req.params

    try {
      await sequelize.transaction(async (transaction) => {
        const shift = await Shift.findByPk(id, { transaction })
        if (!shift) throw new Error('Shift not found')

        if (!isValid(start_time) || !isValid(end_time)) {
          return res.status(400).json({ error: 'Invalid data type' })
        }

        const nameExists = await Shift.findOne({ transaction, where: { name } })
        if (nameExists.id !== id) throw new Error('Name already in use')

        await Shift.create(
          { name, start_time, end_time, sponsor },
          { transaction }
        )
      })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create shift', error: err })
      }
    }
    return res.status(201).json({ message: 'Shift updated successfully' })
  }

  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    const { id } = req.params

    try {
      const shift = await Shift.findByPk(id)
      if (!shift) throw new Error('Shift not found')

      await Shift.destroy({ where: { id } })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
    return res.status(204).json()
  }
}

export default new ShiftController()
