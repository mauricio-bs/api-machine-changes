import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  owner_name: yup.string().required(),
})

export default schema
