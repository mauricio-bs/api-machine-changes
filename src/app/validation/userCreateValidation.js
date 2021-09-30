import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  id8: yup.number().integer().required(),
  email: yup.string().email(),
  role: yup.number().integer().required(),
  shift: yup.number().integer().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas não coincidem'),
  active: yup.boolean(),
})

export default schema
