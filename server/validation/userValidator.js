const yup = require('yup')

const userSchema = yup.object().shape({
    name: yup.string().required(),
    id8: yup.string().matches(/[0-9]/, "Apenas números são permitidos neste campo").length(8).required(),
    email: yup.string().email().notRequired(),
    role: yup.number().integer().positive().required(),
    shift: yup.number().integer().positive().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas não coincidem'),
    active: yup.boolean().notRequired().default(true)
})

module.exports = userSchema