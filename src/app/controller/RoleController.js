import Role from '../model/user/Role'
import roleValidation from '../validation/roleValidation'

class RoleController {
  async index(req, res) {
    const { page = 1, limit = 2000 } = req.query
    try {
      const roles = await Role.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
      })
      res.setHeader('x-total-count', roles.count)
      return res.status(200).json(roles.rows)
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to search roles', error: err })
    }
  }

  async show(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }

    try {
      const role = Role.findByPk(id)
      if (!role) throw new Error('Role not found')

      return res.status(200).json(role)
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to find role', error: err })
      }
    }
  }

  async store(req, res) {
    if (!(await roleValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }

    const { name } = req.body

    try {
      const nameExists = await Role.findOne({ where: { name } })
      if (nameExists) throw new Error('Name already in use')

      await Role.create({ name })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create role', error: err })
      }
    }
  }

  async update(req, res) {
    if (!(await roleValidation.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data type' })
    }
    const { name } = req.body
    const { id } = req.params

    try {
      const nameExists = await Role.findOne({ where: { name } })
      if (nameExists.id != id) throw new Error('Name already in use')

      await Role.create({ name })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to create role', error: err })
      }
    }
  }

  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing information: ID' })
    }
    const { id } = req.params
    try {
      const roleExists = await Role.findByPk(id)
      if (!roleExists) throw new Error('Role not found')

      await Role.destroy({ where: { id } })
    } catch (err) {
      if (err.message) {
        return res.status(400).json({ error: err.message })
      } else {
        return res
          .status(500)
          .json({ message: 'Failed to delete role', error: err })
      }
    }
    return res.status(204).json()
  }
}

export default new RoleController()
