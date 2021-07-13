const Manufacturer = require('../database/model/machine/Manufacturer')
const Shfit = require('../database/model/user/Shift')
const Role = require('../database/model/user/Role')
const uuid = require('uuid')
const { response } = require( 'express' )

module.exports = {
    async allRoles(req){
        await Role.sync()
        Role.findAll()
        .then(role => {
            return response.json(role).statusCode(200)
        })
        .catch(err => {
            return response.json({error: 'Internal error: ', err}).statusCode(404)
        })
    },
    async createRole(role) {
        Role.sync()
        const rol = await Role.findOne({where: {name: role}})

        if(!rol){
            try {
                Role.create({id: uuid.v4(),name: role})
                return response.statusCode(201)
            }
            catch(err){
                return response.json({error: 'Internal error', err}).statusCode(502)
            }
            
        }else{
            return response.json({error: 'Role already exist'}).statusCode(409)
        }
    }
}