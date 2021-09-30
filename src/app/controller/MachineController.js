const Machine = require('../database/model/machine/Machine')
const jwt = require('jsonwebtoken')
let secrete = 'Modifications+on+UV_THKCL=Campo-Limpo-pta/TK-UV09/MA_Eletrônica'

module.exports = {
    index(req, res){
        res.render('../../')
    },
    async create(req, res){
        
    },
    async details(req, res){

    },
    async update(req, res){

    },
    async delete(req, res){

    }
}