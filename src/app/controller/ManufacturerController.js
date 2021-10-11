import Manufacturer from '../model/manufacturer/Manufacturer'
import manufacturerValidation from '../validation/machineValidation'
import { v4 } from 'uuid'

import sequelize from '../helpers/transactionConfig'

class ManufacturerController {
  async index(req, res) {}

  async show(req, res) {}

  async store(req, res) {
    if (!(await manufacturerValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { name, description, category } = req.body

    try {
      await sequelize.transaction(async (transaction) => {
        const nameExists = await Manufacturer.findOne({ where: { name } })
        if (nameExists) throw new Error('Manufacturer name already registered')

        await Manufacturer.create(
          {
            id: v4(),
            name,
            description,
            category,
          },
          { transaction }
        )
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    return res
      .status(201)
      .json({ message: 'Manufacturer created successfully' })
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new ManufacturerController()
