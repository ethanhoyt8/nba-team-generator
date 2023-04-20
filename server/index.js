const express = require("express")
const cors = require('cors')



const app = express()


app.use(express.json())
app.use(cors())


const {getPlayers, getTeam, createTeam} = require('./controller')

app.get('/players', getPlayers)
app.get('/teams', getTeam)
app.post('/teams', createTeam)



app.listen(7654, () => console.log('Server is up on port 7654'))