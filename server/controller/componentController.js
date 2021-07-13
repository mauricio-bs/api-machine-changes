const CNC = require('../database/model/machine/CNC')
const PLC = require('../database/model/machine/PLC')
const IHM = require('../database/model/machine/IHM')
const Driver = require('../database/model/machine/Driver')
const Software = require('../database/model/machine/Software')
const jwt = require('jsonwebtoken')
let secrete = 'Modifications+on+UV_THKCL=Campo-Limpo-pta/TK-UV09/MA_Eletrônica'

module.exports = {
    index(req, res){
        res.render('../../')
    },
    async createCNC(req, res){
        
    },
    async updateCNC(req, res){

    },
    async deleteCNC(req, res){

    }
}