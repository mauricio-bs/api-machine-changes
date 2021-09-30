import Line from '../model/building/Line'
import Building from '../model/building/Building'
import lineValidation from '../validation/lineValidation'
import { Op } from 'sequelize'

class LineController {
  async index(req, res) {
    const { query, building, page = 1, limit = 2000 } = req.query
    let match = {}

    if (!!building) {
      match.building = building
    }

    if (!!query) {
      match = {
        ...match,
        [Op.or]: [
          {
            nickname: {
              [Op.contains]: query,
            },
          },
          {
            alternative_name: {
              [Op.contains]: query,
            },
          },
        ],
      }
    }

    try {
      const buildingExists = Building.findByPk(building)
      if (!buildingExists) throw new Error('Building not found')

      const lines = await Line.findAndCountAll({
        where: match,
        offset: (page - 1) * limit,
        limit,
      })

      res.setHeader('x-total-count', lines.count)
      return res.status(200).json(lines.rows)
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({
          message: 'Failed to find lines, try again later',
          error: err,
        })
      }
    }
  }

  async show(req, res) {
    const { id } = req.params

    try {
      const line = await Line.findByPk(id)
      if (!line) throw new Error('Line not found')

      return res.status(200).json(line)
    } catch (err) {
      if (err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to find line', error: err })
      }
    }
  }

  async store(req, res) {
    if (!(await lineValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { nickname, alternate_name, building } = req.body

    try {
      const nicknameExists = await Line.findOne({ where: { nickname } })
      const alternativeNameExists = await Line.findOne({
        where: { alternate_name },
      })

      if (nicknameExists || alternativeNameExists) {
        throw new Error('Nickname or alternative name already registered')
      }

      await Line.create({ nickname, alternate_name, building })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create line', error: err })
      }
    }
    return res.status(201).json({ message: 'Line created successfully' })
  }

  async update(req, res) {
    if (!(await lineValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    if (!req.params.id)
      return res.status(400).json({ error: 'Invalid data type' })

    const { nickname, alternate_name, building } = req.body
    const { id } = req.params

    try {
      const line = await Line.findByPk(id)
      if (!line) throw new Error('Line not found')

      const nicknameExists = await Line.findOne({ where: { nickname } })
      const alternativeNameExists = await Line.findOne({
        where: { alternate_name },
      })

      if (nicknameExists.id != id || alternativeNameExists.id != id) {
        throw new Error('Nickname or alternative name already registered')
      }

      await Line.create({ nickname, alternate_name, building })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create line', error: err })
      }
    }
    return res.status(201).json({ message: 'Line created successfully' })
  }

  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }

    const { id } = req.params

    try {
      const lineExists = await Line.findByPk(id)
      if (!lineExists) throw new Error('Line not found')

      await Line.destroy({ where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete line', error: err })
      }
    }
  }
}

export default new LineController()
