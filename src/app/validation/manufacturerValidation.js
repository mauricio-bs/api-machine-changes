import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  email: yup.array().of(yup.string()),
  phone: yup.array().of(yup.number()),
})

export default schema
