import * as yup from 'yup'

const schema = yup.object().shape({
  nickname: yup.string().required(),
  alternative_name: yup.string().required(),
  buildings: yup.number().integer().required(),
})

export default schema
