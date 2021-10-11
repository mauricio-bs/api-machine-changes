import ManufacturerCategory from '../model/manufacturer/ManufacturerCategory'
import yup from 'yup'

import sequelize from '../helpers/transactionConfig'

class ManufacturerCategoryController {
  async index(req, res) {
    try {
      const categories = await ManufacturerCategory.findAll()
      if (!categories) throw new Error('No categories found')

      return res.status(200).json(categories)
    } catch (err) {
      return res.status(400).json({ error: err.mesage })
    }
  }

  async show(req, res) {}

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { name } = req.body

    try {
      await sequelize.transaction((transaction) => {
        const nameExists = await ManufacturerCategory.findOne({
          where: { name },
        })
        if (nameExists) throw new Error('Category name name already registered')

        await ManufacturerCategory.create(
          {
            name,
          },
          { transaction }
        )
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
    return res
      .status(201)
      .json({ message: 'Category name created successfully' })
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new ManufacturerCategoryController()
