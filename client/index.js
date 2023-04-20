const baseURL = 'http://localhost:7654'
// console.log('It works')

let getPlayerBtn = document.querySelector("#getPlayers")
let playersView = document.querySelector('.playersView')
let playersDisplay = document.querySelector('#playersDisplay')
let teamsDisplay = document.querySelector('.teamsDisplay')
let getTeamsBtn = document.querySelector('#getTeams')
let selectedPlayerNames = document.querySelector('#newteamplayers')
let newTeamName = document.querySelector('#newteamname')
let createTeam = document.querySelector('#createteam')
let clearTeam = document.querySelector('#clearteam')


let allPlayers = []
let selectedPlayers = []

const addPlayers = (id) => {
    let player = allPlayers[id]
    if(selectedPlayers.length >= 2){
        alert("Can't add more than 2 players")
    }else if(selectedPlayers[0] === player || selectedPlayers[1] === player){
        alert('Player has already been added')
    }else{
        selectedPlayers.push(player)
        let playerName = document.createElement('p')
        playerName.textContent = player.name
        selectedPlayerNames.appendChild(playerName)
    }
}
  
const removeNewTeam = () => {
    selectedPlayers = []
    selectedPlayerNames.innerHTML = ''
    newTeamName.value = ''
}

const createNewTeam = () => {
    if(selectedPlayers.length === 2 && newTeamName.value){
        let newTeam = {
            name: newTeamName.value,
            players: selectedPlayers
        }
        axios.post(baseURL + '/teams', newTeam)
        .then(() => {
            removeNewTeam()
            alert('New team created')
        })
    }else{
        alert('Make sure team has two players and a team name')
    }

}


    
const buildPlayerCards = (players) => {
    if(!teamsDisplay.classList.contains('invisible')){
        teamsDisplay.classList.add('invisible')
    }
    if(playersView.classList.contains('invisible')){
        playersView.classList.remove('invisible')
    }
    playersDisplay.innerHTML = ""

    players.forEach(player => {
        let playerDiv = document.createElement('div')
        playerDiv.classList.add('player')
        playerDiv.innerHTML = `<img class="player-image" src=${player.imgURL} alt="image">
        <p class="player-name">${player.name}</p>
        <p class="player-stats">Offense: ${player.stats.offense}</p>
        <p class="player-stats">Defense: ${player.stats.defense}</p>
        <button class="addtoteam" onclick="addPlayers(${player.id})">Add to team</button>`

        playersDisplay.appendChild(playerDiv)
    })
}

const buildTeamCards = (teams) => {
    console.log(teamsDisplay)
    if(!playersView.classList.contains('invisible')){
        playersView.classList.add('invisible')
    }
    if(teamsDisplay.classList.contains('invisible')){
        teamsDisplay.classList.remove('invisible')
    }
    teamsDisplay.innerHTML = ""

    teams.forEach(team => {
        
        let teamDiv = document.createElement('div')
        teamDiv.classList.add('team')
        teamDiv.innerHTML = `<h2 class="team-name">${team.name}</h2>`
        
        
        for(let i = 0; i < team.players.length; i++){
            let teamPlayerDiv = document.createElement('div')
            teamPlayerDiv.innerHTML = `
            <img class='playerIMG' src='${team.players[i].imgURL}'/>
            <p class="team-players">${team.players[i].name}</p>
            ` 
            teamDiv.appendChild(teamPlayerDiv)
        }
        teamsDisplay.appendChild(teamDiv)
    })
}




const getPlayer = () => {
    axios.get('http://localhost:7654/players')
      .then(res => {
        allPlayers = res.data
        buildPlayerCards(res.data)
      })
  }

const getTeams = () => {
    axios.get('http://localhost:7654/teams')
    .then(res => {
        buildTeamCards(res.data)
    })
}
  

getPlayerBtn.addEventListener('click', getPlayer)
getTeamsBtn.addEventListener('click', getTeams)
clearTeam.addEventListener('click', removeNewTeam)
createTeam.addEventListener('click', createNewTeam)





