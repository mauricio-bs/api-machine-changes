import PLC from '../model/machine/PLC'
import Manufacturer from '../model/machine/Manufacturer'
import componentValidation from '../validation/componentValidation'
import sequelize, { Op } from 'sequelize'

class PlcController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (!!manufacturer) {
      match.PLC_manufacturer = manufacturer
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
      const plc = await PLC.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'plc_manufacturer',
          },
          {
            association: 'machine_plc',
          },
        ],
        order: [[sequelize.cast(sequelize.col('PLC.model'), 'STRING'), 'ASC']],
      })

      res.setHeader('x-total-count', plc.count)
      return res.status(200).json(plc.rows)
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

      const modelExists = PLC.findOne({ where: { model } })
      if (modelExists) throw new Error('Model already registered')

      await PLC.create({ model, manufacturer })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create PLC', error: err })
      }
    }
    return res.status(201).json({ message: 'PLC created successfully' })
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
      const plcExists = PLC.findByPk(id)
      if (!plcExists) throw new Error('PLC not found')

      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const modelExists = PLC.findOne({ where: { model } })
      if (modelExists.id != id) throw new Error('Model already registered')

      await PLC.update({ model, manufacturer }, { where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create PLC', error: err })
      }
    }
    return res.status(201).json({ message: 'PLC created successfully' })
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const plcExists = await PLC.findByPk(id)
      if (!plcExists) throw new Error('PLC not found')

      await PLC.destroy({ where: { id } })
    } catch (err) {
      if (!err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete PLC', error: err })
      }
    }
  }
}

export default new PlcController()
