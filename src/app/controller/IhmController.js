import IHM from '../model/machine/IHM'
import Manufacturer from '../model/manufacturer/Manufacturer'
import ihmValidation from '../validation/ihmValidation'
import sequelize, { Op } from 'sequelize'

class IhmController {
  async index(req, res) {
    const { query, manufacturer, page = 1, limit = 2000 } = req.query

    let match = {}

    if (manufacturer) {
      match.ihm_manufacturer = manufacturer
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
      const ihm = await IHM.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'ihm_manufacturer',
          },
          {
            association: 'machine_ihm',
          },
          {
            association: 'ihm_software',
          },
        ],
        order: [[sequelize.cast(sequelize.col('ihm.model'), 'STRING'), 'ASC']],
      })

      res.setHeader('x-total-count', ihm.count)
      return res.status(200).json(ihm.rows)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  async store(req, res) {
    if (!(await ihmValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { model, manufacturer, software } = req.body
    try {
      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const modelExists = IHM.findOne({ where: { model } })
      if (modelExists) throw new Error('Model already registered')

      await IHM.create({ model, manufacturer, software })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create IHM', error: err })
      }
    }
    return res.status(201).json({ message: 'IHM created successfully' })
  }

  async update(req, res) {
    if (!(await ihmValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }

    const { model, manufacturer, software } = req.body
    const { id } = req.params

    try {
      const ihmExists = IHM.findByPk(id)
      if (!ihmExists) throw new Error('IHM not found')

      const manufacturerExists = await Manufacturer.findByPk(manufacturer)
      if (!manufacturerExists) throw new Error('Manufacturer not found')

      const modelExists = IHM.findOne({ where: { model } })
      if (modelExists.id !== id) throw new Error('Model already registered')

      await IHM.update({ model, manufacturer, software }, { where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create IHM', error: err })
      }
    }
    return res.status(201).json({ message: 'IHM created successfully' })
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const ihmExists = await IHM.findByPk(id)
      if (!ihmExists) throw new Error('IHM not found')

      await IHM.destroy({ where: { id } })
    } catch (err) {
      if (!err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete IHM', error: err })
      }
    }
  }
}

export default new IhmController()
