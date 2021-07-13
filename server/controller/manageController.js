const Manage = require('../services/manageActions')

module.exports = {
    // MANUFACTURER
    async manIndex(req, res){

    },
    // ROLE
    async roleIndex(req, res){
       
    },
    async roleCreate(req, res){
        const {name} = req.body
        const response = Manage.createRole(name)
        
        response.data.status === 201 ? res.status(201) : res.status(response.status, response.error)
    },
    // SHIFT
    async shiftIndex(req, res){

    }
}