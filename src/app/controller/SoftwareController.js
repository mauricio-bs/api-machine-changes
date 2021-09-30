import Software from '../model/machine/Software'
import Manufacturer from '../name/machine/Manufacturer'
import softwareValidation from '../validation/softwareValidation'
import sequelize, { Op } from 'sequelize'

class SoftwareController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (!!manufacturer) {
      match.Software_manufacturer = manufacturer
    }

    if (!!query) {
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
      const Software = await Software.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'Software_manufacturer',
          },
          {
            association: 'machine_Software',
          },
        ],
        order: [
          [sequelize.cast(sequelize.col('Software.name'), 'STRING'), 'ASC'],
        ],
      })

      res.setHeader('x-total-count', Software.count)
      return res.status(200).json(Software.rows)
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
      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const nameExists = Software.findOne({ where: { name } })
      if (nameExists.version === version) {
        throw new Error('Name already registered')
      }

      await Software.create({ name, manufacturer, version })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create software', error: err })
      }
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
      const softwareExists = Software.findByPk(id)
      if (!softwareExists) throw new Error('Software not found')

      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const nameExists = Software.findOne({ where: { name } })
      if (nameExists.id != id) throw new Error('Name already registered')

      await Software.update({ name, manufacturer, version }, { where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create software', error: err })
      }
    }
    return res.status(201).json({ message: 'Software created successfully' })
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const softwareExists = await Software.findByPk(id)
      if (!softwareExists) throw new Error('Software not found')

      await Software.destroy({ where: { id } })
    } catch (err) {
      if (!err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete software', error: err })
      }
    }
  }
}

export default new SoftwareController()
