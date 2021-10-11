import * as yup from 'yup'

const schema = yup.object().shape({
  phone: yup.number().required(),
  owner_name: yup.string().required(),
})

export default schema
