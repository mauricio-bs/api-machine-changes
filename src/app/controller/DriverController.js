import Driver from '../model/machine/Driver'
import Manufacturer from '../model/manufacturer/Manufacturer'
import componentValidation from '../validation/componentValidation'
import sequelize, { Op } from 'sequelize'

class DriverController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (manufacturer) {
      match.driver_manufacturer = manufacturer
    }

    if (query) {
      match = {
        ...match,
        [Op.or]: [
          {
            model: {
              [Op.contains]: query,
            },
          },
        ],
      }
    }

    try {
      const driver = await Driver.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'driver_manufacturer',
          },
          {
            association: 'machine_driver',
          },
        ],
        order: [
          [sequelize.cast(sequelize.col('Driver.model'), 'STRING'), 'ASC'],
        ],
      })

      res.setHeader('x-total-count', driver.count)
      return res.status(200).json(driver.rows)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  async store(req, res) {
    if (!(await componentValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { model, manufacturer } = req.body
    try {
      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const modelExists = Driver.findOne({ where: { model } })
      if (modelExists) throw new Error('Model already registered')

      await Driver.create({ model, manufacturer })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create driver', error: err })
      }
    }
    return res.status(201).json({ message: 'Driver created successfully' })
  }

  async update(req, res) {
    if (!(await componentValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }

    const { model, manufacturer } = req.body
    const { id } = req.params

    try {
      const driverExists = Driver.findByPk(id)
      if (!driverExists) throw new Error('Driver not found')

      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const modelExists = Driver.findOne({ where: { model } })
      if (modelExists.id !== id) throw new Error('Model already registered')

      await Driver.update({ model, manufacturer }, { where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create driver', error: err })
      }
    }
    return res.status(201).json({ message: 'Driver created successfully' })
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const driverExists = await Driver.findByPk(id)
      if (!driverExists) throw new Error('Driver not found')

      await Driver.destroy({ where: { id } })
    } catch (err) {
      if (!err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete driver', error: err })
      }
    }
  }
}

export default new DriverController()
