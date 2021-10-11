import Software from '../model/machine/Software'
import Manufacturer from '../model/manufacturer/Manufacturer'
import softwareValidation from '../validation/softwareValidation'
import { Op } from 'sequelize'

import sequelize from '../helpers/transactionConfig'
class SoftwareController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (manufacturer) {
      match.Software_manufacturer = manufacturer
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
        ],
      }
    }

    try {
      const software = await Software.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'software_manufacturer',
          },
          {
            association: 'machine_Software',
          },
        ],
        order: [
          [sequelize.cast(sequelize.col('software.name'), 'STRING'), 'ASC'],
        ],
      })

      res.setHeader('x-total-count', software.count)
      return res.status(200).json(software.rows)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  async store(req, res) {
    if (!(await softwareValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { name, manufacturer, version } = req.body
    try {
      await sequelize.transaction(async (transaction) => {
        const manufacturerExists = await Manufacturer.findByPk(manufacturer, {
          transaction,
        })
        if (!manufacturerExists) throw new Error('Manufacturer not found')

        const nameExists = Software.findOne({ transaction, where: { name } })
        if (nameExists.version === version) {
          throw new Error('Name already registered')
        }

        await Software.create({ name, manufacturer, version }, { transaction })
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
    return res.status(201).json({ message: 'Software created successfully' })
  }

  async update(req, res) {
    if (!(await softwareValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }

    const { name, manufacturer, version } = req.body
    const { id } = req.params

    try {
      await sequelize.transaction(async (transaction) => {
        const softwareExists = Software.findByPk(id, { transaction })
        if (!softwareExists) throw new Error('Software not found')

        const manufacturerExists = await Manufacturer.findByPk(manufacturer, {
          transaction,
        })
        if (!manufacturerExists) throw new Error('Manufacturer not found')

        const nameExists = Software.findOne({ transaction, where: { name } })
        if (nameExists.id !== id) throw new Error('Name already registered')

        await Software.update(
          { name, manufacturer, version },
          { transaction, where: { id } }
        )
      })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create software', error: err })
      }
    }
    return res.status(201).json({ message: 'Software updated successfully' })
  }

  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    const { id } = req.params

    try {
      const softwareExists = await Software.findByPk(id)
      if (!softwareExists) throw new Error('Software not found')

      await Software.destroy({ where: { id } })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    return res.status(204).json()
  }
}

export default new SoftwareController()
