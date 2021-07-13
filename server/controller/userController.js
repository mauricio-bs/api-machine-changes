const userVal = require("../validation/userValidator")
const userServ = require("../services/userActions")

module.exports = {
	async index(req, res) {
        const users = userServ.index()
        
        users.status === 200 ? res.status(200).json(users) : res.status(404).json({error: 'Internal error'})
    },
    //Create User
	async create(req, res) {
		const user = req.body

		if(!userVal.isValid(user)){
            return res.status(400).json({message: 'Invalid data'})
        }

        const userCreated = await userServ.create(user)

        if(!userCreated.success){
            return res.status(400).json({message: userCreated.message})
        }
        else{
            return res.status(201).json({message: userCreated.message})
        }
        
	},
    //Delete User
    async delete(req, res){
        const {_id} = req.params

        const deleted = await userServ.delete(_id)

        deleted.status === 200 ? res.status(200) : res.status(501).json({error: 'Internal error'})
    },
    //User data
    async details(req, res){
        const {_id} = req.params

        const response = await userServ.details(_id)

        response.status === 200 ? res.status(200).json(response) : res.status(400).json({error: 'Internal error or data not found'})
    },
    //Update user
    async update(req, res){
        const {_id} = req.params

        const response = await userServ.update(_id)

        response.status === 200 ? res.status(200) : res.status(400).json(response)
    }
}
