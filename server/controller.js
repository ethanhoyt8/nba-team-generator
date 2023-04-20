let players = require("./players.json")
let teams = require("./teams.json")
let globalID = 2


module.exports = {
    getPlayers: (req, res) => {
        res.status(200).send(players)
    },
    getTeam: (req,res) => {
        console.log(teams)
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
    
}
