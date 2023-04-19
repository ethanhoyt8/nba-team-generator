let players = require("./players.json")
let teams = require("./teams.json")
let globalID = 1


module.exports = {
    getPlayers: (req, res) => {
        res.status(200).send(players)
    },
    getTeam: (req,res) => {
        res.status(200).send(teams)
    },

    createTeam: (req, res) => {
        const {name, players} = req.body

        let newTeam = {
            name: name,
            players: players,
            id: globalID
        }
        teams.push(newTeam)
        globalID++
        res.status(200).send(teams)
    },

    deleteTeam: (req,res) => {
        const {id} = req.params
        let index = teams.findIndex((elem) => elem.id === +id)
        teams.splice(index, 1)
        res.status(200).send(teams)
    }

}
