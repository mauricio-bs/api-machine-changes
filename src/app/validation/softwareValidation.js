import * as yup from 'yup'

const schema = yup.object().shape({
  model: yup.string().required(),
  manufacturer: yup.number().integer().required(),
  version: yup.string(),
})

export default schema
