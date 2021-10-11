import PLC from '../model/machine/PLC'
import Manufacturer from '../model/manufacturer/Manufacturer'
import componentValidation from '../validation/componentValidation'
import { Op } from 'sequelize'

import sequelize from '../helpers/transactionConfig'

class PlcController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (manufacturer) {
      match.PLC_manufacturer = manufacturer
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

  async show(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    const { id } = req.params
    try {
      const plc = await PLC.findByPk(id)
      if (!plc) throw new Error('PLC not found')

      return res.status(200).json(plc)
    } catch (err) {
      return res.status(400).json({ error: err.mesage })
    }
  }

  async store(req, res) {
    if (!(await componentValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { model, manufacturer } = req.body
    try {
      await sequelize.transaction(async (transaction) => {
        const manufacturerExists = await Manufacturer.findByPk(manufacturer, {
          transaction,
        })
        if (!manufacturerExists) throw new Error('Manufacturer not found')

        const modelExists = PLC.findOne({ transaction, where: { model } })
        if (modelExists) throw new Error('Model already registered')

        await PLC.create({ model, manufacturer }, { transaction })
      })
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
      await sequelize.transaction(async (transaction) => {
        const plcExists = PLC.findByPk(id)
        if (!plcExists) throw new Error('PLC not found')

        const manufacturerExists = await Manufacturer.findByPk(manufacturer, {
          transaction,
        })
        if (!manufacturerExists) throw new Error('Manufacturer not found')

        const modelExists = PLC.findOne({ transaction, where: { model } })
        if (modelExists.id !== id) throw new Error('Model already registered')

        await PLC.update(
          { model, manufacturer },
          { transaction, where: { id } }
        )
      })
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
      return res.status(500).json({ error: err.message })
    }
  }
}

export default new PlcController()
