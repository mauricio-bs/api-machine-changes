import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  sponsor: yup.number().integer().required(),
})

export default schema
