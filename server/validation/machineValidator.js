const yup = require('yup')

const machineSchema = yup.object().shape({
    number: yup.string().required(),
    model: yup.string().required(),
    func: yup.string().required(),
    manufacturer: yup.number().required(),
    cnc: yup.number().required(),
    plc: yup.number().required(),
    ihm: yup.number().required(),
    driver: yup.number().required()
})

module.exports = machineSchema