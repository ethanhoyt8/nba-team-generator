const express = require("express")



const app = express()

app.use(express.json())


const {getPlayers, getTeam, createTeam, deleteTeam} = require('./controller')

app.get('/players', getPlayers)
app.get('/teams', getTeam)
app.post('/teams', createTeam)
app.delete('/teams/:id', deleteTeam)


app.listen(7654, () => console.log('Server is up on port 7654'))