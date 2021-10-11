import ManufacturerEmail from '../model/manufacturer/ManufacturerEmail'
import emailValidation from '../validation/emailValidation'

import sequelize from '../helpers/transactionConfig'

class ManufacturerEmailController {
  async index(req, res) {}

  async show(req, res) {}

  async store(req, res) {
    if (!(await emailValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { owner_name, email } = req.body

    try {
      await sequelize.transaction((transaction) => {
        const emailExists = await ManufacturerEmail.findOne({
          where: { email },
        })
        if (emailExists)
          throw new Error('Manufacturer email name already registered')

        await ManufacturerEmail.create(
          {
            owner_name,
            email,
          },
          { transaction }
        )
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    return res
      .status(201)
      .json({ message: 'Manufacturer email created successfully' })
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new ManufacturerEmailController()
