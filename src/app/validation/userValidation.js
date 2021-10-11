import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  id8: yup.number().integer().required(),
  email: yup.string().email(),
  role: yup.number().integer().required(),
  shift: yup.number().integer().required(),
  active: yup.boolean().required(),
})

export default schema
