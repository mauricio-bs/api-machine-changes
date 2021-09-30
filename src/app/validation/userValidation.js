import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string(),
  id8: yup.number().integer(),
  email: yup.string().email(),
  role: yup.number().integer(),
  shift: yup.number().integer(),
  active: yup.boolean(),
})

export default schema
