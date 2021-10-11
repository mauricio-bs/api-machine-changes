import User from '../model/user/User'
import sessionValidation from '../validation/sessionValidation'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
  async store(req, res) {
    const id8OrPasswordIncorrect = () => {
      return res
        .status(400)
        .json({ error: 'Make sure your 8ID or email are correct' })
    }
    if (!(await sessionValidation.isValid(req.body))) id8OrPasswordIncorrect()

    const { id8, password } = req.body

    try {
      const user = await User.findOne({ where: { id8 } })

      if (!user) id8OrPasswordIncorrect()

      if (!(await user.checkPassword(password))) id8OrPasswordIncorrect()

      if (user.active !== true) {
        return res.status(401).json({ error: 'This account is inactive' })
      }

      return res.status(200).json({
        message: `Welcome ${user.name}`,
        id: user.id,
        token: jwt.sign(
          { id: user.id, role: user.role, id8: user.id8 },
          authConfig.secret,
          { expiresIn: authConfig.expiresIn }
        ),
      })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }
}

export default new SessionController()
