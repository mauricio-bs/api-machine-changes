import * as yup from 'yup'

const schema = yup.object().shape({
  model: yup.string().required(),
  manufacturer: yup.number().integer().positive().required(),
})

export default schema
