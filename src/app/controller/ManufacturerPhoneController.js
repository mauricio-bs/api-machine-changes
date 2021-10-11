import ManufacturerPhone from '../model/manufacturer/ManufacturerPhone'
import phoneValidation from '../validation/phoneValidation'
import { v4 } from 'uuid'

import sequelize from '../helpers/transactionConfig'

class ManufacturerPhoneController {
  async index(req, res) {}

  async show(req, res) {}

  async store(req, res) {
    if (!(await phoneValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { owner_name, phone } = req.body

    try {
      await sequelize.transaction((transaction) => {
        const phoneExists = await ManufacturerPhone.findOne({
          where: { phone },
        })
        if (phoneExists) {
          throw new Error('Manufacturer phone already registered')
        }

        await ManufacturerPhone.create(
          {
            owner_name,
            phone,
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

export default new ManufacturerPhoneController()
