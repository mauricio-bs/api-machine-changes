import CNC from '../model/machine/CNC'
import Manufacturer from '../model/machine/Manufacturer'
import componentValidation from '../validation/componentValidation'
import sequelize, { Op } from 'sequelize'

class CncController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (!!manufacturer) {
      match.cnc_manufacturer = manufacturer
    }

    if (!!query) {
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
      const cnc = await CNC.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'cnc_manufacturer',
          },
          {
            association: 'machine_cnc',
          },
        ],
        order: [[sequelize.cast(sequelize.col('Cnc.model'), 'STRING'), 'ASC']],
      })

      res.setHeader('x-total-count', cnc.count)
      return res.status(200).json(cnc.rows)
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

      const modelExists = CNC.findOne({ where: { model } })
      if (modelExists) throw new Error('Model already registered')

      await CNC.create({ model, manufacturer })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create CNC', error: err })
      }
    }
    return res.status(201).json({ message: 'CNC created successfully' })
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
      const ncExists = CNC.findByPk(id)
      if (!ncExists) throw new Error('CNC not found')

      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const modelExists = CNC.findOne({ where: { model } })
      if (modelExists.id != id) throw new Error('Model already registered')

      await CNC.update({ model, manufacturer }, { where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create CNC', error: err })
      }
    }
    return res.status(201).json({ message: 'CNC created successfully' })
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const ncExists = await CNC.findByPk(id)
      if (!ncExists) throw new Error('CNC not found')

      await CNC.destroy({ where: { id } })
    } catch (err) {
      if (!err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete NC', error: err })
      }
    }
  }
}

export default new CncController()
