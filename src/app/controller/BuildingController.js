import Building from '../model/building/Building'

class BuildController {
  async index(req, res) {
    const { page = 1, limit = 2000 } = req.query

    try {
      const buildings = await Building.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            association: 'Line',
            attributes: ['nickname', 'alternative_name'],
          },
        ],
      })

      res.setHeader('x-total-count', buildings.count)
      return res.status(200).json(buildings.rows)
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to search buildings', error: err })
    }
  }

  async store(req, res) {
    const { name } = req.body

    try {
      const nameExists = await Building.findOne({ where: { name } })
      if (nameExists) throw new Error('Name already registered')

      await Building.create({ name })
    } catch (err) {
      if (err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create building', error: err })
      }
    }
    return res.status(201).json({ message: 'Building created successfully' })
  }

  async update(req, res) {
    const { name } = req.body
    const { id } = req.params

    try {
      const nameExists = await Building.findOne({ where: { name } })
      if (nameExists.id !== id) {
        throw new Error('Name already registered')
      }

      await Building.update({ name }, { where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to update building', error: err })
      }
    }
    return res.status(201).json({ message: 'Building updated successfully' })
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const buildingExists = await Building.findByPk(id)
      if (!buildingExists) throw new Error('Building not found')

      await Building.destroy({ where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete building', error: err })
      }
    }
  }
}

export default new BuildController()
